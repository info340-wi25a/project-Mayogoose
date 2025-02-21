// Amelia's index.html, main.jsx first render this page
import React from 'react';

// // Import other pages
// import { upload } from "./Upload.jsx"; // meiyao: upload individual warmup
// import { NewPlaylist } from "./NewPlaylist.jsx"; // ellie: upload playlist

// // Import Components (1, 2, 3, 4, 8, 9)
// import { NavBar } from "./navigation/NavBar.jsx";

import { Button } from "../utils/NavButton.jsx";

import data from '../../data/data.json'

function App(props) {
    return (
        <div>
            <div>
                <p>button test:</p>
                <Button text="A button" />
            </div>
            <br></br>
            <div>
                <p>filter bar test:</p>

            </div>
            <br></br>
            <div>
                <p>homepage content:</p>
            </div>
            <div>
                <div className="grid-container">
                    {data.map((item) => (
                    <div key={item.Id}>
                        <img className="homepageCover" src={item.Img} alt={item.Name}/>
                        {/* <h1>{item.Name}</h1> */}
                        <p className="albumName">Soprano Major Scales</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
  
export default App;