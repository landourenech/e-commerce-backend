"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const order_controller_1 = require("./controllers/order.controller");
dotenv_1.default.config();
// Initialiser Firebase Admin
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS))
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes protégées par Firebase Auth
app.post('/api/orders', auth_middleware_1.authMiddleware, order_controller_1.createOrder);
app.get('/api/orders/:userId', auth_middleware_1.authMiddleware, order_controller_1.getUserOrders);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
