// import React from "react";
// import { FaBowlFood } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <>
//       <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full bg-slate-800 text-gray-300">
//         <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
//           <div className="md:max-w-96">
//             {/* <img alt="" class="h-11" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiLogoSquareShape.svg" /> */}
//             <Link to={"/"} className="flex text-2xl items-center gap-2">
//               <FaBowlFood />
//               <p className="text-slate-300">Bekary</p>
//             </Link>

//             <p className="mt-6 text-sm">
//               Lorem Ipsum has been the industry's standard dummy text ever since
//               the 1500s, when an unknown printer took a galley of type and
//               scrambled it to make a type specimen book.
//             </p>
//             <div className="flex items-center gap-2 mt-4">
//               <img
//                 src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
//                 alt="google play"
//                 className="h-10 w-auto border border-white rounded"
//               />
//               <img
//                 src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
//                 alt="app store"
//                 className="h-10 w-auto border border-white rounded"
//               />
//             </div>
//           </div>
//           <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
//             <div>
//               <h2 className="font-semibold mb-5">Company</h2>
//               <ul className="text-sm space-y-2">
//                 <li>
//                   <a href="/">Home</a>
//                 </li>
//                 <li>
//                   <a href="/about">About us</a>
//                 </li>
//                 <li>
//                   <a href="/contact">Contact us</a>
//                 </li>
//                  <li>
//                   <a href="/faq">FAQ</a>
//                 </li>
//                 <li>
//                   <a href="/privacy">Privacy policy</a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h2 className="font-semibold mb-5">Get in touch</h2>
//               <div className="text-sm space-y-2">
//                 <p>+91 9876543210</p>
//                 <p>contact@example.com</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <p className="pt-4 text-center text-sm pb-5">
//           Copyright {new Date().getFullYear()} ©{" "}
//           <a href="https://prebuiltui.com">Bakery</a>. All Right Reserved.
//         </p>
//       </footer>
//     </>
//   );
// }

// export default Footer;


import React from "react";
import { FaBowlFood } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="px-6 pt-12 md:px-16 lg:px-36 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-300">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-600 pb-10">
          {/* Logo & About */}
          <div className="md:max-w-96">
            <Link to={"/"} className="flex text-3xl font-bold items-center gap-2 text-pink-400">
              <FaBowlFood />
              <p className="text-slate-200">Bakery</p>
            </Link>

            <p className="mt-6 text-sm leading-relaxed text-gray-400">
              Bringing you fresh and delightful bakery treats since 1990.
              Our passion is crafting pastries, cakes, and bread with love.
            </p>

            {/* App Buttons */}
            <div className="flex items-center gap-3 mt-5">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                alt="google play"
                className="h-10 w-auto border border-white rounded hover:scale-105 transition"
              />
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                alt="app store"
                className="h-10 w-auto border border-white rounded hover:scale-105 transition"
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6 text-xl">
              <a href="#" className="hover:text-pink-400 transition">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Links & Contact */}
          <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
            {/* Company Links */}
            <div>
              <h2 className="font-semibold text-lg mb-5 relative inline-block after:content-[''] after:block after:w-10 after:h-[2px] after:bg-pink-400 after:mt-1">
                Company
              </h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="/" className="hover:text-pink-400 transition">Home</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-pink-400 transition">About us</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-pink-400 transition">Contact us</a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-pink-400 transition">FAQ</a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-pink-400 transition">Privacy policy</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-semibold text-lg mb-5 relative inline-block after:content-[''] after:block after:w-10 after:h-[2px] after:bg-pink-400 after:mt-1">
                Get in touch
              </h2>
              <div className="text-sm space-y-2 text-gray-400">
                <p className="hover:text-pink-400 transition">+91 9876543210</p>
                <p className="hover:text-pink-400 transition">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="pt-6 text-center text-sm pb-6 text-gray-400">
          © {new Date().getFullYear()} <span className="text-pink-400 font-semibold">Bakery</span>. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default Footer;
