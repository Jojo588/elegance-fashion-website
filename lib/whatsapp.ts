export interface OrderDetails {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  customerName?: string;
  customerLocation?: string;
}

const WHATSAPP_NUMBER = "233248993067";

export function generateWhatsAppMessage(order: OrderDetails): string {
  const message = `Hello,

I would like to order the following product from Niella's FashionHub.

*Product Details:*
• Product ID: ${order.productId}
• Dress Name: ${order.productName}
• Quantity: ${order.quantity}
• Price: GHS ${order.price}

${order.customerName ? `*Customer Name:* ${order.customerName}\n` : ""}${order.customerLocation ? `*Location:* ${order.customerLocation}\n` : ""}
Please let me know the available payment and delivery options.

Thank you!`;

  return message;
}

export function generateWhatsAppLink(order: OrderDetails): string {
  const message = generateWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
}

export function openWhatsAppChat(order: OrderDetails): boolean {
  if (typeof window === "undefined") return false;

  const link = generateWhatsAppLink(order);
  const popup = window.open(link, "_blank", "noopener,noreferrer");

  // Browsers can block a new tab from an iframe. Fall back to the current tab.
  if (!popup) {
    window.location.assign(link);
  }

  return true;
}
