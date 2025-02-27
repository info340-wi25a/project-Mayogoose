// 6. button where text and hyperlink are variable, shared by everybody
// Owner: Amelia

import { useNavigate } from "react-router-dom";

export function NavButton({text, destination}) {
    const navigate = useNavigate();

    return (
        <span onClick={() => navigate(destination)} className="badge-pill">
            {text}
        </span>
    );
}