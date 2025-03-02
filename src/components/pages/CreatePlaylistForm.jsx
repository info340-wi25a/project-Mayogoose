// Owner: Ellie
// Functionalities:
    // Name your playlist (use #10 text input bar)
    // Tag your playlist (use #5 Tag bar)
    // Select Visibility (use #11 Select bar)
    // "Add Warm-ups" link to Runa's page (use #6 Button)

import { NavBar } from "../navigation/NavBar.jsx";
import { Footer } from '../navigation/Footer.jsx';
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState } from 'react';
import { NavButton } from "../utils/NavButton.jsx";

export function CreatePlaylistForm() {
    // Step 1: State for each input
    const [playlistName, setPlaylistName] = useState('');
    const [goal, setGoal] = useState('');
    const [genre, setGenre] = useState('');
    const [visibility, setVisibility] = useState('public');
    const navigate = useNavigate(); // Initialize navigate function


    const goalOptions = ['Improvisation', 'Performance / Audition','Vocal Health', 'Vocal Techniques']
    const genreOptions = ['general', 'Classical', 'Musical', 'Jazz', 'Pop', 'A Cappella'];
    const visibilityOptions = ['Public', 'Private', 'Unlisted'];


    // Step 2: Micro managing input and change states
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


    // Step 3: How I look like 
    // Validation logic (is the input red or green)
    let nameInputValid = true;

    if(playlistName.length <= 0) {
        nameInputValid = false;
    }

    // Callback for submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting form");
        console.log("playlistName: " + playlistName);
        console.log("goal: " + goal);
        console.log("genre: " + genre);
        console.log("visibility: " + visibility);
        navigate("/addWarmup");
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

                    <form onSubmit={handleSubmit} className="flex-containers">
                        {/* Upload Image */}
                        <h2>Upload Playlist Cover:</h2>
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

                        {/* Goal */}
                        <h2>Goal</h2>
                        <SelectBar
                            options={goalOptions}
                            handleSelect={goalHandleChange}
                        />

                        {/* Genre */}
                        <h2>Genre</h2>
                        <SelectBar
                            options={genreOptions}
                            handleSelect={genreHandleChange}
                        />

                        {/* Visibility */}
                        <h2>Visibility</h2>
                        <SelectBar
                            options={visibilityOptions}
                            handleSelect={visibilityHandleChange}
                        />
                        <button className="badge-pill" type="submit">Add Playlist</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreatePlaylistForm;

function SelectBar({options, handleSelect}) {
    // turn [string, string, string] into [<>, <>, <>]
    const selectBar = options.map(option => (
        <option key={option} value={option}>{option}</option>
    ));

    return (
        <div> 
            <select className="select" onChange={handleSelect}>
                {selectBar};  
            </select>
        </div>
    );
}
