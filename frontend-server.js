const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

// Proxy API to backend (internal service)
app.use(
    "/api",
    createProxyMiddleware({
        target: "http://backend-mongo-triet-helm-chart.backend-mongo.svc.cluster.local:3000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
    })
);

// React SPA fallback
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(80, () => {
    console.log("Frontend server running on port 80");
});
