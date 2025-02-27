// Owner: Meiyao
// Display all warmups and playlists that user created
import { NavBar } from '../navigation/NavBar.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
// Data
import albumsData from "../../data/playlist.json";
import warmupData from '../../data/warmup.json'; // Add warmup data

function UserProfile(props) {

    // const warmupsList = warmupData.map(warmup => ({
    //     id: warmup.warmupId, 
    //     name: warmup.warmupName,
    //     image: warmup.img
    // })); 

    // const warmupsElements = warmupsList.map(warmup => (
    //     <WarmupItem
    //         key={warmup.id}
    //         warmup={warmup.name}
    //         image={warmup.image}
    //     />
    // )); 

    

    return (
        <div>
            <NavBar />
            <div>
                <div className="card">
                    <h1>Your Warmups</h1>
                </div>

                <div className="card">
                    <h1>Your Playlists</h1>
                </div>

            </div>
        </div>
    )
}

export default UserProfile;