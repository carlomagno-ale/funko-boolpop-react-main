export default function AdvancedSearchUi({ searchDescription, searchCategory, searchMinPrice, searchMaxPrice, emptyQuery, searchPromo, onchange, onsubmit, categoryList, promoList, searchAttribute, sortValues, onchangeSort, attributeList }) {
    return (
        <>
            <div className="container">
                <div className=" mx-3 mt-2">

                    <form id="filtersForm" className="mb-3" onSubmit={(e) => { e.preventDefault(); onsubmit() }}>

                        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-8 justify-content-center ">
                            <div className="col my-2">
                                {/*prezzo*/}
                                <label className="text-white" htmlFor="">Prezzo Minimo</label>
                                <input
                                    type="number"
                                    name="minPrice"
                                    min="0"
                                    max="1000"
                                    className="form-control custom-input"
                                    placeholder="Min Price"
                                    value={searchMinPrice}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                />
                            </div>

                            <div className="col my-2 ">
                                {/*prezzo*/}
                                <label className="text-white" htmlFor="">Prezzo Massimo</label>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    min="0"
                                    max="1000"
                                    className="form-control custom-input"
                                    placeholder="Max Price"
                                    value={searchMaxPrice}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                />
                            </div>


                            {/* filtro categoria  */}
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Cerca per cateogria</label>
                                <select
                                    value={searchCategory}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="category"
                                    id=""
                                >
                                    <option value='' selected>Seleziona un cateogria</option>

                                    {categoryList.map(item => (
                                        <>
                                            <option value={item.name}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            {/* filtro promozioni */}
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Cerca per promozione</label>
                                <select
                                    value={searchPromo}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="promotion"

                                >
                                    <option value='' selected>Seleziona un promozione</option>

                                    {promoList.map(item => (
                                        <>
                                            <option value={item.name}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>


                            {/* filtro attributi */}
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Cerca per attributo</label>
                                <select
                                    value={searchAttribute}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="attribute"

                                >
                                    <option value='' selected>Seleziona un Attributo</option>

                                    {attributeList.map(item => (
                                        <>
                                            <option value={item.name}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>


                            {/* filtro ordinamento */}
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Ordina per</label>
                                <select
                                    value={sortValues}
                                    onChange={(e) => onchangeSort(e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="promotion"

                                >
                                    <option value='' selected>Scegli un opzione</option>


                                    <option value="price=1">Prezzo crescente</option>
                                    <option value="price=-1">Prezzo discendente</option>
                                    <option value="date=1">Ultimi arrivi</option>
                                    <option value="date=-1">Piu vecchi</option>
                                    <option value="sales=1">Piu venduti</option>
                                    <option value="sales=-1">Meno venduti</option>

                                </select>
                            </div>

                            {/* filtro descrizione  */}
                            <div className="col my-2">
                                <label className="text-white" htmlFor="">Cerca per Parole chiave</label>
                                <input
                                    value={searchDescription}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    type="text"
                                    className="form-control custom-input "
                                    name="description"
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder="Cerca per parole chiave"
                                />
                            </div>
                        </div>
                        <div className="d-flex align-item-center justify-content-center w-100 gap-4 mt-2 mb-2">
                            <button
                                type="submit"
                                className="btn btn-warning px-3"
                            >
                                Applica
                            </button>
                            <button type="button" className="btn btn-warning px-3" onClick={() => emptyQuery()}>
                                Resetta Filtri
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}