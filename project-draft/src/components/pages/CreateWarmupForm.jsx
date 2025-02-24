// Meiyao's upload.html from draft 1

// import { NavBar } from "../navigation/NavBar.jsx";  Ellie
// import { CreateFrom } from "../utils/CreateForm.jsx"; Meiyao

function CreateWarmupForm(props) {
    return (
        <div class="card">
            <div class="instructions">
                    <h2>Media Upload</h2>
                    <p>Add your warm-up exercise here!</p>
            </div>

            <div>
                <h2>Upload from Local Device:</h2>
                <div class="upload-box">
                    <span class="material-symbols-outlined">
                        upload_file
                    </span>
                    <p> Max 10 MB files are allowed, each file 2 minutes max. Only supports .mp3</p>
                    <VisibilityBar />
                </div>
            </div>
        </div>
    );
}

export default CreateWarmupForm;



{/* <main>

            <div class="card">
                <div class="instructions">
                    <h2>Media Upload</h2>
                    <p>Add your warm-up exercise here!</p>
                </div>

                    
                <!-- Upload from URL links -->
                <div class="input-box">
                    <label for="linkInput" class="form-label"> Upload from URL / YouTube:</label>
                    <input type="link" class="form-control" id="linkInput" placeholder="Enter a link to upload a vocal warm-up, http://...">
                </div>

                <!-- OR divider -->
                <div class="line-container">
                    <div class="line"></div>
                        <p>OR</p>
                    <div class="line"></div>
                </div>

                <!-- Upload from voice recording -->
                <div class="record-box"> 
                    <h2>Record a New Vocal Warm-up!</h2>
                    <img src="../img/microphone-icon.svg" alt="Microphone" onClick="">
                    <p class="press-text">Press to Record</p>
                    <p class="click-text">Click to Record</p>
                </div>

                <!--  bottom nav -->
                <div class="bottom-nav">
                    <a href="#" class="nav-item">
                        <img src="../img/home.png" alt="Home Icon">
                        <span>Home</span>
                    </a>
                    <a href="#" class="nav-item create-button" data-bs-toggle="modal" data-bs-target="#createModal">
                        + Create
                    </a>
                    <a href="#" class="nav-item">
                        <img src="../img/library.png" alt="Library Icon">
                        <span>Your Library</span>
                    </a>
                </div>
            </div>
        </main> */}