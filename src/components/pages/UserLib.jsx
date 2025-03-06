// Owner: Meiyao
// Display all warmups and playlists that user created
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { UploadedItem } from "../utils/UploadedItem.jsx";
import { useNavigate } from 'react-router';

// Data
import albumsData from "../../data/playlist.json";

function UserProfile(props) {
    const navigate = useNavigate();
    // user click playlists they uploaded, navigate to corresponding PlaylistDetail page with props
    const handleClick = (value) => {
        console.log("clicked");
        navigate(`/playlist/`);
        // in App.jsx, <Route path="/playlist/:playlistId" element={<PlaylistDetail selectedWarmups={selectedWarmups} clearPlaylist={clearPlaylist} />} />

    };

    const playlistList = albumsData.map((warmup) => (
        <UploadedItem
          key={warmup.id} // do firebase automatically generate id?
          warmup={warmup}
          onClick={handleClick}
        />
    ));

    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card">
                    <h1>Your Playlists</h1>
                    <div className="d-flex flex-column gap-3 mt-3">
                        {playlistList}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile;