// Owner: Meiyao Li
// React Library Imports
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import classNames from 'classnames';
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue, get as firebaseGet } from "firebase/database";
// Components Imports
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
// Playlist Data for default playlist selection (to be replaced by Firebase data)
import albumsData from "../../data/playlist.json";

function CreateWarmupForm({userID, auth, firebaseUIConfig}) {

    // Step 1: what I know:
    // State: User Inputs
    const [warmupName, setWarmupName] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [imgInput, setImgInput] = useState("");
    const [altInput, setAltInput] = useState("");
    const [playlistObj, setPlaylistObj] = useState(albumsData);
    const [playlistId, setPlaylistId ] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [technique, setTechnique] = useState('');
    const [voiceType, setVoiceType] = useState('');
    const [voiceRegister, setVoiceRegister] = useState('');
    const [showErrorMessages, setShowErrorMessages] = useState(false);
    // State: Modal Display
    const [show, setShow] = useState(false);

    // Modal Navigation callback functions
    const navigateTo = useNavigate();
    const handleClose = () => {
        setShow(false);
        navigateTo("/profile");
    }
    const handleShow = () => {
        setShow(true);
    }
    const handleGoBack = () => {
        setShow(false);
        navigateTo(-1); // equavalent of window.history.back();
    }
    const handlePlay = () => {
        console.log("handleplay triggered, redirecting to playlist page");
        setShow(false);
    }

    // Select Bar Options:
    // 1. Real time playlist dataObj from firebase
    useEffect(() => {
        const db = getDatabase(); // get a reference to the database
        const playlistsRef = ref(db, 'playlists'); // a link to firebase's playlist node

        // addEventlistner('databaseChange', callback to update playlist options & ref)
        onValue(playlistsRef, (snapshot) => {
            console.log("playlists data changes in firebase:");
            const dataObj = snapshot.val();
            
            if (dataObj) {
                setPlaylistObj(dataObj);
            } else {
                console.warn("No Playlist data found in firebase.");
                setPlaylistObj({});
            }
        },
            (error) => {
                console.error("Error fetching playlist data: ", error.message);
                setPlaylistObj({}); // Fallback value to prevent UI crashes
        });
    }, []);

    // update playlist options for users
    const playlistKeys = Object.keys(playlistObj);
    const playlistOptions = playlistKeys.map((keyString) => {
        const transformed = playlistObj[keyString].playlistName;
        return transformed;
    });

    // 2. Static Data for pre-defined tags
    const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
    const techniqueOptions = ['Breath Support', 'Vocalization', 'Articulation', 'Diction', 'Rhythm', 'Harmony'];
    const voiceTypeOptions = ['Full-Range','Soprano', 'Alto', 'Tenor', 'Base'];
    const voiceRegisterOptions = ['Chest Voice', 'Head Voice', 'Mixed', 'Vocal Fry'];

    // Step 2: Change what I know:
    // Micro managing input and change states (
    const nameHandleChange = (event) => {
        const value = event.target.value;
        setWarmupName(value);
    };

    const urlHandleChange = (event) => {
        const value = event.target.value;
        setUrlInput(value);
        setImgInput(getYouTubeThumbnail(value).thumbnailUrl);
        setAltInput(getYouTubeThumbnail(value).altText);
    }
    
    const playlistHandleChange = (event) => {
        const value = event.target.value;

        // set ref key for database
        Object.keys(playlistObj).map((key) => {
            if (playlistObj[key].playlistName === value) {
                setPlaylistId(key);
            }
        });  
    }

    const difficultyHandleChange = (event) => {
        const value = event.target.value;
        setDifficulty(value);
    }

    const techniqueHandleChange = (event) => {
        const value = event.target.value;
        setTechnique(value);
    }

    const voiceTypeHandleChange = (event) => {
        const value = event.target.value;
        setVoiceType(value);
    }

    const voiceRegisterHandleChange = (event) => {
        const value = event.target.value;   
        setVoiceRegister(value);
    }

    // extract YouTube Preview Links (AI-assisted)
    const extractVideoId = (url) => {
        const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    };
    const extractedVideoId = extractVideoId(urlInput);

    // extract YouTube thumbnails to store as warmup cover image (AI-assisted)
    function getYouTubeThumbnail(url) {
        // Extract the video ID from the URL
        try {
            let videoId = '';
            if(url.includes("youtu.be/")) { // URL structure 1: 'https://youtu.be/VIDEO_ID
                videoId = url.split("youtu.be/")[1]?.split("?")[0];
            } else if (url.includes("youtube.com/watch")) { // URL structure 2: 'https://youtube.com/watch?v=VIDEO_ID
                videoId = new URLSearchParams(new URL(url).search).get('v');
            }
            
            if (videoId) {
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                const altText = "YouTube video thumbnail";
                return { thumbnailUrl, altText };
            }
        } catch (error) {
            console.error("Error extracting thumbnail:", error);
            return { error: "Invalid YouTube URL" };
        }
    }

    // Step 3: When to test what I know & show error messages
    // Validation Logic that Change ClassName for <input>
    // takes no arguments, references the state variables
    // return {name: true, age: true, playlist: false} a validity object
    const getCurrentValidity = () => {
        const nameInputValid = warmupName.length > 0;
        const urlInputValid = extractedVideoId !== null;
        const playlistInputValid = playlistObj.length > 0;
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

    // Step 4: What to do with what I know
    const addWarmupToDatabase = () => {
        const db = getDatabase();

        // create a new warmup object to be added to database
        const newWarmupObj = {
            ownerId: userID,
            warmupName: warmupName,
            url: urlInput,
            img: imgInput,
            alt: altInput + " for " + warmupName,
            difficulty: difficulty,
            technique: technique,
            voiceType: voiceType,
            voiceRegister: voiceRegister
        }
        const warmupRef = ref(db, 'warmup');

        firebasePush(warmupRef, newWarmupObj)
            .then((warmupSnapshot) => {
                // Step 1: add warmup to /warmup
                const warmupId = warmupSnapshot.key; // prevent firebase auto-regenerate new key
                console.log("Warmup added successfully with ID: ", warmupId);
                // Step 2: add warmup to /playlist
                const warmupPlaylistRef = ref(db, `playlists/${playlistId}/warmups/${warmupId}`);
                firebaseSet(warmupPlaylistRef, newWarmupObj)
                .then(() => console.log("Warmup added to", playlistId, "playlist successfully")
                .catch(error => console.log("Error adding warmup to playlist: ", error)));
            })
            .catch((error) => {
                console.error("Error adding warmup: ", error);
            });
    }


    // Step 5: Handle form submission
    // When user clicks submit, display error messages or store data if there's no error
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowErrorMessages(true);

        const validityObj = getCurrentValidity();

        const formValid = validityObj.name &&
                            validityObj.url &&
                            validityObj.playlist &&
                            validityObj.difficulty &&
                            validityObj.technique &&
                            validityObj.voiceType &&
                            validityObj.voiceRegister;
        if(formValid){
            handleShow();
            addWarmupToDatabase();
        } else {
            console.log("Form is invalid, please check your inputs");
        }
    }

    /* SHOW THE CONTENT */
    const validityObj = getCurrentValidity();

    return (
        <div>
            <NavBar userObj={userID} auth={auth} firebaseUIConfig={firebaseUIConfig}/>
            <div className="grid-container">
                <div className="card"> 
                    <div className="instructions">
                        <h1>New Warmup</h1>
                        <p className="smallText">Contribute new warmups for the singer Community!</p>
                    </div>

                    {/* Divider: Step 1 */}
                    <div className="line-container">
                        <div className="line"></div>
                        <p className="smallText">Step 1: Upload Warmup</p>
                        <div className="line"></div>
                    </div>

                    {/* This form collect data for warmup.json */}
                    <form onSubmit={handleSubmit} className="d-flex">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="warmup-name">Warmup name:</label> 
                            <input
                                type="text"
                                name="warmup-name"
                                id="warmup-name"
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
                            <label htmlFor="warmup-url">Upload Warmup from URL:</label> 
                            <input
                                type="text"
                                name="warmup-url"
                                id="warmup-url"
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
                            <SelectBar
                                id="Playlist"
                                options={playlistOptions}
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
                            <SelectBar 
                                id="Difficulty"
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
                            <SelectBar 
                                id="Technique"
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
                            <SelectBar 
                                id="Voice Type"
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
                            <SelectBar 
                                id="Voice Register"
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

                        <button className="badge-pill mx-auto" onClick={handleSubmit}>Submit</button>
                        
                        {/* Confirmation Model */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-dark">Congratulations!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-dark">Your warmup is successfully uploaded</Modal.Body>
                            <Modal.Footer>
                            <Button className="badge-pill grey" onClick={handleGoBack}>
                                Go Back
                            </Button>
                            <button className="badge-pill" onClick={handlePlay}>
                                <Link className="text-decoration-none text-dark" to={`/playlist/${playlistId}`}>Play Now!</Link>
                            </button>
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

function SelectBar({id, options, handleSelect, showErrorMessagesSelect}) {
    // turn [string, string, string] into [<>, <>, <>]
    const selectBar = options.map(option => (
        <option key={option} value={option}>{option}</option>
    ));

    return (
        <div> 
            <label htmlFor={id}>{id + ": "}</label>
            <select
                id={id}
                name={ "select-"+ id }
                className={classNames('input', { 'is-invalid': showErrorMessagesSelect })}
                onChange={handleSelect}>
                <option value="placeholder">Select an option</option>
                {selectBar}
            </select>
        </div>
    );
}


// Youtube testing links
  // https://www.youtube.com/watch?v=zjGNmDqTgeo&t=15s // true
  // https://www.example.com/watch?v=dQw4w9WgXcQ // false
  // https://youtu.be/YCLyAmXtpfY?si=o7e5YkTgjZm4QJcS // true