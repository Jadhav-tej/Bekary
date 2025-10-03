import React from "react";
import { FaBowlFood, FaHeart, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-pink-200 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-pink-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">About <span className="text-orange-400">Bekary</span></h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Freshly baked with love, straight from our oven to your heart ❤️
        </p>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73"
            alt="Bakery"
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Bekary was founded with one simple mission: to spread happiness 
            through the art of baking. From freshly baked bread to delightful 
            pastries, our bakers work every day with passion and creativity.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We use only the finest ingredients to ensure every bite brings joy. 
            Whether it’s your morning coffee companion or a cake for your 
            celebration, we’re here to make it special.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 text-center">
          <div className="p-6 bg-pink-100 rounded-2xl shadow-md">
            <FaHeart className="text-pink-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To bring fresh, delicious, and high-quality bakery items to 
              every home with love and care.
            </p>
          </div>
          <div className="p-6 bg-orange-100 rounded-2xl shadow-md">
            <FaBowlFood className="text-orange-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To be the most loved bakery brand, known for innovation, taste, 
              and customer happiness worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Baker"
              className="w-28 h-28 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Sophia</h3>
            <p className="text-gray-500">Head Baker</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <img
              src="https://randomuser.me/api/portraits/men/42.jpg"
              alt="Baker"
              className="w-28 h-28 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">James</h3>
            <p className="text-gray-500">Pastry Chef</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <img
              src="https://randomuser.me/api/portraits/women/50.jpg"
              alt="Baker"
              className="w-28 h-28 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Emma</h3>
            <p className="text-gray-500">Cake Designer</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-800 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to Taste Happiness?</h2>
        <p className="mb-6">Explore our delicious range of bakery products today.</p>
        <Link
        to={"/product"}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Explore Products
        </Link>
      </section>
    </div>
  );
}

export default About;