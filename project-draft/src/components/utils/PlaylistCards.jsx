// private helper
function PlaylistCard({ item }) {
    return (
        <div key={item.Id}>
            <img className="homepageCover" src={item.Img} alt={item.Name}/>
            <p className="albumName">Soprano Major Scales</p>
        </div>
    );
}

// Used by App.jsx
export function PlaylistCards({ data }) {
    return (
        <div className="grid-container">
            {data.map((item) => (
                <PlaylistCard item={item}/>
            ))}
        </div>
    );
}