// Owner: Meiyao Li
// React Library Imports
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import classNames from 'classnames';
// Components Imports
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { NavButton } from "../utils/NavButton.jsx";
// Playlist Data for playlist selection
import albumsData from "../../data/playlist.json";

import { useNavigate } from 'react-router';


function CreateWarmupForm(props) {

    // Step 1: State (what I know)
    // User Inputs
    const [warmupName, setWarmupName] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [imgInput, setImgInput] = useState("");
    const [altInput, setAltInput] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [difficulty, setDifficulty] = useState('');
    const [technique, setTechnique] = useState('');
    const [voiceType, setVoiceType] = useState('');
    const [voiceRegister, setVoiceRegister] = useState('');
    const [showErrorMessages, setShowErrorMessages] = useState(false);
    // Modal Navigations
    const navigateTo = useNavigate();
    const [show, setShow] = useState(false);
    // Model Functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleGoBack = () => {
        setShow(false);
        navigateTo(-1); // equavalent of window.history.back();
    }

    // Store data in Firebase
    const saveToDatabase = async (userInput) => {
        try {
            const docRef = await addDoc(collection(db, 'userInputs'), userInput);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    // Options for SelectBar
    const playlists = albumsData;
    const playlistNames = playlists.map(playlist => {
        return playlist.Name;
    });
    const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
    const techniqueOptions = ['Breath Support', 'Vocalization', 'Articulation', 'Diction', 'Rhythm', 'Harmony'];
    const voiceTypeOptions = ['Full-Range','Soprano', 'Alto', 'Tenor', 'Base'];
    const voiceRegisterOptions = ['Chest Voice', 'Head Voice', 'Mixed', 'Vocal Fry'];

    // Step 2: Micro managing input and change states (Change what I know)
    const nameHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed name: " + value);
        setWarmupName(value);
    };

    const urlHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed url: " + value);
        setUrlInput(value);
        setImgInput(getYouTubeThumbnail(value).thumbnailUrl);
        setAltInput(getYouTubeThumbnail(value).altText);
    }

    const playlistHandleChange = (event) => {
        const value = event.target.value;
        console.log("user selected playlist: " + value);
        setPlaylistId(value);
    }

    const difficultyHandleChange = (event) => {
        const value = event.target.value;
        console.log("user selected difficulty: " + value);
        setDifficulty(value);
    }

    const techniqueHandleChange = (event) => {
        const value = event.target.value;
        console.log("user selected technique: " + value);
        setTechnique(value);
    }

    const voiceTypeHandleChange = (event) => {
        const value = event.target.value;
        console.log("user selected voice type: " + value);
        setVoiceType(value);
    }

    const voiceRegisterHandleChange = (event) => {
        const value = event.target.value;   
        console.log("user selected voice register: " + value);
        setVoiceRegister(value);
    }

    // extract YouTube Preview Links
    const extractVideoId = (url) => {
        const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    };
    const extractedVideoId = extractVideoId(urlInput);

    // extract YouTube thumbnails (AI-Generated to help with a trivial feature)
    function getYouTubeThumbnail(url) {
        // Extract the video ID from the URL
        const videoId = new URLSearchParams(new URL(url).search).get('v');
        
        if (videoId) {
          // Construct the thumbnail URL
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          const altText = "YouTube video thumbnail"; // Default alt text
      
          return { thumbnailUrl, altText };
        } else {
          return { error: "Invalid YouTube URL" };
        }
      }

    // Step 3: When to show error messages (Is what I know valid?)
    // Validation Logic that Change ClassName for <input>
    // takes no arguments, references the state variables
    // return {name: true, age: true, playlist: false}
    const getCurrentValidity = () => {
        const nameInputValid = warmupName.length > 0;
        const urlInputValid = extractedVideoId !== null;
        const playlistInputValid = playlistId.length > 0;
        const difficultyInputValid = difficulty.length > 0;
        const techniqueInputValid = technique.length > 0;
        const voiceTypeInputValid = voiceType.length > 0;
        const voiceRegisterInputValid = voiceRegister.length > 0;

        return {
            name: nameInputValid,
            url: urlInputValid,
            playlist: playlistInputValid,
            difficulty: difficultyInputValid,
            technique: techniqueInputValid,
            voiceType: voiceTypeInputValid,
            voiceRegister: voiceRegisterInputValid,
        }
    }

    // Step 4: Handle form submission (Tell users what I know is valid or not)
    // Start displaying error messages when user clicks submit
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowErrorMessages(true);

        const validityObj = getCurrentValidity();

        const isFormValid = validityObj.name &&
                            validityObj.url &&
                            validityObj.playlist &&
                            validityObj.difficulty &&
                            validityObj.technique &&
                            validityObj.voiceType &&
                            validityObj.voiceRegister;
        if(isFormValid){
            console.log("Form submitted successfully!");
            console.log("warmupName: " + warmupName);
            console.log("urlInput: " + urlInput);
            console.log("playlistId: " + playlistId);
            console.log("difficulty: " + difficulty);
            console.log("technique: " + technique);
            console.log("voiceType: " + voiceType);
            console.log("voiceRegister: " + voiceRegister);
            // save to database
            saveToDatabase({
                warmupName: warmupName,
                urlInput: urlInput,
                img: imgInput,
                alt: altInput,
                playlistId: playlistId,
                difficulty: difficulty,
                technique: technique,
                voiceType: voiceType,
                voiceRegister: voiceRegister
            })
        } else {
            console.log("Form is invalid, please check your inputs");
        }
    }

    /* SHOW THE CONTENT */
    const validityObj = getCurrentValidity();

    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card"> 
                    <div className="instructions">
                        <h1>New Warmup</h1>
                        <p className="smallText">Upload a new warm-up exercise for the Community!</p>
                    </div>

                    {/* Divider: Step 1 */}
                    <div className="line-container">
                        <div className="line"></div>
                            <p className="smallText">Step 1: Upload Warmup</p>
                        <div className="line"></div>
                    </div>

                    {/* This form collect data for warmup.json */}
                    <form onSubmit={handleSubmit} className="flex-container">
                        {/* Name Inpute */}
                        <div>
                            <h2>Name</h2> 
                            <input
                                value={warmupName}
                                placeholder="e.g. Box Breathing"
                                onChange={nameHandleChange}
                                className={classNames('input', { 'is-invalid': showErrorMessages && !validityObj.name })}
                            />
                            {/* conditional rendering for invalid input */}
                            {showErrorMessages && validityObj.name === false
                            && (<div className="invalid-feedback">Please enter a valid name for warmup</div>)
                            }
                        </div>

                        {/* collect url */}
                        <div>
                            <h2>Upload Warmup from URL:</h2>
                            <input
                                placeholder="e.g. https://www.youtube.com/.."
                                onChange={urlHandleChange}
                                className={classNames('input', { 'is-invalid': showErrorMessages && !validityObj.url })}
                            />
                            {/* Render video preview in real time */}
                            {validityObj.url === true
                            && <YouTube videoId={extractedVideoId} opts={{ width: "100%", height: "300" }} />
                            }
                            {showErrorMessages && validityObj.url === false
                            && <div className="invalid-feedback">Please enter a valid YouTube link for warmup</div>
                            }
                        </div>
                        
                        {/* Divider: Step 2 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p className="smallText">Step 2: Add to a Playlist</p>
                            <div className="line"></div>
                        </div>

                        {/* collect warmup id for playlist.json */}
                        <div>
                            <h2>Select Playlist</h2>
                            <SelectBar
                                options={playlistNames}
                                handleSelect={playlistHandleChange}
                                showErrorMessagesSelect={showErrorMessages && !validityObj.playlist}
                            />
                            {/* conditional rendering for invalid input*/}
                            {showErrorMessages && validityObj.playlist === false
                            && <div className="invalid-feedback">Please select a playlist to add into.</div>
                            }
                        </div>

                        {/* Divider: Step 3 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p className="smallText">Step 3: Make it Discoverable!</p>
                            <div className="line"></div>
                        </div>

                        {/* collect difficulty for warmup.json */}
                        <div>
                            <h2>Difficulty Level</h2>
                            <SelectBar 
                                options={difficultyOptions}
                                handleSelect={difficultyHandleChange}
                                showErrorMessagesSelect={showErrorMessages && !validityObj.difficulty}                            
                            /> 
                            {/* conditional rendering for invalid input*/}
                            {showErrorMessages && validityObj.difficulty === false
                            && <div className="invalid-feedback">Please select an option</div>
                            }
                        </div>

                        {/* collect technique for warmup.json */}
                        <div>
                            <h2>Technique</h2>
                            <SelectBar 
                                options={techniqueOptions}
                                handleSelect={techniqueHandleChange} 
                                showErrorMessagesSelect={showErrorMessages && !validityObj.technique}                           
                            />
                            {showErrorMessages && validityObj.technique === false
                            && <div className="invalid-feedback">Please select an option</div>
                            }
                        </div>
                    

                        {/* collect voice type for warmup.json */}
                        <div>
                            <h2>Voice Type</h2>
                            <SelectBar 
                                options={voiceTypeOptions}
                                handleSelect={voiceTypeHandleChange}
                                showErrorMessagesSelect={showErrorMessages && !validityObj.voiceType}                            
                            /> 
                            {showErrorMessages && validityObj.voiceType === false
                            && <div className="invalid-feedback">Please select an option</div>
                            }
                        </div>

                        {/* collect voice register for warmup.json */}
                        <div>
                            <h2>Voice Register</h2>
                            <SelectBar 
                                options={voiceRegisterOptions}
                                handleSelect={voiceRegisterHandleChange} 
                                showErrorMessagesSelect={showErrorMessages && !validityObj.voiceRegister}
                            /> 
                            {showErrorMessages && validityObj.voiceRegister === false
                            && <div className="invalid-feedback">Please select an option</div>
                            }
                        </div>
                        
                        {/* Divider: Step 4 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p className="smallText">Step 4: Publish Online!</p>
                            <div className="line"></div>
                        </div>

                        {/* Submit button should be centered */}
                        <button className="badge-pill" onClick={handleShow}>Submit</button>
                        {/* <button className="badge-pill" onClick={handleShow} disabled={!isFormValid}>Submit</button> */}

                        {/* Confirmation Model */}
                        {/* <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-dark">Congratulations!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-dark">Your warmup is successfully uploaded</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleGoBack}>
                                Go Back
                            </Button>
                            <NavButton text="View in Profile" destination="/profile">
                                View in Profile
                            </NavButton>
                            </Modal.Footer>
                        </Modal>                         */}
                    </form>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}

export default CreateWarmupForm;

function SelectBar({options, handleSelect, showErrorMessagesSelect}) {
    // turn [string, string, string] into [<>, <>, <>]
    const selectBar = options.map(option => (
        <option key={option} value={option}>{option}</option>
    ));

    return (
        <div> 
            <select 
                className={classNames('input', { 'is-invalid': showErrorMessagesSelect })}
                onChange={handleSelect}>
                <option value="">Select an option</option>
                {selectBar}
            </select>
        </div>
    );
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
