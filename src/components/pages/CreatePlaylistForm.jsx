// Ellie's new-playlist.html
// Functionalities:
    // Name your playlist (use #10 text input bar)
    // Tag your playlist (use #5 Tag bar)
    // Select Visibility (use #11 Select bar)
    // "Add Warm-ups" link to Runa's page (use #6 Button)

import { NavBar } from "../navigation/NavBar.jsx";
import { Footer } from '../navigation/Footer.jsx';
import { SelectBar } from "../utils/SelectBar.jsx";
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import React from 'react';
import { useState } from 'react';
import { NavButton } from "../utils/NavButton.jsx";

export function CreatePlaylistForm() {
    // Step 1: State for each input
    const [playlistName, setPlaylistName] = useState('');

    const [goal, setGoal] = useState('');
    const [genre, setGenre] = useState('');
    const [visibility, setVisibility] = useState('public');

    const goalOptions = ['Improvisation', 'Performance / Audition',
                        'Vocal Health', 'Vocal Techniques']
    const genreOptions = ['general', 'Classical', 'Musical', 'Jazz', 'Pop', 'A Cappella'];
    const visibilityOptions = ['Public', 'Private', 'Unlisted'];


    // Step 2: Micro managing input and change states
    const playlistHandleChange = (event) => {
        const value = event.target.value;
        console.log("user typed name: " + value);
        setNameInput(value);
    };


    // Step 3: How I look like 
    // Validation logic (is the input red or green)
    let nameInputValid = true;

    if(playlistName.length <= 0) {
        nameInputValid = false;
    }

    // Callback for submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting form")
    }


    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card">
                    <div className="instructions">
                        <h1>New Playlist</h1>
                        <p>Create your playlist here!</p>
                    </div>

                    <div>
                        {/* Upload Image */}
                        <h2>Upload Image:</h2>
                        <UploadImageForm />
                        
                        {/* Name Input */}
                        <h2>Name</h2>
                        <div className="d-flex flex-column">
                            <input
                                value={playlistName}
                                placeholder="e.g. playlist 1"
                                onChange={playlistHandleChange}
                                className="input"
                            />
                            {/* conditional rendering for invalid input*/}
                            {!nameInputValid
                            && <div className="invalid-feedback">Please enter a valid name for playlist</div>
                            }
                        </div>

                        {/* Genre */}
                        <h2>Genre</h2>
                        <SelectBar
                            value={genre}
                            onChange={setGenre}
                            props={genreOptions}
                        />

                        {/* Visibility */}
                        <h2>Visibility</h2>
                        <SelectBar
                            value={visibility}
                            onChange={setVisibility}
                            props={visibilityOptions}
                        />
                    </div>

                    <NavButton text={"Add Warmups"} destination={"/addWarmup"}/> 
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreatePlaylistForm;