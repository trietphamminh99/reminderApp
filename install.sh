#!/usr/bin/env bash
set -e
source .env

echo "===== Retrieve an authentication token and authenticate your Docker client to your registry =====)"
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $PASSWORD

echo "===== BUILD ====="
docker build -t $ECR_NAME .


echo "===== TAG ====="
docker tag $ECR_NAME:latest $ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/$ECR_NAME:latest

echo "===== PUSH ====="
docker push $ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/$ECR_NAME:latest

echo "===== APPLYING HELM CHART ====="
cd $PATH_TO_HELM_CHART || { echo "Folder not found"; exit 1; }
echo "Running in folder: $(pwd)"
helm upgrade -i frontend -f values-edit.yaml -n frontend  --create-namespace .