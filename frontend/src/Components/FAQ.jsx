import React, { useState } from "react";

const faqs = [
  {
    question: "What are your delivery times?",
    answer:
      "We deliver fresh bakery items daily between 9:00 AM and 9:00 PM. Same-day delivery is available for orders placed before 5:00 PM.",
  },
  {
    question: "What payment options do you accept?",
    answer:
      "We accept all major credit/debit cards, UPI, Net Banking, and Cash on Delivery (COD).",
  },
  {
    question: "What is your refund policy?",
    answer:
      "If you’re not satisfied with your order, please contact us within 24 hours. Refunds or replacements are provided depending on the issue.",
  },
  {
    question: "Do you offer custom cakes or bulk orders?",
    answer:
      "Yes! We specialize in custom cakes and bulk party orders. Please contact us at least 48 hours in advance.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-pink-800 mb-6">
        Frequently Asked <span className="text-orange-500">Questions</span>
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-12">
        Have a question about our bakery, delivery, or policies? Check out our
        FAQs below!
      </p>

      <div className="max-w-3xl w-full space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 cursor-pointer transition hover:shadow-lg"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-pink-900">
                {faq.question}
              </h3>
              <span className="text-orange-500 font-bold text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
