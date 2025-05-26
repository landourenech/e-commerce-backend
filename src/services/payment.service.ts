import { Order } from '@prisma/client';

export class PaymentService {
  private static readonly WHATSAPP_PHONE = '+229XXXXXXXXX'; // Remplacer par le numéro WhatsApp de votre entreprise

  async generateWhatsAppPaymentLink(order: Order): Promise<string> {
    const message = encodeURIComponent(`Bonjour, je souhaite payer ma commande #${order.id} de ${order.total} FCFA`);
    const whatsappLink = `https://wa.me/${PaymentService.WHATSAPP_PHONE}?text=${message}`;
    
    return whatsappLink;
  }

  async updatePaymentStatus(orderId: string, status: 'PAID'): Promise<void> {
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: status }
    });
  }
}
