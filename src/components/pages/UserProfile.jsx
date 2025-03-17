// Owner: Meiyao
// Display all warmups and playlists that user created
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { useNavigate } from 'react-router';

function UserProfile({userID, allPlaylists}) {
    const navigate = useNavigate();
    const userPlaylists = allPlaylists.filter((playlist) => {
        return playlist.ownerId == userID;
    })
    
    const playlistIsEmpty = userPlaylists && userPlaylists.length > 0;
    
    const handleCreatePlaylist = () => {
      navigate("/createPlaylist");
    };

    // show playlists that user uploaded
    const userPlaylistsList = playlistIsEmpty
    ? Object.values(userPlaylists).map((playlist) => (
        <PlaylistItem 
          // key={playlist.id}
          key={playlist.playlistId}
          id={playlist.playlistId}
          playlistObj={playlist} 
        />
      ))
    : (
      <div className="d-flex justify-content-center">
          <button className="badge-pill" onClick={handleCreatePlaylist}>
            Create Your Own Playlist
          </button>
      </div>
    );
    

    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card">
                    <div className="d-flex flex-column gap-3 mt-3">
                        <h1>Your Playlists</h1>
                        {playlistIsEmpty &&
                         <p className="smallText">See what playlists you've uploaded!</p>
                        }
                        {!playlistIsEmpty &&
                         <p className="smallText">You haven't created any playlists yet!</p>
                        }
                        {userPlaylistsList}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile;


function PlaylistItem({ id, playlistObj }) {
    const navigate = useNavigate();

    const name = playlistObj.playlistName;
    const img = playlistObj.coverImageUrl;
    const timeStamp = playlistObj.createdAt.slice(0, 7); // only include first 7 digits (e.g. 2025-03)
    // const warmupNum = playlistObj.warmups.length; // how many warmups are currently in this playlist

    console.log("key in playlistItem: " + id);

    // user click playlists they uploaded, navigate to corresponding PlaylistDetail page with props
    const handleClick = (value) => {
        console.log("clicked");
        // navigate(`/playlist/:`, key);
        navigate(`/playlist/${id}`);
        // in App.jsx, <Route path="/playlist/:playlistId" element={<PlaylistDetail selectedWarmups={selectedWarmups} clearPlaylist={clearPlaylist} />} />
    };

    return (
      <div className="warmup" onClick={handleClick}>
        <img src={img} alt={`Playlist/Warmup: ${name}`}  className="warmup-img" />
        <div className="warmup-info">
          <p className="title">{name}</p>
          <p className="timeStamp">{timeStamp}</p>
        </div>
      </div>
    );
  }
  