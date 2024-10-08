import React, { useState } from "react";
import './styles/MyPhotoInput.css'

const MyPhotoInput = ({ onChange, tag }) => {
    const [image, setImage] = useState(null);
  
    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const file_obj = URL.createObjectURL(file);
        setImage(file_obj);
        onChange(file_obj, tag);
      }
    };
  
    return (
      <div className="photo-input-wrapper">
        <label className="photo-input-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <div
            className="photo-preview"
            style={{
              backgroundImage: `url(${image || 'https://icons.veryicon.com/png/o/business/back-stage-management/upload-pictures-1.png'})`,
            }}
          />
          {/* тут лучше использовать локальное изо так как оно берет его из другого сервера который может быть нелоступным, что приведет к багам, займусь этмм позже */}
        </label>
      </div>
    );
  };
  
  export default MyPhotoInput;