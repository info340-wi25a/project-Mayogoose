import { Link } from 'react-router';

// private helper
function PlaylistCard({ item }) {
    return (
        <div key={item.Id} className="playlist">
            <Link to={`/playlist/${item.playlistId}`}>
                <img className="homepageCover" src={item.Img} alt={item.Name}/>
            </Link>
            <div>
                <p className="albumName">{item.Name}</p>
            </div>
        </div>
    );
}

// Used by App.jsx
export function PlaylistCards({ albumsData }) {
    return (
        <div className="grid-container">
            {albumsData.map((item) => (
                <PlaylistCard key={item.playlistId} item={item}/>
            ))}
        </div>
    );
}