import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import "./ImageUpload.scss";

const ImageUpload = ({ photo, imageUrl, setImageUrl }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="image-upload">
      <div className="image-upload__photo-block">
        {imageUrl ? (
          <div>
            <p>Uploaded Image:</p>
            <img
              src={imageUrl}
              alt="User's photo"
              className="image-upload__photo"
            />
          </div>
        ) : (
          <img src={photo} alt="User's photo" className="image-upload__photo" />
        )}
        {progress > 0 && progress < 100 && (
          <p>Upload Progress: {Math.round(progress)}%</p>
        )}
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose a file
        </label>
        <input type="file" id="file-upload" onChange={handleFileChange} />
      </div>
      <button
        onClick={handleUpload}
        className="image-upload__button image-upload__button--upload"
      >
        Upload New
      </button>
    </div>
  );
};

export default ImageUpload;
