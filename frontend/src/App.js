import React, { useState } from "react";
import "./App.css";

function App() {
  const [wallpaper, setWallpaper] = useState(null);
  const [previews, setPreviews] = useState([]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("wallpaper", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setPreviews(data.images);
  };

  return (
    <div className="App">
      <h1>Wallpaper Previewer</h1>
      <input type="file" onChange={handleUpload} />
      <div className="previews">
        {previews.map((preview) => (
          <div key={preview.device}>
            <h2>{preview.device}</h2>
            <img src={`http://localhost:5000/${preview.path}`} alt={preview.device} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
