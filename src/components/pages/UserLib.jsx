// Owner: Meiyao
// Display all warmups and playlists that user created
import { NavBar } from '../navigation/NavBar.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { UploadedItem } from "../utils/UploadedItem.jsx";

// Data
import albumsData from "../../data/playlist.json";
import warmupData from '../../data/warmup.json'; // Add warmup data

function UserProfile(props) {

    const warmupsList = warmupData.map(warmup => ({
        id: warmup.warmupId, 
        name: warmup.warmupName,
        image: warmup.img
    })); 

    return (
        <div>
            <NavBar />
            <div className="grid-container">
                <div className="card">
                    <h1>Your Warmups</h1>
                    <div className="warmups-list">
                        {warmupsList.map((warmup) => (
                        <UploadedItem
                          key={warmup.id}
                          warmup={warmup}
                        />
                    ))}
                    </div>
                </div>

                <div className="card">
                    <h1>Your Playlists</h1>
                    <div className="playlists-list">
                        {albumsData.map((warmup) => (
                            <UploadedItem
                              key={warmup.id}
                              warmup={warmup}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile;