import { useState } from "react";
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
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

    // Step 1: State for each input (what I know)
    const [warmupName, setWarmupName] = useState("");
    const [urlInput, setUrlInput] = useState("");

    // Step 2: Micro managing input and change states
    const nameHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed name: " + value);
        setWarmupName(value);
    };

    const urlHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed url: " + value);
        setUrlInput(value);
    }

    // extract YouTube Preview Links
    const extractVideoId = (url) => {
        const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    };
    const extractedVideoId = extractVideoId(urlInput);


    // Step 3: How I look like 
    // Validation logic (is the input red or green)
    let nameInputValid = true;
    let urlInputValid = true;

    if(warmupName.length <= 0) {
        nameInputValid = false;
    }
    if(urlInput <= 0 || !urlInput.match(/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)) {
        urlInputValid = false;
    }

    // Callback for submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting form")
    }

    return (
        <div>
            <NavBar />
            {/* This form collect data for warmup.json */}
            <div className="grid-container">
                <div className="card"> 
                    <div className="instructions">
                        <h1>New Warmup</h1>
                        <p>Add your warm-up exercise here!</p>
                    </div>
        
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Divider: Step 1 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p>Step 1</p>
                            <div className="line"></div>
                        </div>

                        {/* collect Name */}
                        <div className="d-flex flex-column">
                            <h2>Name</h2> 
                            <input
                            value={warmupName}
                            placeholder="e.g. Box Breathing"
                            onChange={nameHandleChange}
                            className="input"
                            />
                            {/* conditional rendering for invalid input*/}
                            {!nameInputValid
                            && <div className="invalid-feedback">Please enter a valid name for warmup</div>
                            }
                        </div>

                        {/* collect url */}
                        <h2>Upload Warmup from URL:</h2>
                        <div className="d-flex flex-column">
                            <input
                            placeholder="e.g. https://www.youtube.com/.."
                            onChange={urlHandleChange}
                            className="input"
                            />
                            {/* Only render video preview if url is valid */}
                            {urlInputValid
                            && <YouTube videoId={extractedVideoId} opts={{ width: "100%", height: "300" }} />
                            }
                        </div>

                        {/* collect warmup id for playlist.json */}
                        <h2>Select Playlist</h2>
                        <SelectPlaylistBar />

                        {/* collect visibility for warmup.json */}
                        <h2>Visibility</h2>
                        <VisibilityBar />

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
                    </form>
                    
                    <button>Submit</button>
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



// Youtube testing links
  // https://www.youtube.com/watch?v=zjGNmDqTgeo&t=15s // true
  // https://www.example.com/watch?v=dQw4w9WgXcQ // false
  // https://youtu.be/YCLyAmXtpfY?si=o7e5YkTgjZm4QJcS // true