// #2 search bar
// owner: amelia

export function SearchBar({ setQuery }) {
    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);
    }
    
    return (
        <div className="searchContainer">
            <input type="text" className="searchBar" onChange={handleChange} placeholder="Search for something here..."/>
        </div>
    );
}