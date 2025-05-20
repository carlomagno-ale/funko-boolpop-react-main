import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const FiltersContext = createContext()

function FiltersProvider({ children }) {

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)



    //parametri iniziali query
    const name = queryParams.get('name') || ''
    // const initialLimit = Number(queryParams.get('limit')) || 8;
    // const initialPage = Number(queryParams.get('page')) || 1;


    //stati
    const [products, setProducts] = useState({
        state: "loading",
    });
    const [searchOnly, setSearchOnly] = useState(true);
    const [limit, setLimit] = useState(Number(queryParams.get('limit')) || 8)
    const [page, setPage] = useState(Number(queryParams.get('page')) || 1)

    const [searchText, setSearchText] = useState({
        name: name,
        category: '',
        description: '',
        minPrice: 0,
        maxPrice: 1000,
        promotion: '',
        attribute: '',
        sortBydate: 0,
        sortBySales: 0
    });

    const [sortValues, setSortValues] = useState('')


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const limitFromUrl = Number(queryParams.get('limit')) || 8;
        const pageFromUrl = Number(queryParams.get('page')) || 1;

        setLimit(limitFromUrl);
        setPage(pageFromUrl);

        const finalUrl = `http://localhost:3000/api/v1/funkoboolpop${location.search}&searchOnly=${searchOnly}`

        fetch(finalUrl)
            .then((res) => res.json())
            .then((data) => {
                if (data.totalResults == 0) {
                    setProducts({
                        state: "empty",
                        data: data,
                    });
                } else {
                    setProducts({
                        state: "success",
                        data: data,
                    });
                }
            })
            .catch((err) => {
                setProducts({
                    state: "error",
                    message: err.message,
                });
            });
    }, [location.search, limit, page]);


    //funzioni per i filtri di ricerca
    function handleChangeFilters(key, value) {
        setSearchText({
            ...searchText,
            [key]: value
        })

    }

    function handleChangeSort(value) {
        //fare controlli se value e diverso da 1 o da -1
        setSortValues(value)
    }

    function handleLimit(newLimit) {
        const queryParams = new URLSearchParams(location.search)
        queryParams.set('limit', newLimit)
        queryParams.set('page', 1) // reset page

        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true })
        setLimit(newLimit)
        setPage(1)
    }

    function handlePage(newPage) {
        const queryParams = new URLSearchParams(location.search)
        queryParams.set('page', newPage)
        queryParams.set('limit', limit || 8) // fallback

        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true })
        setPage(newPage)
    }

    function handleSubmit() {
        const queryParts = []
        queryParts.push(`limit=${encodeURIComponent(queryParams.get('limit'))}`)
        queryParts.push(`page=${encodeURIComponent(queryParams.get('page'))}`)
        if (searchText.name != '') queryParts.push(`name=${encodeURIComponent(searchText.name)}`);
        if (searchText.description != '') queryParts.push(`description=${encodeURIComponent(searchText.description)}`);
        if (searchText.category != '') queryParts.push(`category=${encodeURIComponent(searchText.category)}`);
        if (searchText.attribute != '') queryParts.push(`attribute=${encodeURIComponent(searchText.attribute)}`);
        if (searchText.minPrice) queryParts.push(`minPrice=${encodeURIComponent(searchText.minPrice)}`);
        if (searchText.maxPrice) queryParts.push(`maxPrice=${encodeURIComponent(searchText.maxPrice)}`);
        if (searchText.promotion != '') queryParts.push(`promotion=${encodeURIComponent(searchText.promotion)}`);
        if (sortValues == 'sales=-1') queryParts.push(`sales=${encodeURIComponent('-1')}`);
        if (sortValues == 'sales=1') queryParts.push(`sales=${encodeURIComponent('1')}`);
        if (sortValues == 'date=-1') queryParts.push(`date=${encodeURIComponent('-1')}`);
        if (sortValues == 'date=1') queryParts.push(`date=${encodeURIComponent('1')}`);
        if (sortValues == 'price=-1') queryParts.push(`price=${encodeURIComponent('-1')}`);
        if (sortValues == 'price=1') queryParts.push(`price=${encodeURIComponent('1')}`);
        // if (searchText.sortBySales == 1 || searchText.sortBySales == -1) queryParts.push(`sales=${encodeURIComponent(searchText.sortBySales)}`);
        // if (searchText.sortBydate == 1 || searchText.sortBydate == -1) queryParts.push(`date=${encodeURIComponent(searchText.sortBydate)}`);

        const queryString = queryParts.join('&')
        const queryUrl = `/search-result`

        navigate(`${queryUrl}${queryString ? '?' + queryString : ''}`)

    }

    function handleEmptyQuery() {
        setSearchText({
            name: '',
            category: '',
            description: '',
            minPrice: 0,
            maxPrice: 1000,
            promotion: '',
            attribute: '',
            sortBydate: 0,
            sortBySales: 0
        })
        setSortValues('')
        handleSubmit()
        navigate('/search-result?searchOnly=true&limit=8&page=1')
    }

    return (
        <>
            <FiltersContext.Provider value={{ products, handleLimit, handleChangeFilters, searchText, limit, handleSubmit, handlePage, sortValues, handleChangeSort, handleEmptyQuery }}>
                {children}
            </FiltersContext.Provider>
        </>
    )
}

function useFiltersContext() {
    const context = useContext(FiltersContext)
    // if (!context) {
    //     throw new Error('useFiltersContext must be used within a FiltersProvider');
    // }
    return context
}

export { FiltersProvider, useFiltersContext }