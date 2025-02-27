import { Link } from 'react-router';

// private helper
function PlaylistCard({ item }) {
    return (
        <div key={item.Id}>
            <Link to={`/playlist/${item.playlistId}`}>
            {/* <Link to={`/PlaylistDetails`}> */}
                <img className="homepageCover" src={item.Img} alt={item.Name}/>
            </Link>
            <p className="albumName">{item.Name}</p>
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