pipeline {
    agent any

    environment {
        AWS_REGION    = "ap-southeast-1"
        ACCOUNT_ID    = "372836560690"
        REPO_NAME     = "triet-ecr-fronend"
        ECR_URL       = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}"
        CHART_NAME    = "frontend"
        NAMESPACE     = "frontend"
        CLUSTER_NAME  = "my-cluster"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Pulling code from GitHub...'
                git url: 'https://github.com/trietphamminh99/reminderApp.git',
                    branch: 'master',
                    credentialsId: 'trietFrontEnd'
            }
        }

        stage('Build & Push to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-cred',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '''
                        echo "Logging in to Amazon ECR..."
                        aws ecr get-login-password --region $AWS_REGION | \
                            docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

                        echo "Building Docker image..."
                        docker build -t $REPO_NAME:latest .

                        echo "Tagging and pushing..."
                        docker tag $REPO_NAME:latest $ECR_URL:latest
                        docker push $ECR_URL:latest
                    '''
                }
            }
        }

        stage('Deploy with Helm') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-cred',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '''
                        #!/bin/bash -e          
                        
                        echo "Deploying to EKS using Helm..."
                        
                        # Update kubeconfig (writes to ~/.kube/config)
                        aws eks update-kubeconfig --name ${CLUSTER_NAME} --region ${AWS_REGION}
                        
                        # Run Helm upgrade/install
                        helm upgrade --install ${CHART_NAME} helm-chart/ \
                            -f helm-chart/values-edit.yaml \
                            --namespace ${NAMESPACE} \
                            --create-namespace \
                            --set image.repository=${ECR_URL} \
                            --set image.tag=latest
                        
                        echo "Deployment completed!"


                        echo "Deployment completed!"
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
        success {
            echo "Frontend successfully built and deployed to EKS!"
        }
        failure {
            echo "Pipeline failed – check logs above."
        }
    }
}