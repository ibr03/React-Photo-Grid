import React, { useState } from 'react';
import '../App.css';

export const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);

  const handlePhotoSelect = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // check for image type files and skip this file if not image
      if (!file.type.startsWith("image/")) continue;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setPhotos((photos) => [...photos, dataUrl]);
      };
    }
    // to allow for same image selection again
    event.target.value = null;
  };

  return (
    <div className="App">
      <h1>Photo-Grid</h1>
        <div className="grid">
            {photos.map((photo, index) => (
            <div className="grid-item" key={index}>
                <img src={photo} alt="" />
            </div>
            ))}
            <div className="grid-item">
            <label htmlFor="photo-upload" className="photo-upload-label">
                <span className="photo-upload-icon">+</span>
                <span className="photo-upload-text">Upload Photo</span>
            </label>
            <input
                id="photo-upload"
                className="photo-upload-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoSelect}
            />
            </div>
        </div>
    </div>
  );
}
