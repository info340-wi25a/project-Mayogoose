// 6. button where text and hyperlink are variable, shared by everybody
// Owner: Amelia

import { Link } from 'react-router';

export function NavButton({text, destination}) {
    return (
        <Link to={destination} className="badge-pill">
            {text}
        </Link>
    );
}