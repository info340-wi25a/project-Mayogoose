// Owner: amelia
// On app.jsx, pass in "create playlist" and "create warmup"
// On AddWarmupFrom, pass in only "create warmup"
// Looks like a + button that opens a dropdown menu with "New Warm-up" and "New Playlist" options

import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export function SelectButton({ userObj, elements, auth, firebaseUIConfig}) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const handleSelect = (event) => {
        const value = event.target.value;

        if (!userObj) {
            setShowModal(true);
        }
        else {
            if (value === "warmup") {
                navigate("/createWarmup");
            } else if (value === "playlist") {
                navigate("/createPlaylist");
            }
        }
        event.target.value = "";
        
    };

    return (
        <div className="selectWrap">
            <select className="selectButton" onChange={handleSelect} defaultValue="">
                <option value="" disabled>+</option>
                <option value="warmup">New Warm-up</option>
                {elements === "2" && <option value="playlist">New Playlist</option>}
            </select>

            <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-dark">You're not logged in yet.</Modal.Title>
                     </Modal.Header>
                    <Modal.Body className="text-dark">
                        <div>
                            <StyledFirebaseAuth firebaseAuth={auth} uiConfig={firebaseUIConfig} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
            </Modal>                        
        </div>
    );
}