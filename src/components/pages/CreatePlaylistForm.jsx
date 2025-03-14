// Owner: Ellie
import { NavBar } from "../navigation/NavBar.jsx";
import { Footer } from '../navigation/Footer.jsx';
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import React from 'react';
import { useNavigate } from "react-router";
import { useState } from 'react';
import { getDatabase, ref, push as firebasePush } from "firebase/database";

export function CreatePlaylistForm({userID}) {
    // Step 1: State for each input
    const [playlistName, setPlaylistName] = useState('');
    const [goal, setGoal] = useState('');
    const [genre, setGenre] = useState('');
    const [visibility, setVisibility] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [showErrorMessages, setShowErrorMessages] = useState(false);
    const navigate = useNavigate();

    const goalOptions = ['Improvisation', 'Performance / Audition','Vocal Health', 'Vocal Techniques']
    const genreOptions = ['general', 'Classical', 'Musical', 'Jazz', 'Pop', 'A Cappella'];
    const visibilityOptions = ['Public', 'Private', 'Unlisted'];

    // Step 2: Input handlers
    const playlistHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed name: " + value);
        setPlaylistName(value);
    };

    const goalHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed goal: " + value);
        setGoal(value);
    }

    const genreHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed genre: " + value);
        setGenre(value);
    }

    const visibilityHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed visibility: " + value);
        setVisibility(value);
    }

    const handleImageUpload = (downloadURL) => {
        console.log("Image uploaded, URL:", downloadURL);
        setCoverImageUrl(downloadURL);
    }

    // Step 3: Validation
    const getCurrentValidity = () => {
        const nameInputValid = playlistName.length > 0;
        const goalInputValid = goal.length > 0;
        const genreInputValid = genre.length > 0;
        const visibilityInputValid = visibility.length > 0;

        return {
            name: nameInputValid,
            goal: goalInputValid,
            genre: genreInputValid,
            visibility: visibilityInputValid
        }
    }

    // Step 4: Add to Database
    const addPlaylistToDatabase = () => {
        // get a reference to the database
        const db = getDatabase();
        
        // create a new playlist object
        const newPlaylistObj = {
            playlistName: playlistName,
            goal: goal,
            genre: genre,
            visibility: visibility,
            coverImageUrl: coverImageUrl,
            alt: "playlist-cover-for-" + playlistName,
            createdAt: new Date().toISOString(),
            warmups: [], // Initialize empty warmups array
            ownerId: userID
        }

        // Add to Firebase
        console.log("Adding playlist");
        const playlistRef = ref(db, 'playlists'); // reference to firebase's playlists node
        firebasePush(playlistRef, newPlaylistObj)
            .then((snapshot) => {
                console.log("Playlist added successfully with key:", snapshot.key);
                // Navigate to add warmups page with the new playlist ID
                navigate("/addWarmup", { 
                    state: { 
                        playlistId: snapshot.key,
                        playlistName: playlistName 
                    } 
                });
            })
            .catch((error) => {
                console.error("Error adding playlist: ", error);
            });
    }

    // Step 5: Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowErrorMessages(true);

        const validityObj = getCurrentValidity();
        const isFormValid = Object.values(validityObj).every(value => value === true);

        if(isFormValid) {
            console.log("Form is valid, submitting...");
            addPlaylistToDatabase();
        } else {
            console.log("Form is invalid, please check your inputs");
        }
    }

    const validityObj = getCurrentValidity();

    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card">
                    <div className="instructions">
                        <h1>New Playlist</h1>
                        <br/>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-containers">
                        {/* Divider: Step 1 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p className="smallText">Step 1: Customize your Playlist</p>
                            <div className="line"></div>
                        </div>

                        {/* Name Input */}
                        <div>
                            <h2>Name</h2>
                            <input
                                value={playlistName}
                                placeholder="e.g. playlist 1"
                                onChange={playlistHandleChange}
                                className={showErrorMessages && !validityObj.name ? 'input is-invalid' : 'input'}
                            />
                            {showErrorMessages && !validityObj.name &&
                                <div className="invalid-feedback">Please enter a valid name for playlist</div>
                            }
                        </div>
                        

                        {/* Upload Image */}
                        <div>
                            <h2>Upload Playlist Cover:</h2>
                            <UploadImageForm onImageUpload={handleImageUpload} />
                        </div>
                        
                        
                        {/* Divider: Step 2 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p className="smallText">Step 2: What is this for?</p>
                            <div className="line"></div>
                        </div>

                        {/* Goal */}
                        <div>
                            <h2>Goal</h2>
                            <SelectBar
                                options={goalOptions}
                                handleSelect={goalHandleChange}
                                showErrorMessagesSelect={showErrorMessages && !validityObj.goal}
                            />
                            {showErrorMessages && !validityObj.goal &&
                                <div className="invalid-feedback">Please select a goal</div>
                            }
                        </div>

                        {/* Genre */}
                        <div>
                            <h2>Genre</h2>
                            <SelectBar
                                options={genreOptions}
                                handleSelect={genreHandleChange}
                                showErrorMessagesSelect={showErrorMessages && !validityObj.genre}
                            />
                            {showErrorMessages && !validityObj.genre &&
                                <div className="invalid-feedback">Please select a genre</div>
                            }
                        </div>

                        {/* Visibility */}
                        <div>
                            <h2>Visibility</h2>
                            <SelectBar
                                options={visibilityOptions}
                                handleSelect={visibilityHandleChange}
                                showErrorMessagesSelect={showErrorMessages && !validityObj.visibility}
                            />
                            {showErrorMessages && !validityObj.visibility &&
                                <div className="invalid-feedback">Please select visibility</div>
                            }
                        </div>

                        {/* Divider: Step 3 */}
                        <div className="line-container">
                            <div className="line"></div>
                                <p className="smallText">Step 3: Add Warmups to Your Playlist</p>
                            <div className="line"></div>
                        </div>
                        <button className="badge-pill mx-auto" type="submit">Create Playlist</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function SelectBar({options, handleSelect, showErrorMessagesSelect}) {
    const selectBar = options.map(option => (
        <option key={option} value={option}>{option}</option>
    ));

    return (
        <div> 
            <select 
                className={showErrorMessagesSelect ? 'select is-invalid' : 'select'}
                onChange={handleSelect}
            >
                <option value="">Select an option</option>
                {selectBar}
            </select>
        </div>
    );
}
