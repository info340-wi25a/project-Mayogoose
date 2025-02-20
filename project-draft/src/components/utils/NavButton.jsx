// 6. button where text and hyperlink are variable, shared by everybody
// Owner: Amelia

export function Button({text, link}) {
    const handleClick = () => {
        window.location.href = link;
    }

    return (
        <div>
            <button onClick={handleClick} className="custom-button">
                {text}
            </button>
        </div>
    );
}