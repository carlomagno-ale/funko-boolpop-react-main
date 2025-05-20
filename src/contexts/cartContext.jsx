import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const emptyCart = {
    state: "",
    message: "",
    amount: 0,
    shipping: 5,
    cartItemNumber: 0,
    userCart: [],
  };

  const checkForCart = JSON.parse(localStorage.getItem("cart"));

  const [cart, setCart] = useState(checkForCart ? checkForCart : emptyCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.userCart.length < 1) {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  function getTotal(currentItems) {
    let total = 0;

    const priceArr = currentItems.map((item) => {
      const basePrice = Number(item.price);
      const discount =
        Array.isArray(item.promotion) && item.promotion.length > 0
          ? Number(item.promotion[0].discount)
          : 100;
      const quantity = Number(item.cartQuantity);

      let price = ((basePrice * discount) / 100) * quantity;

      return Number(price);
    });
    priceArr.forEach((item) => {
      total = total + item;
    });
    console.log(total);

    return total;
  }

  function handleCart(newItem, totalQuantity) {
    console.log(cart.userCart);

    //controlla inizialmente se la quantita e 0
    if (newItem.quantity == 0) {
      return setCart({
        ...cart,
        state: "error",
        message: "Questo prodotto non è più disponibile",
      });
    }

    //controlla se e gia nel carrello
    const itemCheck = cart.userCart.find((item) => item.slug == newItem.slug);
    if (itemCheck) {
      if (itemCheck.quantity == 0) {
        return setCart({
          ...cart,
          state: "success",
          message: "Questo prodotto non è più disponibile",
        });
      } else if (itemCheck.quantity <= totalQuantity) {
        addCartQuantity(itemCheck, totalQuantity);
      }
    } else {
      const itemToPush = { ...newItem };
      itemToPush.cartQuantity = 1;
      itemToPush.quantity = newItem.quantity - 1;

      const newAmount = getTotal([...cart.userCart, itemToPush]);
      const newShipping = newAmount > 50 ? 0 : 5;

      setCart({
        state: "success",
        message: "Prodotto aggiunto al carrello",
        cartItemNumber: cart.cartItemNumber + 1,
        amount: newAmount,
        shipping: newShipping,
        userCart: [...cart.userCart, itemToPush],
      });
    }
  }

  function deleteFromCart(itemToDelete) {
    const quantityToDelete = Number(itemToDelete.cartQuantity);

    const updatedCart = cart.userCart.filter(
      (item) => item.slug !== itemToDelete.slug
    );

    const newAmount = getTotal(updatedCart);
    const newShipping = newAmount > 50 ? 0 : 5;

    setCart({
      state: "success",
      message: "Prodotto rimosso dal carrello",
      cartItemNumber: cart.cartItemNumber - quantityToDelete,
      amount: newAmount,
      shipping: newShipping,
      userCart: updatedCart,
    });
  }

  function subtractCartQuantity(itemToChange) {
    console.log(itemToChange);

    if (itemToChange.cartQuantity > 1) {
      const updatedCart = cart.userCart.map((item) => {
        if (item.slug === itemToChange.slug) {
          return {
            ...item,
            cartQuantity: item.cartQuantity - 1,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });

      const newAmount = getTotal(updatedCart);
      const newShipping = newAmount > 50 ? 0 : 5;

      setCart({
        state: "success",
        message: "Prodotto rimosso",
        cartItemNumber: cart.cartItemNumber - 1,
        amount: newAmount,
        shipping: newShipping,
        userCart: updatedCart,
      });
    } else if (itemToChange.cartQuantity == 1) {
      deleteFromCart(itemToChange);
    }
  }

  function addCartQuantity(itemToChange, totalQunatity) {
    if (itemToChange.cartQuantity < totalQunatity) {
      const updatedCart = cart.userCart.map((item) => {
        if (item.slug === itemToChange.slug) {
          return {
            ...item,
            cartQuantity: itemToChange.cartQuantity + 1,
            quantity: itemToChange.quantity - 1,
          };
        } else {
          return item;
        }
      });

      const newAmount = getTotal(updatedCart);
      const newShipping = newAmount > 50 ? 0 : 5;

      setCart({
        state: "success",
        message: "Prodotto aggiunto",
        cartItemNumber: cart.cartItemNumber + 1,
        amount: newAmount,
        shipping: newShipping,
        userCart: updatedCart,
      });
    } else if (itemToChange.quantity == 0) {
      setCart({
        state: "success",
        message: "Prodotto non disponibile",
        shipping: cart.shipping,
        amount: cart.amount,
        cartItemNumber: cart.cartItemNumber,
        userCart: cart.userCart,
      });
    }
  }

  function unloadCart() {
    setCart(emptyCart);
  }

  return (
    <>
      <CartContext.Provider
        value={{
          handleCart,
          cart,
          deleteFromCart,
          subtractCartQuantity,
          addCartQuantity,
          unloadCart,
          setCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

function useCartContext() {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCartContext };
