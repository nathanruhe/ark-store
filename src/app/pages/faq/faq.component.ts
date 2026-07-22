import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  activeIndex: number | null = 0;

  faqs = [
    {
      question: '¿Cómo funcionan los pedidos en ARK?',
      answer:
        'Los pedidos se gestionan directamente a través de Instagram (@a.r.k.shop) o WhatsApp Business. Una vez contactas con nosotros, confirmamos disponibilidad y gestionamos el pedido de forma manual.'
    },
    {
      question: '¿Qué métodos de pago aceptáis?',
      answer:
        'Aceptamos Bizum y transferencia bancaria. El pago se realiza siempre de forma anticipada para confirmar el pedido.'
    },
    {
      question: '¿Realizáis envíos?',
      answer:
        'Sí. Realizamos envíos únicamente dentro de la península española.'
    },
    {
      question: '¿Cuánto tarda el envío?',
      answer:
        'El plazo de envío es de 5 a 7 días laborables. Los pedidos se gestionan con empresas de transporte según disponibilidad.'
    },
    {
      question: '¿Recibiré número de seguimiento?',
      answer:
        'Sí. Una vez que tu pedido sea enviado, recibirás un número de seguimiento para poder ver el estado del envío en todo momento.'
    },
    {
      question: '¿Cuánto cuesta el envío?',
      answer:
        'El envío es totalmente gratuito en todos los pedidos dentro de la península.'
    },
    {
      question: '¿Los productos son originales?',
      answer:
        'Sí. Todos los productos de ARK son 100% originales, nuevos y procedentes de marcas oficiales.'
    },
    {
      question: '¿Qué ocurre si mi pedido llega dañado?',
      answer:
        'Si tu pedido llega dañado, es importante que contactes con nosotros lo antes posible a través de Instagram o WhatsApp. Deberás enviar fotos o vídeos del producto y del paquete para poder gestionarlo correctamente.'
    },
    {
      question: '¿Se aceptan devoluciones?',
      answer:
        'Sí, aceptamos devoluciones dentro de un plazo de 14 días. El coste de la devolución es de 10€, a cargo del cliente. En drops limitados o productos especiales puede haber excepciones.'
    },
    {
      question: '¿Puedo cambiar un producto?',
      answer:
        'Los cambios pueden gestionarse dependiendo de la disponibilidad del producto. Contacta con nosotros para revisarlo.'
    },
    {
      question: '¿Los productos pueden agotarse?',
      answer:
        'Sí. Muchos productos forman parte de drops limitados, por lo que pueden agotarse sin reposición.'
    },
    {
      question: '¿Cómo puedo contactar con ARK?',
      answer:
        'Puedes contactarnos a través de Instagram (@a.r.k.shop), WhatsApp Business o el formulario de contacto de la web. Respondemos en un plazo de 24 a 48 horas.'
    }
  ];

  toggleFaq(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}