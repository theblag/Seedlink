import React, { useState } from 'react'
import { auth, database } from '../../config/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { generateAIResponse } from '../../../utils/geminiAi.js'; // or wherever it's located
import { useNavigate } from 'react-router-dom';
const BusinessInfo = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [otherInfo, setOtherInfo]=useState('')
  const [businessName, setBusinessName]=useState('')
  const [location, setLocation]=useState('')
  const [address, setAddress]=useState('')
  const navigate = useNavigate()
  const handleOption = (e)=>{
      setSelectedOption(e)
  }
  async function getCoordinates() {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1&email=your-email@example.com`;

      const response = await fetch(url, {
        headers: {
          "Accept": "application/json"
        }
      });

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return { lat, lon, display_name };
      } else {
        return null;
      }
    }
    const [coords, setCoords] = useState(null);

    const handleSearch = async () => {
      const result = await getCoordinates(address);
      setCoords(result);
    };
  const handleBusinessTypeSelect = async () => {
    const systemPrompt = `
        You are a business category naming assistant. When users select "Other", you create concise, professional category names that fit alongside these existing categories:
        - Local Retail Store
        - Online E-commerce Store  
        - Service Business
        - Artisan/Craftsman
        - Restaurant/Food Business

        RULES:
        1. Create a NEW category name (2-3 words max)
        2. Make it professional and clear
        3. It should be different from the existing categories
        4. Return ONLY the category name, nothing else
        5. No explanations, no additional text
        6. Use title case (Capitalize Each Word)

        Examples:
        User: "I repair computers and phones" → "Electronics Repair Service"
        User: "I teach yoga classes" → "Fitness Instruction Service"  
        User: "I sell homemade candles" → "Handmade Home Decor"
        User: "I provide pet grooming" → "Pet Care Services"
        User: "I drive for Uber" → "Transportation Services"
        User: "I make custom jewelry" → "Custom Jewelry Design"
        User: "I run a tutoring service" → "Educational Services"
        `;
    const userPrompt = `${otherInfo}`;
    try {
      const suggestion = await generateAIResponse(userPrompt, systemPrompt);
      if (typeof suggestion === 'string' && suggestion.trim() !== '') {
        return suggestion.trim();
      } else {
        return "Custom Business";
      }
    } catch (error) {
      return "Custom Business";
    }
  };
  const handleSubmit = async () => {
    let businessTypeToSave = selectedOption;

    if (selectedOption === "Other" && otherInfo.trim() !== '') {
      try {
        const aiCategory = await handleBusinessTypeSelect();
        businessTypeToSave = aiCategory;
      } catch (error) {
        businessTypeToSave = "Custom Business";
      }
    }
    let coordsToSave = coords;
    if(address.trim() !== '' && location === 'offline') {
      coordsToSave = await getCoordinates(address);
      setCoords(coordsToSave);
    }
    // Fallback if still undefined or empty
    if (!businessTypeToSave || typeof businessTypeToSave !== 'string' || businessTypeToSave.trim() === '') {
      businessTypeToSave = "Not mentioned";
    }

    try {
      const userDocRef = doc(database, "Users", auth.currentUser?.uid, "businessInfo", "data");
      const lat = coordsToSave && coordsToSave.lat ? coordsToSave.lat : '';
      const lon = coordsToSave && coordsToSave.lon ? coordsToSave.lon : '';
      if(businessTypeToSave==="Custom Business"){
        await setDoc(userDocRef, {
          BusinessInfo: businessTypeToSave,
          otherInfo: otherInfo,
          businessName: businessName || "not mentioned",
          location: location,
          address: address,
          latitude: lat,
          longitude: lon,
          timestamp: new Date()
        });
      }else{
        await setDoc(userDocRef, {
          BusinessInfo: businessTypeToSave,
          otherInfo: otherInfo,
          businessName: businessName || "not mentioned",
          location: location,
          address: address,
          latitude: lat,
          longitude: lon,
          timestamp: new Date()
        });
      }
      navigate('/home')
    } catch (err) {
      console.error("Error saving to Firebase:", err);
    }
  };
  return (
    <div>
      <label>Business Name</label>
      <input type="text" placeholder='business Name' value={businessName} onChange={(e)=>setBusinessName(e.target.value)}/>
      <label>What describes best about ur business</label>
      <div>
        <label>
          <input type="radio" onChange={()=>handleOption("Local Retail Store")} checked={selectedOption==="Local Retail Store"} />
          Local Retail Store (Kirana, Boutique, Shop)
        </label>
      </div>
      <div>
        <label>
          <input type="radio" onChange={()=>handleOption("Online E-commerce Store")} checked={selectedOption==="Online E-commerce Store"} />
          Online E-commerce Store
        </label>
      </div>
      <div>
        <label>
          <input type="radio" onChange={()=>handleOption("Service Business")} checked={selectedOption==="Service Business"} />
          Service Business (Salon, Repair, Clinic)
        </label>
      </div>
      <div>
        <label>
          <input type="radio" onChange={()=>handleOption("Artisan/Craftsman")} checked={selectedOption==="Artisan/Craftsman"} />
          Artisan/Craftsman (Handmade products)
        </label>
      </div>
      <div>
        <label>
          <input type="radio" onChange={()=>handleOption("Restaurant/Food Business")} checked={selectedOption==="Restaurant/Food Business"} />
          Restaurant/Food Business
        </label>
      </div>
      <div>
        <label>
          <input type="radio" onChange={()=>handleOption("Other")} checked={selectedOption==="Other"} />
          Other (Please specify)
        </label>
        {selectedOption=="Other" && (
          <div>
            <textarea placeholder='Tell us about ur business' onChange={(e)=>setOtherInfo(e.target.value)}></textarea>
          </div>
        )}
      </div>
      <br />
      <label>Where is your business located?</label>
      <div>
        <label>
          <input type="radio" onChange={()=>setLocation('online')} checked={location==='online'} />
          Online
        </label>
      </div>
      <div>
        <label>
          <input type="radio" onChange={()=>setLocation('offline')} checked={location==='offline'} />
          Physical Store
        </label>
      </div>
      {location==='offline' && (
        <div>
          <label>Store Address</label>
          <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter store address" />
        </div>
      )}
      <button onClick={handleSubmit}>Continue</button>
    </div>
  )
}

export default BusinessInfo
