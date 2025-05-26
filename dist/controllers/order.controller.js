"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client/dist/client");
const payment_service_1 = require("../services/payment.service");
const prisma = new client_1.PrismaClient();
const paymentService = new payment_service_1.PaymentService();
const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;
        // Calculer le total
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        // Créer la commande
        const order = await prisma.order.create({
            data: {
                userId,
                total,
                orderItems: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                orderItems: true
            }
        });
        // Générer le lien WhatsApp
        const whatsappLink = await paymentService.generateWhatsAppPaymentLink(order);
        res.status(201).json({
            order,
            paymentLink: whatsappLink
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};
exports.createOrder = createOrder;
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
exports.getUserOrders = getUserOrders;
