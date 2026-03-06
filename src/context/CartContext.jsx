import { createContext, useContext, useReducer, useCallback } from "react";
import { toast } from "sonner";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: newItems };
      }

      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.selectedSize === action.payload.selectedSize &&
              item.selectedColor === action.payload.selectedColor
            )
        ),
      };
    }
    case "UPDATE_QTY": {
      const newItems = state.items.map((item) => {
        if (
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
        ) {
          return { ...item, quantity: Math.max(1, action.payload.quantity) };
        }
        return item;
      });
      return { ...state, items: newItems };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = useCallback(
    (product, quantity = 1, selectedSize = "", selectedColor = "") => {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          image: product.images[0],
          salePrice: product.salePrice,
          originalPrice: product.originalPrice,
          selectedSize,
          selectedColor,
          quantity,
        },
      });
      toast.success(`${product.name} added to cart!`, {
        description: `${selectedSize ? "Size: " + selectedSize : ""}${selectedColor ? " | Color: " + selectedColor : ""}`,
      });
    },
    []
  );

  const removeFromCart = useCallback((id, selectedSize, selectedColor) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, selectedSize, selectedColor } });
    toast.info("Item removed from cart");
  }, []);

  const updateQuantity = useCallback((id, selectedSize, selectedColor, quantity) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: { id, selectedSize, selectedColor, quantity },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.items.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );
  const cartOriginalTotal = state.items.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        cartCount,
        cartTotal,
        cartOriginalTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
