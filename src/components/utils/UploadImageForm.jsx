// Owner: Meiyao
import React, { useRef, useState } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getApp } from 'firebase/app';
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid'; // Reference: Asked google by how to create a unqiue ID 

export function UploadImageForm({ onImageUpload }) {
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    return (
        <div>
            {previewUrl && (
                <div className="upload-box">
                    <img
                        src={previewUrl} 
                        alt="Image preview for playlist cover" 
                        className="preview-image mb-4"
                    />
                    <UploadButton 
                        content="Replace"
                        onFileSelect={setImageFile} 
                        onPreviewChange={setPreviewUrl} 
                        onImageUpload={onImageUpload} 
                    />
                </div>
            )}
            {!imageFile &&
            <div className="upload-box">
                <span className="material-symbols-outlined">upload_file</span>
                <p className="smallText">Max 5 MB files are allowed</p>
                <UploadButton 
                    content="Upload"
                    onFileSelect={setImageFile} 
                    onPreviewChange={setPreviewUrl} 
                    onImageUpload={onImageUpload} 
                />
            </div>
            }
        </div>
    );
}

// private helper
function UploadButton({ content, onFileSelect, onPreviewChange, onImageUpload }){
    const fileInputRef = useRef(null);

    const handleUpload = (event) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();  // Opens file picker
        }
    };
// Reference: Lecture note and chatgpt for debugging 
    const handleFileChange = async (event) => {
        if (event.target.files.length > 0 && event.target.files[0]) {
            const file = event.target.files[0];
            onFileSelect(file);
            onPreviewChange(URL.createObjectURL(file));

            try {
                const storage = getStorage(getApp(), "gs://info340-media.firebasestorage.app");
                const uniqueId = uuidv4(); // Generate a unique ID - in order to install this package the React version should between 15 - 18
                const storageReference = storageRef(storage, `group-AA4/uploads/${uniqueId}.png`);

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
            <button className="badge-pill" onClick={handleUpload}>
                {content}
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
