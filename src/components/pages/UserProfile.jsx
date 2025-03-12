// Owner: Meiyao
// Display all warmups and playlists that user created
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { useNavigate } from 'react-router';

function UserProfile({currUser, allPlaylists}) {

    const userPlaylists = allPlaylists.filter((playlist) => {
        return playlist.ownerId == currUser.uid;
    })

    // show "you haven't created any warmup/playlist yet" & add buttons if this user has no playlist in firebase
    // show playlists that user uploaded
    const userPlaylistsList = userPlaylists 
    ? Object.values(userPlaylists).map((playlist) => (
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
                        {userPlaylistsList}
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
  