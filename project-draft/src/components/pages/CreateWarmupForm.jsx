// Meiyao's upload.html from draft 1

// import { NavBar } from "../navigation/NavBar.jsx";  Ellie
// import { CreateFrom } from "../utils/CreateForm.jsx"; Meiyao
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { NavButton } from "../utils/NavButton.jsx";
import { InputBar } from "../utils/InputBar.jsx";
import { VisibilityBar } from "../utils/VisibilityBar.jsx";
import { SelectPlaylistBar } from "../utils/SelectPlaylistBar.jsx";

import albumsData from "../../data/playlist.json";

function CreateWarmupForm(props) {
    return (
        <div className="grid-container">
            <div className="card">
                <div className="instructions">
                    <h1>New Warmup</h1>
                    <p>Configure user's warmup</p>
                    <img 
                    classname="homepageCover" 
                    src="/img/album-cover.jpeg"
                    style={{ width: "200px", height: "auto" }} ></img>
                </div>
                <h2>Name</h2>
                <InputBar />
                <SelectPlaylistBar props={albumsData} />
                <h2>Visibility</h2>
                <VisibilityBar />
            </div>
            <div className="card">

                <div className="instructions">
                    <h1>Media Upload</h1>
                    <p>Add your warm-up exercise here!</p>
                </div>

                <div>
                    <h2>Upload from Local Device:</h2>
                    <div className="upload-box">
                        <span className="material-symbols-outlined">
                            upload_file
                        </span>
                        <p> Max 10 MB files are allowed, each file 2 minutes max. Only supports .mp3</p>
                    </div>
                    <div className="line-container">
                        <div className="line"></div>
                            <p>OR</p>
                        <div className="line"></div>
                    </div>
                    <h2>Upload from URL:</h2>
                    <div className="d-flex flex-column">
                        <InputBar />
                        <NavButton text={"Create!"} destination={"/"}/>    
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CreateWarmupForm;



{/* <main>

            <div class="card">
                    
                <!-- Upload from URL links -->
                

                <!-- OR divider -->
                <div class="line-container">
                    <div class="line"></div>
                        <p>OR</p>
                    <div class="line"></div>
                </div>

                <!-- Upload from voice recording -->
                <div class="record-box"> 
                    <h2>Record a New Vocal Warm-up!</h2>
                    <img src="../img/microphone-icon.svg" alt="Microphone" onClick="">
                    <p class="press-text">Press to Record</p>
                    <p class="click-text">Click to Record</p>
                </div>

                <!--  bottom nav -->
                <div class="bottom-nav">
                    <a href="#" class="nav-item">
                        <img src="../img/home.png" alt="Home Icon">
                        <span>Home</span>
                    </a>
                    <a href="#" class="nav-item create-button" data-bs-toggle="modal" data-bs-target="#createModal">
                        + Create
                    </a>
                    <a href="#" class="nav-item">
                        <img src="../img/library.png" alt="Library Icon">
                        <span>Your Library</span>
                    </a>
                </div>
            </div>
        </main> */}