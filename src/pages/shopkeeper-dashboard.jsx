import React, { useState } from 'react';

const ShopkeeperDashboard = () => {
  const [shopImages, setShopImages] = useState([]);
  const [shopDetails, setShopDetails] = useState({
    name: '',
    address: '',
    categories: '',
    timings: ''
  });

  const handleImageChange = (e) => {
    if (e.target.files) {
      // Limit to 5 files
      const files = Array.from(e.target.files).slice(0, 5);
      
      const imagePreviews = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setShopImages(imagePreviews);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit shopDetails and shopImages to your backend
    console.log("Submitting Shop Details:", shopDetails);
    console.log("Submitting Images:", shopImages.map(img => img.file));
    alert('Shop details submitted! Check the console for data.');
  };

  return (
    <div className="min-h-screen bg-[#0A1425] p-4 md:p-8 flex justify-center items-start w-full">
      <div className="bg-[#1D283D] max-w-3xl w-full rounded-xl p-6 md:p-8 shadow-2xl border border-[#DBC49A]/20">
        <div className="text-center mb-8">
          <h1 className="text-[#DBC49A] text-3xl md:text-4xl font-bold">Set Up Your Digital Storefront</h1>
          <p className="text-[#DED6C4] mt-2">Add your shop details and photos to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-[#DBC49A] mb-2 font-semibold">Shop Name</label>
              <input
                type="text" id="name" name="name"
                value={shopDetails.name} onChange={handleInputChange} required
                placeholder="e.g., 'Modern Threads'"
                className="form-input"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="timings" className="text-[#DBC49A] mb-2 font-semibold">Shop Timings</label>
              <input
                type="text" id="timings" name="timings"
                value={shopDetails.timings} onChange={handleInputChange} required
                placeholder="e.g., '10 AM - 9 PM, Mon-Sat'"
                className="form-input"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="address" className="text-[#DBC49A] mb-2 font-semibold">Shop Address</label>
              <textarea
                id="address" name="address"
                value={shopDetails.address} onChange={handleInputChange} required
                rows="3" placeholder="Enter your full shop address"
                className="form-input"
              ></textarea>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="categories" className="text-[#DBC49A] mb-2 font-semibold">Categories</label>
              <input
                type="text" id="categories" name="categories"
                value={shopDetails.categories} onChange={handleInputChange} required
                placeholder="e.g., 'Sarees, Kurtas, Accessories'"
                className="form-input"
              />
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="flex flex-col">
            <label htmlFor="photo-upload" className="text-[#DBC49A] mb-2 font-semibold">Upload 3–5 Shop Photos</label>
            <input
              type="file" id="photo-upload" name="photo-upload"
              accept="image/*" multiple onChange={handleImageChange}
              className="file:bg-[#0A1425] file:border-[#DBC49A] file:text-[#DBC49A] file:border file:px-4 file:py-2 file:rounded-md file:cursor-pointer hover:file:bg-[#1D283D] text-[#DED6C4]"
            />
          </div>

          {/* Image Preview Area */}
          {shopImages.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {shopImages.map((image, index) => (
                <img
                  key={index}
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-[#E8D5B1] shadow-md"
                />
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#E8D5B1] text-[#0A1425] font-bold text-lg rounded-lg py-3 px-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
          >
            Create My Store
          </button>
        </form>
      </div>
    </div>
  );
};

// You might need a base CSS file to define the .form-input class for reusability
// e.g., in your index.css
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .form-input {
    @apply w-full rounded-md border border-[#DBC49A] bg-[#0A1425] text-[#DED6C4] p-3 placeholder-[#DED6C4]/50 focus:outline-none focus:ring-2 focus:ring-[#E8D5B1];
  }
}
*/

export default ShopkeeperDashboard;

