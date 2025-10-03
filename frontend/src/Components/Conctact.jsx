import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Contact() {
   const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c27ae539-0acd-4ee7-a756-d9a2eab75362",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit",userInfo);
      toast.success("Message sent successfully");
     reset();
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  return (
    <div className="bg-pink-50 min-h-screen flex flex-col mt-7 items-center py-16 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-pink-800 mb-6">
        Contact <span className="text-orange-500">Us</span>
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-12">
        Have questions, feedback, or just want to say hello? We’d love to hear
        from you! Fill out the form or reach us directly through the details
        below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
                {...register("username", { required: true })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
                 {...register("email", { required: true })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                placeholder="Write your message..."
                rows="4"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
                {...register("message", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info + Map */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-pink-800 mb-4">
              Our Bakery
            </h2>
            <p className="text-gray-700 mb-2">
              📍 123 Sweet Street, Pune, India
            </p>
            <p className="text-gray-700 mb-2">📞 +91 98765 43210</p>
            <p className="text-gray-700">✉️ hello@bekary.com</p>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Bakery Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11610129488!2d72.7410982096056!3d19.08219783977995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c63074a8b7b1%3A0x62b4f21a36a8e8f!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1694510283901!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
