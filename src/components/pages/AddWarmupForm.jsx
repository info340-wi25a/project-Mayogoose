// Owner: Runa
// functionalities:
    // search for warmups
    // add individual warmups to the new playlist
    import React, { useState, useEffect } from 'react';
    import { useNavigate, useLocation } from 'react-router';
    import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
    import { Footer } from "../navigation/Footer.jsx"; // Footer
    import { AddWarmupItem } from "../utils/AddWarmupItem.jsx"; // Component 9
    import { getDatabase, ref, update, onValue } from "firebase/database";

    function AddWarmupForm({ userObj, auth, firebaseUIConfig }) {
    const navigate = useNavigate();
    const location = useLocation();
    const playlistId = location.state && location.state.playlistId; 
    const [selectedWarmups, setSelectedWarmups] = useState([]);
    const [warmupData, setWarmupData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const warmupRef = ref(db, `warmup`);

        onValue(warmupRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const warmupsArray = Object.keys(data).map(id => ({
                    warmupId: id,
                    warmupName: data[id].warmupName,  
                    img: data[id].img,              
                }));
                setWarmupData(warmupsArray);
                }
            setLoading(false);
        });

        // get the current playlist warmups
        if (playlistId) {
            const playlistWarmupRef = ref(db, `playlists/${playlistId}/warmups`);
            onValue(playlistWarmupRef, (snapshot) => {
                const warmups = snapshot.val();
                if (warmups) {
                    const warmupArray = Object.keys(warmups).map(key => ({
                        warmupId: key,
                        warmupName: warmups[key].warmupName,  
                        img: warmups[key].img,               
                    }));
                    setSelectedWarmups(warmupArray);
                }
            });
        }
    }, [playlistId]);

    const isWarmupSelected = (warmupId) => {
        return selectedWarmups.some(w => w.warmupId === warmupId);
    };

    const handleToggleWarmup = (warmup) => {
        setSelectedWarmups(prev => {
            if (isWarmupSelected(warmup.warmupId)) {
                return prev.filter(w => w.warmupId !== warmup.warmupId); 
            } else {
                return [...prev, {
                warmupId: warmup.warmupId,
                warmupName: warmup.warmupName,
                img: warmup.img,
                technique: warmup.technique,
                difficulty: warmup.difficulty,
                voiceRegister: warmup.voiceRegister,
                voiceType: warmup.voiceType
            }]; 
            }
        });
    };

    const handleCreateWarmup = () => {
        navigate("/createWarmup");
    };
    

    const handleSaveWarmups = () => {
        if (!playlistId) {
            alert("Error: No playlist ID provided!");
            return;
        }
        const db = getDatabase();
        const playlistWarmupRef = ref(db, `playlists/${playlistId}`);

        const warmupsObject = {};
        selectedWarmups.forEach(warmup => {
            warmupsObject[warmup.warmupId] = {
                warmupName: warmup.warmupName,
                img: warmup.img,
                technique: warmup.technique || "",
                difficulty: warmup.difficulty || "",
                voiceRegister: warmup.voiceRegister || "",
                voiceType: warmup.voiceType || ""
            };
        });

    // Perform the update the playlist warmup
    update(playlistWarmupRef, { warmups: warmupsObject })
        .then(() => {
            navigate(`/playlist/${playlistId}`);
        })
        .catch(error => {
            console.log("Got error:", error);
        });
    }

    const suggestedWarmups = warmupData.filter(warmup => !isWarmupSelected(warmup.warmupId));

    let selectedWarmupsList = selectedWarmups.map(warmup => (
        <AddWarmupItem
            key={warmup.warmupId}
            warmup={warmup}
            onAdd={() => handleToggleWarmup(warmup)}
            onRemove={() => handleToggleWarmup(warmup)}
            isSelected={true}
        />
    ));

    let suggestedWarmupsList = suggestedWarmups.map(warmup => (
        <AddWarmupItem
            key={warmup.warmupId}
            warmup={warmup}
            onAdd={() => handleToggleWarmup(warmup)}
            onRemove={() => handleToggleWarmup(warmup)}
            isSelected={false}
        />
    ));

    return (
        <div className="add-warmup-container">
            <NavBar userObj={userObj} auth={auth} firebaseUIConfig={firebaseUIConfig}/>
            <main>
                <h1>Add Warm-ups</h1> 

                {loading ? <p>Loading warm-ups...</p> : (
                    <div className="warmups-container">
                        <div className="warmups-column">
                            <h2>Selected Warm-ups ({selectedWarmups.length})</h2>
                            <div className="warmups-list">
                                {selectedWarmups.length === 0 && <p>No warm-ups selected.</p>}
                                {selectedWarmupsList}
                            </div>
                        </div>
                        <div className="warmups-column">
                            <h2>Suggested Warm-ups ({suggestedWarmups.length})</h2>
                            <div className="warmups-list">
                                {suggestedWarmups.length === 0 && <p>No warm-ups available.</p>}
                                {suggestedWarmupsList}
                            </div>
                        </div>
                    </div>
                )}

                <div className="button-container">
                    <button className="create-warmup-button" onClick={handleCreateWarmup}>
                        Create Your Own Warm-up
                    </button>
                    <button className="create-button" onClick={handleSaveWarmups}>
                        Save Warm-ups
                    </button>
                </div>
                
                <Footer />
            </main>
        </div>
    );
}

export default AddWarmupForm;