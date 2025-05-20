export default function LayoutSelect({ setLayout, layout }) {
    return (
        <>
            <div className="container">
                <div className="layout-buttons">
                    <button
                        onClick={() => setLayout("grid")}
                        className={`btn btn-grid ${layout === "grid" ? "active" : ""}`}
                    >
                        <i class="fa-solid fa-border-all"></i>
                    </button>
                    <button
                        onClick={() => setLayout("list")}
                        className={`btn btn-list ${layout === "list" ? "active" : ""}`}
                    >
                        <i class="fa-solid fa-list"></i>
                    </button>
                </div>
            </div>
        </>
    )
}