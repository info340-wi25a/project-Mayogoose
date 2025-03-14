// Owner: Meiyao

import React, { useRef, useState } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getApp } from 'firebase/app';
import { useNavigate } from "react-router";

export function UploadImageForm({elements, onImageUpload}) {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleSelect = (event) => {
        const value = event.target.value;
        if (value === "warmup") {
          navigate("/createWarmup");
        } else if (value === "2") {
          navigate("/organize");
        }
    };

    return (
        <div className="upload-box">
            <span className="material-symbols-outlined">
                upload_file
            </span>
            <p className="smallText">Max 5 MB files are allowed</p>
            <UploadButton 
                onFileSelect={setImageFile} 
                onPreviewChange={setPreviewUrl} 
                onImageUpload={onImageUpload} 
            />
            {previewUrl && (
                <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="preview-image"
                />
            )}
        </div>
    );
}

// private helper
function UploadButton({ onFileSelect, onPreviewChange, onImageUpload }){
    const fileInputRef = useRef(null);

    const handleUpload = (event) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();  // Opens file picker
        }
    };

    const handleFileChange = async (event) => {
        if (event.target.files.length > 0 && event.target.files[0]) {
            const file = event.target.files[0];
            onFileSelect(file);
            onPreviewChange(URL.createObjectURL(file));

            try {
                const storage = getStorage(getApp(), "gs://info340-media.firebasestorage.app");
                const storageReference = storageRef(storage, "group-AA4/path/to/file.png");
                
                // Upload the file
                await uploadBytes(storageReference, file);
                
                // Get the download URL
                const downloadURL = await getDownloadURL(storageReference);
                if (onImageUpload) {
                    onImageUpload(downloadURL);
                }
                console.log("Upload completed, URL:", downloadURL);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <div className="createWrap">
            <button className="uploadButton" onClick={handleUpload}>
                Upload
            </button>
            <input className="fileInput"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </div>
    )
}

// private helper
function AbandonedUploadButton(){
    const handleSelect = (event) => {
        const value = event.target.value;
        if (value === "Photo Library") {
          console.log ("User upload warm-up cover from phone photo library");
        } else if (value === "Take Photo") {
            console.log ("User upload warm-up cover by taking a photo");
        } else if (value === "Choose File") {
            console.log ("User upload warm-up cover from computer file");
        }
    };

    return (
        <div className="createWrap">
            <select className="uploadButton" onChange={handleSelect} defaultValue="">
                <option value="" disabled>Upload</option>
                <option value="Photo Library">Photo Library</option>
                <option value="Take Photo">Take Photo</option>
                <option value="Choose File">Choose File</option>
            </select>
        </div>
    )
}