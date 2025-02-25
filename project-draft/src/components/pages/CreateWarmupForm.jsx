// Meiyao's upload.html from draft 1

import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { NavButton } from "../utils/NavButton.jsx";
import { InputBar } from "../utils/InputBar.jsx";
import { SelectBar } from "../utils/SelectBar.jsx";
import { VisibilityBar } from "../utils/VisibilityBar.jsx";
import { UploadImageForm } from "../utils/UploadImageForm.jsx";

import albumsData from "../../data/playlist.json";

function CreateWarmupForm(props) {
    return (
        <div>
            <NavBar />
            <div className="grid-container">
                {/* This form collect data for warmup.json */}
                <div className="card"> 
                    <div className="instructions">
                        <h1>New Warmup</h1>
                        <p>Add your warm-up exercise here!</p>
                    </div>

                    {/* Divider: Step 1 */}
                    <div className="line-container">
                            <div className="line"></div>
                                <p>Step 1</p>
                            <div className="line"></div>
                    </div>

                    {/* collect Name */}
                    <h2>Upload Image:</h2>
                    <UploadImageForm />

                    {/* collect Name */}
                    <h2>Name</h2>
                    <InputBar /> 

                    {/* collect warmup id for playlist.json */}
                    <h2>Select Playlist</h2>
                    <SelectPlaylistBar />

                    {/* collect visibility for warmup.json */}
                    <h2>Visibility</h2>
                    <VisibilityBar />

                    <div>
                        
                        
                        {/* Divider: Step 2 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p>Step 2</p>
                            <div className="line"></div>
                        </div>

                        <h2>Upload Warmup from URL:</h2>
                        <div className="d-flex flex-column">
                            <InputBar />
                            <NavButton text={"Create New Warmup"} destination={"/"}/>    
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateWarmupForm;


function SelectPlaylistBar(props) {
    // turn [{}, {}, {}] into [" ", " ", " "]
    const playlists = albumsData;
    const playlistNames = playlists.map(playlist => {
        return playlist.Name;
    })

    return (
        <SelectBar props={playlistNames}/>
    )
}