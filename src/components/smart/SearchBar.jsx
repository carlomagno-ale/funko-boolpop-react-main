import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBarUi from "../dumb/SearchBar.ui";
import SearchResultsUi from "../dumb/SearchResults.ui";
import Loader from "../dumb/Loader.ui";
import { useLocation } from "react-router-dom";

export default function SearchBar({ page = 1, limit = 10, display }) {
  // const location = useLocation()
  // const queryParams = new URLSearchParams(location.search)

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [filteredFunko, setFilteredFunko] = useState({
    state: 'loading'
  });
  const [resultsDisplay, setResultsDisplay] = useState(false)

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&name=${searchText.name}&searchOnly=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredFunko({
          state: "success",
          data: data,
        });
      })
      .catch((err) => {
        setFilteredFunko({
          state: "error",
          message: err.message,
        });
      });
  }, [searchText]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessage('')
    }, 3000)

    return () => clearInterval(timer)
  }, [message])

  function handleChange(key, value) {
    setResultsDisplay(true)
    setSearchText({
      ...searchText,
      [key]: value
    })
  }


  function handleSearch() {
    console.log(message);


    if (searchText.name == "") {
      return setMessage("Cerca un prodotto per nome");
    }
    navigate(`/search-result?name=${searchText.name}&page=1&limit=8`);
    setResultsDisplay(false)
  }

  function emptyResearch() {
    setSearchText({
      name: "",
      category: "",
      description: "",
    });
  }

  switch (filteredFunko.state) {
    case 'loading':
      return (
        <>
          <Loader />
        </>
      )
    case 'error':
      return (
        <>
          <h1>{filteredFunko.state}</h1>
          <p>{filteredFunko.message}</p>
        </>
      )
    case 'success':
      return (
        <>
          <SearchBarUi
            searchName={searchText.name}
            searchDescription={searchText.description}
            searchCategory={searchText.category}
            onchange={handleChange}
            handleSearch={handleSearch}
            message={message}
          />
          <p className={message !== '' ? `alert alert-danger position-absolute top-0 left-50` : 'd-none'}>{message}</p>
          <div className={display == false ? 'd-block' : 'd-none'}>

            {filteredFunko.data.results && filteredFunko.data.results.length > 0 && resultsDisplay == true ? (<><SearchResultsUi emptyResearch={emptyResearch} results={filteredFunko.data.results} /></>) : (<></>)}
          </div>
        </>
      );
  }
}
