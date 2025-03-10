import { Link } from 'react-router';

// private helper
function PlaylistCard({ item }) {
    return (
        <div key={item.Id} className="playlist">
            <Link to={`/playlist/${item.playlistId}`}>
                <img className="homepageCover" src={item.Img} alt={item.alt}/>
            </Link>
            <div>
                <h2 className="center">{item.Name}</h2>
            </div>
        </div>
    );
}

// Used by App.jsx
export function PlaylistCards({ albumsData }) {

    const playlists = albumsData.map((item) => (
        <PlaylistCard key={item.playlistId} item={item}/>
    ));

    return (
        <div className="grid-container">
            {playlists}
        </div>
    );
}