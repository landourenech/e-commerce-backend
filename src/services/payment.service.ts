/**
 * Service de gestion des paiements pour l'application e-commerce
 * Utilise WhatsApp comme méthode de paiement alternative
 */
import { PrismaClient } from '@prisma/client';
import { Order } from '@prisma/client';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const prisma = new PrismaClient();

// Fermer la connexion à la base de données lors de la fermeture du processus
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
});

/**
 * Service de paiement gérant les opérations de paiement via WhatsApp
 */
export class PaymentService {
  /**
   * Numéro WhatsApp de l'entreprise pour les paiements
   * À remplacer par le numéro réel de l'entreprise
   */
  private static readonly WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || '+241XXXXXXXXX';

  /**
   * Génère un lien WhatsApp pour le paiement d'une commande
   * @param order La commande pour laquelle générer le lien
   * @returns Le lien WhatsApp formaté
   */
  async generateWhatsAppPaymentLink(order: Order): Promise<string> {
    const message = encodeURIComponent(`Bonjour, je souhaite payer ma commande #${order.id} de ${order.total} FCFA`);
    const whatsappLink = `https://wa.me/${PaymentService.WHATSAPP_PHONE}?text=${message}`;
    
    return whatsappLink;
  }

  /**
   * Met à jour le statut de paiement d'une commande
   * @param orderId L'ID de la commande à mettre à jour
   * @param status Le nouveau statut de paiement ('PAID')
   */
  async updatePaymentStatus(orderId: string, status: 'PAID'): Promise<void> {
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: status }
    });
  }
}

