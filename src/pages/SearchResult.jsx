import { useState, useEffect } from "react";
import AdvancedSearch from "../components/smart/AdvancedSearch"
import LayoutSearchProducts from '../components/smart/LayoutSearchedProducts'
import { useLocation, useNavigate } from "react-router-dom";


export default function SearchResult() {

    const [showFilters, setShowFilters] = useState(true);
    const VALID_QUERY = ['name', 'category', 'description', 'minPrice', 'maxPrice', 'promotion', 'attribute', 'page', 'limit', 'sales', 'date', 'price', 'searchOnly']; //da mettere nel .env

    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const keys = Array.from(searchParams.keys()); //crea un array con la lista dei parametri presi dall'url corrente

        // se non trova nessuna query
        if (keys.length === 0) {
            navigate("/search-result", { replace: true });
            return;
        }

        // se vengono inserite query non valide query non valide
        const hasInvalidQuery = keys.some(key => !VALID_QUERY.includes(key));
        if (hasInvalidQuery) {
            navigate("/", { replace: true }); // il replace true sovrascrive la cronologia del browser
        }

    }, [location.search, navigate]);


    return (
        <div>

            <div className="bg-custom-darker border-bottom">

                <button
                    className="btn btn-link text-center w-100 filter-text my-2"
                    onClick={() => setShowFilters((prev) => !prev)}
                    aria-expanded={showFilters}
                    aria-controls="filterCollapse"
                >
                    <span>
                        <i className={`bi ${showFilters ? "bi-x-lg" : "bi-funnel"}`}></i>
                    </span>{" "}
                    {showFilters ? "Chiudi" : "Filtri"}
                </button>

                <div className={`collapse${showFilters ? " show" : ""}`} id="filterCollapse">

                    <AdvancedSearch />

                </div>
            </div>

            <main className="container p-4">
                <h1>Risultati ricerca</h1>
                {/* Risultati della ricerca*/}
                <LayoutSearchProducts />
            </main>
        </div>
    );
}