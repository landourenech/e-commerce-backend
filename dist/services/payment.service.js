"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
class PaymentService {
    async generateWhatsAppPaymentLink(order) {
        const message = encodeURIComponent(`Bonjour, je souhaite payer ma commande #${order.id} de ${order.total} FCFA`);
        const whatsappLink = `https://wa.me/${PaymentService.WHATSAPP_PHONE}?text=${message}`;
        return whatsappLink;
    }
    async updatePaymentStatus(orderId, status) {
        await prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: status }
        });
    }
}
exports.PaymentService = PaymentService;
PaymentService.WHATSAPP_PHONE = '+229XXXXXXXXX'; // Remplacer par le numéro WhatsApp de votre entreprise
