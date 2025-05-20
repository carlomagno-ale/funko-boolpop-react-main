import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import Checkout from "./pages/Checkout"
import { CartProvider } from "./contexts/cartContext"
import Cart from "./pages/Cart"
import Payment from "./pages/Payment"
import { PaymentProvider } from "./contexts/paymentContext"
import SuccessCheckout from "./pages/SuccessCheckout"
import SearchResult from "./pages/SearchResult"
import { FiltersProvider } from "./contexts/filtersContext"

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" Component={Home} />
              <Route path="/:slug" Component={ProductPage} />
              <Route path="/cart" Component={Cart} />
              <Route path="/success-checkout" Component={SuccessCheckout} />
              <Route path="/search-result" element={
                <>
                  <FiltersProvider>
                    <SearchResult />
                  </FiltersProvider>
                </>
              } />
              <Route path="/complete-checkout" element={
                <>
                  <PaymentProvider>
                    <Payment />
                  </PaymentProvider>
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <PaymentProvider>
                    <Checkout />
                  </PaymentProvider>
                </>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
