// Owner: Meiyao

import { useNavigate } from "react-router-dom";

export function UploadImageForm({elements}) {
    const navigate = useNavigate();

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
            <p> Max 5 MB files are allowed</p>
            <UploadButton />
        </div>
    );
    
}

// private helper
function UploadButton(){

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