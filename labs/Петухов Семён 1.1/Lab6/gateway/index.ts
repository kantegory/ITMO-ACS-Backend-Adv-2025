import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { swaggerUi, swaggerSpec } from "./swagger";

const app = express();

// Swagger UI для всей системы через gateway
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Проксирование запросов к микросервисам
app.use("/user-service", createProxyMiddleware({ target: "http://user-service:3001", changeOrigin: true }));
app.use("/resume-service", createProxyMiddleware({ target: "http://resume-service:3002", changeOrigin: true }));
app.use("/vacancy-service", createProxyMiddleware({ target: "http://vacancy-service:3003", changeOrigin: true }));
app.use("/skill-service", createProxyMiddleware({ target: "http://skill-service:3005", changeOrigin: true }));

app.listen(3000, () => {
    console.log("API Gateway running on port 3000");
    console.log("Swagger UI available at http://localhost:3000/api-docs");
});
