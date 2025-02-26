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
import { InputBar } from "../utils/InputBar.jsx";

export function CreatePlaylistForm() {
    const [playlistName, setPlaylistName] = useState('');
    const [voiceType, setVoiceType] = useState('');
    const [voiceRegister, setVoiceRegister] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [style, setStyle] = useState('');
    const [visibility, setVisibility] = useState('public');

    const voiceTypeOptions = ['Soprano', 'Alto', 'Base', 'Tenor'];
    const voiceRegisterOptions = ['Chest Voice', 'Head Voice', 'Mixed', 'Vocal Fry'];
    const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
    const styleOptions = ['Classical', 'Musical', 'Jazz', 'Pop', 'A Cappella'];
    const visibilityOptions = ['Public', 'Private'];

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
                        {/* Divider: Step 1 */}
                        <div className="line-container">
                            <div className="line"></div>
                            <p>Step 1</p>
                            <div className="line"></div>
                        </div>

                        {/* Upload Image */}
                        <h2>Upload Image:</h2>
                        <UploadImageForm />

                        {/* Name Input */}
                        <h2>Name</h2>
                        <div className="d-flex flex-column">
                            <InputBar 
                                value={playlistName}
                                onChange={setPlaylistName}
                                placeholder="e.g. playlist 1"
                            />
                        </div>

                        {/* Voice Type */}
                        <h2>Voice Type</h2>
                        <SelectBar
                            value={voiceType}
                            onChange={setVoiceType}
                            props={voiceTypeOptions}
                        />

                        {/* Voice Register */}
                        <h2>Voice Register</h2>
                        <SelectBar
                            value={voiceRegister}
                            onChange={setVoiceRegister}
                            props={voiceRegisterOptions}
                        />

                        {/* Difficulty Level */}
                        <h2>Difficulty Level</h2>
                        <SelectBar
                            value={difficulty}
                            onChange={setDifficulty}
                            props={difficultyOptions}
                        />

                        {/* Style */}
                        <h2>Style</h2>
                        <SelectBar
                            value={style}
                            onChange={setStyle}
                            props={styleOptions}
                        />

                        {/* Visibility */}
                        <h2>Visibility</h2>
                        <SelectBar
                            value={visibility}
                            onChange={setVisibility}
                            props={visibilityOptions}
                        />
                    </div>

                    <NavButton text={"Create New Playlist"} destination={"/addWarmup"}/> 
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreatePlaylistForm;