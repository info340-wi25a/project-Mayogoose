// 6. button where text and hyperlink are variable, shared by everybody
// Owner: Amelia

export function Button({text}) {
    return (
        <span className="badge-pill">
            {text}
        </span>
    );
}