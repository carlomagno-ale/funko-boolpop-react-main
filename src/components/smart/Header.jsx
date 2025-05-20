import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useCartContext } from "../../contexts/cartContext";
import AdvancedSearch from "./AdvancedSearch";

export default function Header({ setCartOpen }) {
  const { cart } = useCartContext();
  const [display, setDisplay] = useState(false);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm position-static">
          <div className="container position-static">
            <Link to={"/"} className="navbar-brand">
              <img className="w-100" src="/logo.svg" alt="" />
            </Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse position-static"
              id="collapsibleNavId"
            >
              <div className="navbar-nav me-auto mt-2 mt-lg-0">
              </div>

              <Link
                onClick={() => setCartOpen(true)}
                className="mx-4 text-white fs-4 position-relative"
              >
                {cart.cartItemNumber > 0 ? (
                  <>
                    <label className="cart_label" htmlFor="">
                      {cart.cartItemNumber}
                    </label>
                  </>
                ) : (
                  <></>
                )}
                <i className="bi bi-cart-fill"></i>
              </Link>

              <SearchBar display={display} setDisplay={setDisplay} />
            </div>
          </div>
        </nav>
        <div className={display == true ? "d-block" : "d-none"}>
          <AdvancedSearch />
        </div>
      </header>
    </>
  );
}
