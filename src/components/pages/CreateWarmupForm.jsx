// React imports
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import { Routes, Route } from 'react-router'; // class example
// Components imports
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { SelectBar } from "../utils/SelectBar.jsx";
import { VisibilityBar } from "../utils/VisibilityBar.jsx";
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import { NavButton } from "../utils/NavButton.jsx";
// Playlist Data
import albumsData from "../../data/playlist.json";



function CreateWarmupForm(props) {

    // Step 1: State for each input (what I know)
    const [warmupName, setWarmupName] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [technique, setTechnique] = useState('');
    const [voiceType, setVoiceType] = useState('');
    const [voiceRegister, setVoiceRegister] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const techniqueOptions = ['Breath Support', 'Vocalization', 'Articulation', 'Diction', 'Rhythm', 'Harmony'];
    const voiceTypeOptions = ['Full-Range','Soprano', 'Alto', 'Tenor', 'Base'];
    const voiceRegisterOptions = ['Chest Voice', 'Head Voice', 'Mixed', 'Vocal Fry', 'Falsetto'];
    const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];


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

    // Modal Navigations
    // State
    const [show, setShow] = useState(false);
    // Recipes
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleGoBack = () => {
        console.log ("going back to the last page (App or Playlist)");
        window.history.back();
    }

    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card"> 
                    <div className="instructions">
                        <h1>New Warmup</h1>
                        <p class="smallText">Upload a new warm-up exercise for the Community!</p>
                    </div>

                    {/* Divider: Step 1 */}
                    <div className="line-container">
                        <div className="line"></div>
                            <p class="smallText">Step 1: Upload Warmup</p>
                        <div className="line"></div>
                    </div>

                    {/* This form collect data for warmup.json */}
                    <form onSubmit={handleSubmit} className="flex-containers">
                        {/* collect Name */}
                        <div>
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
                        <div>
                            <h2>Upload Warmup from URL:</h2>
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
                        
                        {/* Divider: Step 2 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p class="smallText">Step 2: Add to a Playlist</p>
                            <div className="line"></div>
                        </div>

                        {/* collect warmup id for playlist.json */}
                        <div>
                            <h2>Select Playlist</h2>
                            <SelectPlaylistBar />
                        </div>

                        {/* Divider: Step 3 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p class="smallText">Step 3: Make it Discoverable!</p>
                            <div className="line"></div>
                        </div>

                        {/* collect difficulty for warmup.json */}
                        <div>
                            <h2>Difficulty Level</h2>
                            <SelectBar props={difficultyOptions} />    
                        </div>

                        {/* collect technique for warmup.json */}
                        <div>
                            <h2>Technique</h2>
                            <SelectBar props={techniqueOptions} /> 
                        </div>
                    

                        {/* collect voice type for warmup.json */}
                        <div>
                            <h2>Voice Type</h2>
                            <SelectBar props={voiceTypeOptions} /> 
                        </div>

                        {/* collect voice register for warmup.json */}
                        <div>
                            <h2>Voice Register</h2>
                            <SelectBar props={voiceRegisterOptions} /> 
                        </div>
                        
                        {/* Divider: Step 4 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p class="smallText">Step 4: Publish Online!</p>
                            <div className="line"></div>
                        </div>

                        {/* Submit button should be centered */}
                        <button className="badge-pill" onClick={handleShow}>Submit</button>

                        {/* Confirmation Model */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-dark">Congratulations!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-dark">Your warmup is successfully uploaded</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleGoBack}>
                                Go Back
                            </Button>
                            <NavButton text="View in Profile" destination="">
                                View in Profile
                            </NavButton>
                            </Modal.Footer>
                        </Modal>                        
                    </form>
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


// {/* Divider: Step 1 */}
// <div className="line-container">
//     <div className="line"></div>
//         <p class="smallText">Step 1: Upload Warmup</p>
//     <div className="line"></div>
// </div>
