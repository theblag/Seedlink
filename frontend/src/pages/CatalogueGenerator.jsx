import React, { useState } from "react";

const CatalogueGenerator = () => {
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    let imageBase64 = "";
    if (imageFile) {
      imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(imageFile);
      });
    }

    const payload = {
      shop_name: shopName,
      location,
      products: [
        {
          title,
          description,
          price,
          tags,
          image_base64: imageBase64,
        },
      ],
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/catalogue/generate_catalogue/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

        if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        alert("Backend error: " + errorText);
        return;
        }
      const data = await res.json();
      if (data.pdf_url) {
        const backendBase = "http://127.0.0.1:8000"; // your FastAPI URL
        setPdfUrl(backendBase + data.pdf_url);
      } else {
        alert("Failed to generate PDF");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating PDF");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "auto" }}>
      <h1>Product Catalogue Generator</h1>

      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "20px" }}
        />
      </div>

      <button
        onClick={handleGenerate}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Generate PDF
      </button>

      {pdfUrl && (
        <div id="pdf-container" style={{ marginTop: "30px", textAlign: "center" }}>
          <h3>Generated PDF:</h3>
          <iframe
            src={pdfUrl}
            title="Generated Catalogue"
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc" }}
          ></iframe>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "15px",
              padding: "8px 16px",
              background: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default CatalogueGenerator;
