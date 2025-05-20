import AdvancedSearchUi from "../dumb/AdvancedSearch.ui"
import { useState, useEffect } from 'react';
import Loader from "../dumb/Loader.ui";
import { useFiltersContext } from "../../contexts/filtersContext";

export default function AdvancedSearch() {

    const context = useFiltersContext()

    //aspetto che il context sia disponibile
    if (!context) {
        return <Loader />
    }

    console.log(context);

    const { searchText, handleChangeFilters, handleSubmit, sortValues, handleChangeSort, handleEmptyQuery } = useFiltersContext()

    const [categoryList, setCategoryList] = useState({
        state: 'loading'
    })

    const [promoList, setPromoList] = useState({
        state: 'loading'
    })

    const [attributeList, setAttributeList] = useState({
        state: 'loading'
    })

    /*fetch promo*/
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getPromo=true')//query da definire nella backend getPromo
            .then((res) => res.json())
            .then((data) => {
                setPromoList({
                    state: 'success',
                    data: data,
                });
            })
            .catch((err) => {
                setPromoList({
                    state: 'error',
                    message: err.message,
                });
            });
    }, [])

    //filtri attributes
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getAttribute=true')
            .then((res) => res.json())
            .then((data) => {
                setAttributeList({
                    state: 'success',
                    data: data,
                });
            })
            .catch((err) => {
                setAttributeList({
                    state: 'error',
                    message: err.message,
                });
            });
    }, [])

    /*fetch category*/
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getCategory=true')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setCategoryList({
                    state: 'success',
                    data: data,
                });
            })
            .catch((err) => {
                setCategoryList({
                    state: 'error',
                    message: err.message,
                });
            });
    }, [])


    if (categoryList.state === 'loading' || promoList.state === 'loading' || attributeList.state === 'loading') {
        return <Loader />;
    }


    if (categoryList.state === 'error' || promoList.state === 'error' || attributeList.state === 'error') {
        return (
            <>
                <h1>Error loading data</h1>
                <p>{categoryList.message || promoList.message || attributeList.message}</p>
            </>
        );
    }


    if (categoryList.state === 'success' && promoList.state === 'success' && attributeList.state === 'success') {
        return (
            <div className="container">
                <AdvancedSearchUi
                    searchName={searchText.name}
                    searchDescription={searchText.description}
                    searchCategory={searchText.category}
                    searchMinPrice={searchText.minPrice}
                    searchMaxPrice={searchText.maxPrice}
                    searchPromo={searchText.promotion}
                    searchAttribute={searchText.attribute}
                    onchange={handleChangeFilters}
                    onsubmit={handleSubmit}
                    categoryList={categoryList.data}
                    promoList={promoList.data}
                    sortValues={sortValues}
                    onchangeSort={handleChangeSort}
                    attributeList={attributeList.data}
                    emptyQuery={handleEmptyQuery}
                />
            </div>
        );
    }

    // Fallback 
    return <Loader />;

}