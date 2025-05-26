"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'No authorization token provided' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        req['user'] = decodedToken;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = async (req, res, next) => {
    try {
        const user = req['user'];
        if (!user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        // Vérifier le rôle dans Prisma
        const { email } = user;
        const userRole = await prisma.user.findUnique({
            where: { email },
            select: { role: true }
        });
        if (!userRole || userRole.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Admin access required' });
    }
};
exports.adminMiddleware = adminMiddleware;
