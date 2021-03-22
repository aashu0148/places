import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

function ImageUpload() {
  const imageInput = useRef();
  const [file, setfile] = useState();
  const [previewURL, setPreviewURL] = useState();

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const imagePickedHandler = (e) => {
    if (e.target.files.length == 0) return;
    const file = e.target.files[0];
    setfile(file);
  };

  const openImagePicker = () => {
    imageInput.current.click();
  };

  return (
    <div className="image-upload">
      <div className="image-upload_preview">
        <img src={previewURL} />
      </div>
      <input
        ref={imageInput}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={(e) => imagePickedHandler(e)}
      />
      <button onClick={openImagePicker} type="button">
        Pick a Image
      </button>
    </div>
  );
}

export default ImageUpload;
