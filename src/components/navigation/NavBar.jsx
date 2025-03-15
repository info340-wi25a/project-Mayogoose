// #1 Nav bar on the top, shared by everyone
// Logo on the left will link back to the home page
// Profile link profile.jsx
// Owner: Ellie
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import '../../../src/index.css';

export const NavBar = ({ userObj, auth, firebaseUIConfig }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const handleProfileClick = () => {
    if (userObj) {
      navigate('/profile');
    } else {
      setShowModal(true);
    }
  };


  return (
    <nav >
      <Link to="/" className="nav-logo">
        <img 
          src="../img/logo.svg" 
          alt="Homepage" 
        />
      </Link>
      <div className="profile">
        <img 
          src="../img/profile.png" 
          alt="Profile" 
          onClick={handleProfileClick} 
        />
      </div>

      <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        {!userObj
                        && <Modal.Title className="text-dark">Log in to VoxTune</Modal.Title>
                        }
                        {userObj
                        && <Modal.Title className="text-dark">You're In!</Modal.Title>}
                     </Modal.Header>
                    <Modal.Body className="text-dark">
                        <div>
                            {!userObj
                            &&  <div>
                                    <p className="m-3 text-center">Unlock features such as uploading your own vocal warmups and creating custom playlists!  </p>
                                    <StyledFirebaseAuth firebaseAuth={auth} uiConfig={firebaseUIConfig} />
                                </div>
                            }
                            {userObj
                            && <p>Start exploring and make VoxTune truly yours!</p>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
            </Modal>
    </nav>
  );
};
