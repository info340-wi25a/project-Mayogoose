// Owner: Meiyao
// Display all warmups and playlists that user created
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
// import { getDatabase, ref, onValue } from "firebase/database";
// import { onAuthStateChanged } from 'firebase/auth';


function UserProfile(props) {
    const [playlistObj, setPlaylistObj] = useState(null);
    const [userObj, setUserObj] = useState(false);
    const auth = getAuth();

    // when database change, update playlist & user auth in real-time
    useEffect(() => {
        const db = getDatabase(); // get a reference to the database
        const playlistsRef = ref(db, 'playlists'); // a link to firebase's playlist node

        // listen for user auth
        onAuthStateChanged(auth, (firebaseUser) => {
            console.log("login status changed")
            console.log(firebaseUser)

            if(firebaseUser) {
                // ask joel ross about this restructure:
                // firebaseUser.playlists: find all playlists that has the user displayName in their "author" field
                // when user add warmup/playlist, it should automatically have their displayName as "author"
                // but that requires 
                setUserObj(firebaseUser);
            }
        })



        // listen for playlist data change
        onValue(playlistsRef, (snapshot) => {
            console.log("playlists change in firebase:");
            const dataObj = snapshot.val();
            setPlaylistObj(dataObj);
            console.log("playlist object: ", dataObj);
        });
    }, []);
    
    //object of configuration values for firebase auth
    const firebaseUIConfig = {
        signInOptions: [ 
            GoogleAuthProvider.PROVIDER_ID,
        { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true }, ],
        signInFlow: 'popup', //don't redirect to authenticate
        credentialHelper: 'none', //don't show the email account chooser
        callbacks: {
            signInSuccessWithAuthResult: () => {
                return false; //don't redirect after authentication
            }
        }
    }

    // show "you haven't created any warmup/playlist yet" & add buttons if this user has no playlist in firebase
    // show playlists that user uploaded
    const playlistList = playlistObj 
    ? Object.values(playlistObj).map((playlist) => (
        <PlaylistItem playlistObj={playlist} />
      ))
    : <p>Loading playlists...</p>;

    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card">
                    <div className="d-flex flex-column gap-3 mt-3">
                        <h1>Your Playlists</h1>
                        <p className="smallText">See what warmups / playlists you've uploaded!</p>
                        {/* Conditionally render based on user's auth status*/}
                        {!userObj // user doesn't exist 
                        &&
                        <div>
                            <p className="smallText">You haven't signed in!</p>
                            <StyledFirebaseAuth firebaseAuth={auth} uiConfig={firebaseUIConfig} />
                        </div>
                        }
                        {userObj // user exist
                        && playlistList}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile;


function PlaylistItem({ playlistObj, key }) {
    const navigate = useNavigate();

    const name = playlistObj.playlistName;
    const img = "../img/profile.png"; // waiting for ellie
    const timeStamp = playlistObj.createdAt.slice(0, 7); // only include first 7 digits (e.g. 2025-03)
    // const warmupNum = playlistObj.warmups.length; // how many warmups are currently in this playlist

    console.log("key in playlistItem: " + key);

    // user click playlists they uploaded, navigate to corresponding PlaylistDetail page with props
    const handleClick = (value) => {
        console.log("clicked");
        navigate(`/playlist/:`, key);
        // in App.jsx, <Route path="/playlist/:playlistId" element={<PlaylistDetail selectedWarmups={selectedWarmups} clearPlaylist={clearPlaylist} />} />
    };

  
    return (
      <div className="warmup" onClick={handleClick}>
        <img src={img} alt={name} className="warmup-img" />
        <div className="warmup-info">
          <p className="title">{name}</p>
          <p className="timeStamp">{timeStamp}</p>
        </div>
      </div>
    );
  }
  