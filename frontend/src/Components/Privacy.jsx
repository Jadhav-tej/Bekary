import React from "react";

function Privacy() {
  return (
    <div className="bg-pink-50 min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to <span className="font-semibold text-orange-500">Bekary</span>!  
          By using our website and services, you agree to the following terms and conditions:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>All products are subject to availability. We reserve the right to modify or discontinue items.</li>
          <li>Orders once placed cannot be canceled after preparation has begun.</li>
          <li>Prices may change without prior notice due to ingredient costs or other factors.</li>
          <li>Delivery times are estimates; delays may occur due to traffic or unforeseen issues.</li>
          <li>Users are responsible for providing accurate delivery information.</li>
        </ul>

        <h1 className="text-3xl font-bold text-pink-800 mt-10 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-4">
          We value your privacy and are committed to protecting your personal data.  
          This Privacy Policy explains how we collect, use, and safeguard your information.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>We collect personal details (name, email, address, phone) only for order processing and communication.</li>
          <li>Payment information is processed securely via trusted third-party gateways; we do not store card details.</li>
          <li>Your information will never be sold or shared with third parties for marketing without consent.</li>
          <li>We use cookies to improve website experience and analytics.</li>
          <li>Users may request account deletion and data removal at any time.</li>
        </ul>

        <p className="mt-6 text-gray-600 text-sm">
          By using our services, you acknowledge that you have read and agreed to our Terms & Conditions and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
