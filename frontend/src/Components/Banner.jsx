// import React from 'react'
// import 'flowbite';
// function Banner() {
//     const slides = [
//   {
//     id: 1,
//      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa7_Oh01mtLOD5U4fuUzR6WeEn7HrYL6v-Lg&s",
//     // img:"https://plus.unsplash.com/premium_photo-1681826507324-0b3c43928753?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFrZXJ5fGVufDB8MHwwfHx8MA%3D%3D",
//     alt: "Slide 1",
//   },
//   {
//     id: 2,
//     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa7_Oh01mtLOD5U4fuUzR6WeEn7HrYL6v-Lg&s",
//     alt: "Slide 2",
//   },
//   {
//     id: 3,
//     alt: "Slide 3",
        
//     // img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa7_Oh01mtLOD5U4fuUzR6WeEn7HrYL6v-Lg&s",
//     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGjqs8MS2l_WpUUSYJX9mjtHmA6iGkdDvO4Q&s"

//   },
// ];
//   return (
//     <>
//          <div id="default-carousel" className="relative w-full mt-15" data-carousel="slide">
//       {/* Carousel wrapper */}
//       <div className="relative h-48 overflow-hidden rounded-lg sm:h-64 md:h-96 lg:h-[500px]">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`${index === 0 ? "block" : "hidden"} w-full h-full duration-700 ease-in-out`}
//             data-carousel-item
//           >
//             <img
//               src={slide.img}
//               alt={slide.alt}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Slider indicators */}
//       <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             type="button"
//             className="w-3 h-3 rounded-full"
//             aria-current={index === 0 ? "true" : "false"}
//             aria-label={`Slide ${index + 1}`}
//             data-carousel-slide-to={index}
//           ></button>
//         ))}
//       </div>

//       {/* Slider controls */}
//       <button
//         type="button"
//         className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         data-carousel-prev
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
//           <svg
//             className="w-4 h-4 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 1 1 5l4 4"
//             />
//           </svg>
//           <span className="sr-only">Previous</span>
//         </span>
//       </button>

//       <button
//         type="button"
//         className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         data-carousel-next
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
//           <svg
//             className="w-4 h-4 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m1 9 4-4-4-4"
//             />
//           </svg>
//           <span className="sr-only">Next</span>
//         </span>
//       </button>
//     </div>
//     </>
//   )
// }

// export default Banner

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Banner() {
  const slides = [
    {
      id: 1,
      img: "https://plus.unsplash.com/premium_photo-1681826507324-0b3c43928753?w=1600",
      // alt: "Slide 1",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600",
      // alt: "Slide 2",
    },
    {
      id: 3,
img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600",
// alt: "Slide 3",
    },
  ];

  return (
    <div className="w-full mt-10">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        className="h-64 sm:h-80 md:h-[500px] rounded-xl shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.img}
              alt={slide.alt}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {slide.alt}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
