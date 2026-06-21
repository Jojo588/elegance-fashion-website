export interface OrderDetails {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  imageUrl: string;
  customerName?: string;
  customerLocation?: string;
}

const WHATSAPP_NUMBER = "233248993067";

export function generateWhatsAppMessage(order: OrderDetails): string {
  const message = `Hello,

I would like to order the following dress from Elegance Fashion.

*Product Details:*
• Product ID: ${order.productId}
• Dress Name: ${order.productName}
• Size: ${order.size}
• Color: ${order.color}
• Quantity: ${order.quantity}
• Price: GHS ${order.price}

*Product Image:*
${order.imageUrl}

${order.customerName ? `*Customer Name:* ${order.customerName}\n` : ""}${order.customerLocation ? `*Location:* ${order.customerLocation}\n` : ""}
Please let me know the available payment and delivery options.

Thank you!`;

  return message;
}

export function generateWhatsAppLink(order: OrderDetails): string {
  const message = generateWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function openWhatsAppChat(order: OrderDetails): void {
  const link = generateWhatsAppLink(order);
  
  // Check if we're in an iframe
  if (typeof window !== "undefined") {
    if (window.self !== window.top) {
      // We're in an iframe, open in a new tab
      window.open(link, "_blank");
    } else {
      // We're not in an iframe, redirect current tab
      window.location.href = link;
    }
  }
}
