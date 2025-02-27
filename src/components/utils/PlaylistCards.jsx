// private helper
function PlaylistCard({ item }) {
    return (
        <div key={item.Id}>
            <img className="homepageCover" src={item.Img} alt={item.Name}/>
            <p className="albumName">{item.Name}</p>
        </div>
    );
}

// Used by App.jsx
export function PlaylistCards({ albumsData }) {
    return (
        <div className="grid-container">
            {albumsData.map((item) => (
                <PlaylistCard key={item.Id} item={item}/>
            ))}
        </div>
    );
}