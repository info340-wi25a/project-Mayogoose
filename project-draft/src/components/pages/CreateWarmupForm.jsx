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
    // ask prof: CreatePlaylistForm use these data too
    // should I store this as a prop (array of arrays) and pass them in
    // what's the most efficient way to not store the same data twice?
    const voiceType = ['Soprano', 'Alto', 'Tenor', 'Base'];
    const voiceRegister = ['Chest Voice', 'Head Voice', 'Mixed', 'Vocal Fry'];
    const difficulty = ['Beginner', 'Intermediate', 'Advanced'];
    const style = ['Classical', 'Musical', 'Jazz', 'Pop', 'A Cappella'];

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

                    <div>
                        {/* Divider: Step 1 */}
                        <div className="line-container">
                        <div className="line"></div>
                            <p>Step 1</p>
                        <div className="line"></div>
                        </div>

                        {/* collect Name */}
                        <h2>Name</h2>
                        <div className="d-flex flex-column">
                            <InputBar placeholder="e.g. Box Breathing "/>   
                        </div>

                        {/* collect url */}
                        <h2>Upload Warmup from URL:</h2>
                        <div className="d-flex flex-column">
                            <InputBar placeholder="e.g. https://www.youtube.com/.." />   
                        </div>

                        {/* collect warmup id for playlist.json */}
                        <h2>Select Playlist</h2>
                        <SelectPlaylistBar />

                        {/* collect visibility for warmup.json */}
                        <h2>Visibility</h2>
                        <VisibilityBar />
                    </div>

                    <div>
                        {/* Divider: Step 2 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p>Step 2 (Optional)</p>
                            <div className="line"></div>
                        </div>
                        
                        {/* collect Name */}
                        <h2>Upload Image:</h2>
                        <UploadImageForm />

                        {/* collect voice type for warmup.json */}
                        <h2>Voice Type</h2>
                        <SelectBar props={voiceType} />

                        {/* collect voice register for warmup.json */}
                        <h2>Voice Register</h2>
                        <SelectBar props={voiceRegister} />

                        {/* collect difficulty for warmup.json */}
                        <h2>Difficulty Level</h2>
                        <SelectBar props={difficulty} />

                        {/* collect style for warmup.json */}
                        <h2>Style</h2>
                        <SelectBar props={style} />
                    </div>

                    <NavButton text={"Create New Warmup"} destination={"/"}/> 
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