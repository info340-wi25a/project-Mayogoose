// 2
// Ellie's new-playlist.html
// Functionalities:
    // Name your playlist (use #10 text input bar)
    // Tag your playlist (use #5 Tag bar)
    // Select Visibility (use #11 Select bar)
    // "Add Warm-ups" link to Runa's page (use #6 Button)

import { NavBar } from "../navigation/NavBar.jsx"; // Ellie
import { CreateFrom } from "../utils/CreateForm.jsx"; // Meiyao

export function CreatePlayListForm(props) {
    const [playlistName, setPlaylistName] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibility, setVisibility] = useState('public');

  // 预设的标签选项
  const tagOptions = ['Happy', 'Quick warmup', 'Instrumental'];

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-center text-3xl font-bold mb-8">Name your playlist</h1>
        
        {/* Playlist Cover */}
        <div className="flex justify-center mb-8">
          <img 
            src="../project-draft/img/favicon.svg" 
            alt="Playlist Cover" 
            className="w-64 h-64 rounded-lg"
          />
        </div>

        {/* Playlist Name Input - Component #10 */}
        <div className="mb-8">
          <InputBar 
            value={playlistName}
            onChange={setPlaylistName}
            placeholder="My Playlist #1"
          />
        </div>

        {/* Tags - Component #5 */}
        <div className="mb-8">
          <TagBar 
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            availableTags={tagOptions}
          />
        </div>

        {/* Visibility Select - Component #11 */}
        <div className="mb-8">
          <SelectBar
            value={visibility}
            onChange={setVisibility}
            options={[
              { value: 'public', label: 'Public' },
              { value: 'private', label: 'Private' },
              { value: 'unlisted', label: 'Unlisted' }
            ]}
          />
        </div>

        {/* Create Button - Component #6 */}
        <div className="flex justify-center">
          <Button 
            text="Create" 
            link="/add-warmup"
          />
        </div>
      </main>
    </div>
  );
}