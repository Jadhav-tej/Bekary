// import React, { useState } from "react";

// function ChangeAddress({ setIsModelOpen, setShowAddress }) {
//   const [newAddress, setNewAddress] = useState("");
//   function onclose(){
//     setShowAddress(newAddress)
//     setIsModelOpen(false)
//   }
//   return (
//     <>
//       <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
//         <input
//           type="text"
//           placeholder="Enter new address"
//           onChange={(e)=>setNewAddress(e.target.value)}
//           className="w-full border px-3 py-2 rounded-md mb-4 outline-none"
//         />

//         <div className="flex items-center justify-center gap-4 mt-5 w-full">
//           <button
//             onClick={() => setIsModelOpen(false)}
//             type="button"
//             className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={onclose}
//             className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
//           >
//             Save Address
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ChangeAddress;

import React, { useState } from "react";

function ChangeAddress({ setIsModelOpen, setShowAddress }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });

  // handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // save & close modal
  function handleSave() {
    // Format the address in one line for cart summary
    const formattedAddress = `${formData.fullName}, ${formData.phone}, ${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`;
    setShowAddress(formattedAddress);
    setIsModelOpen(false);
  }

  return (
    <div className="flex flex-col bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
      <h2 className="text-lg font-medium mb-4">Add Shipping Address</h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md outline-none"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md outline-none"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md outline-none"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md outline-none"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md outline-none"
        />
        <textarea
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md outline-none h-20 resize-none"
        />
      </div>

      <div className="flex items-center justify-center gap-4 mt-5 w-full">
        <button
          onClick={() => setIsModelOpen(false)}
          type="button"
          className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

export default ChangeAddress;

