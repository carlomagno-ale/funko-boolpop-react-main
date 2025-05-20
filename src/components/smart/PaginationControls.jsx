import { useFiltersContext } from "../../contexts/filtersContext";
import Loader from "../dumb/Loader.ui";

export default function PaginationControls() {

    const { handlePage, handleLimit, products, page, limit } = useFiltersContext()


    switch (products.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{products.state}</h1>
                    <p>{products.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <div>
                            <label for="" className="form-label">Seleziona numero di porodotti</label>

                            <select
                                className="form-select form-select-sm w-100"
                                value={limit || ''}
                                name=""
                                id=""
                                onChange={(e) => handleLimit(Number(e.target.value))}
                            >
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>

                        <div>
                            <span className="mx-4">Seleziona Pagina</span>
                            {Array.from({ length: products.data.totalPages }).map((_, i) => (
                                <button
                                    className={`btn ${page === i + 1 ? 'btn-outline-primary' : 'btn-transparent'}`}
                                    key={i}
                                    onClick={() => handlePage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <span className="sm-font">
                                Pagina: {products.data.currentPage} / {products.data.totalPages}
                            </span>
                        </div>
                    </div>
                </>
            )
    }
}