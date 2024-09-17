import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./utils/firebase";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

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
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <div>
        {imageUrl && (
          <div>
            <p>Uploaded Image:</p>
            <img src={imageUrl} alt="User's photo" />
          </div>
        )}
        {progress > 0 && <p>Upload Progress: {progress}%</p>}
        <input type="file" onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload}>Upload New</button>
    </div>
  );
};

export default ImageUpload;
