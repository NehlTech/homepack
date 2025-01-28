export interface FAQ {
  question: string;
  content: string;
}

export const faqData: FAQ[] = [
  {
    question: "What is telemedicine?",
    content:
      "Telemedicine allows patients to consult with healthcare professionals remotely." +
      " This service is designed for convenience and accessibility." +
      " You can receive medical advice from the comfort of your home.",
  },
  {
    question: "How does home care work?",
    content:
      "Our home care services provide personalized assistance in your home." +
      " Trained professionals will cater for your specific health needs." +
      " This ensures you can receive quality care in a familiar environment.",
  },
  {
    question: "What is first aid training?",
    content:
      "First aid training equips individuals with essential skills to respond to emergencies." +
      " Our courses cover various topics, including CPR and wound care." +
      " This training can save lives in critical situations.",
  },
  {
    question: "How to book appointments?",
    content:
      "Booking an appointment is easy through our online platform." +
      " Simply select the service you need and choose a convenient time." +
      " You will receive a confirmation via email or text.",
  },
  {
    question: "Are services covered by insurance?",
    content:
      "Coverage for our services may vary based on your insurance plan." +
      " We recommend checking with your provider for details." +
      " Our team can assist you with any questions regarding insurance.",
  },
];
