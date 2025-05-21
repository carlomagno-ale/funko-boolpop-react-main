import { Link } from "react-router-dom";

export default function SearchResultsUi({ results }) {
  return (
    <>
      <h5 className="text-white d-md-none">Risultati:</h5>
      <div className="search_results_container">
        <div className="search_results_body">
          <ul className="">
            {results.map((item) => (
              <>
                <li>
                  <Link to={`/${item.slug}`}>
                    <div className="d-flex gap-5 align-items-center">
                      <p>{item.name}</p>
                    </div>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}