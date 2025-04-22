import React from 'react'

const Footer = () => {
  return (
    <div style={{background:"#e6f8f7"}} className="bg-[#e6f8f7] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img
          src="https://images.apollo247.in/images/pharmacy_logo.svg?tr=q-80,w-150,dpr-2,c-at_max"
          alt="Apollo Pharmacy"
          className="w-32"
        />
        <p className="text-sm text-gray-600">PHARMACY</p>
      </div>

      {/* App Store Buttons */}
      <div className="text-center">
        <p className="font-semibold mb-2">Get Apollo App on</p>
        <div className="flex gap-4 justify-center">
          <a href="https://play.google.com" target="_blank">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </a>
        </div>
      </div>

      {/* Social Media */}
      <div className="text-center">
        <p className="font-semibold mb-2">Find us on</p>
        <div className="flex gap-4 justify-center text-black text-xl">
         
        </div>
      </div>

      {/* WhatsApp Floating */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 p-3 rounded-full shadow-lg text-white text-xl"
      >
        
      </a>
    </div>
  );
}

export default Footer
