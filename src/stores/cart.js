import { defineStore } from "pinia";
import { ref } from "vue";
export const cartStore = defineStore("cartStore", () => {
  const cartItems = ref([]);
  const addItem = ref((item) => {
    let exists = false;
    for (let i = 0; i < cartItems.value.length; i++) {
      if (cartItems.value[i].id == item.id) {
        cartItems.value[i].quantity += item.quantity;
        exists = true;
        break;
      }
    }
    if (!exists) {
      cartItems.value.push(JSON.parse(JSON.stringify(item)));
    }
    localStorage.setItem("cart-items", JSON.stringify(cartItems.value));
    console.log(cartItems.value);
  });
  const getCartItems = () => {
    if (localStorage.getItem("cart-items")) {
      cartItems.value = JSON.parse(localStorage.getItem("cart-items"));
    }
    console.log(cartItems.value);
  };
  const deleteItem = (id) => {
    for (let i = 0; i < cartItems.value.length; i++) {
      if (cartItems.value[i].id == id) {
        cartItems.value.splice(i, 1);
      }
    }
    localStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  };
  const setToLocalStorage = () => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  };
  const resetItems = () => {
    cartItems.value = [];
    localStorage.removeItem("cart-items");
  };

  return {
    cartStore,
    cartItems,
    addItem,
    getCartItems,
    deleteItem,
    setToLocalStorage,
    resetItems,
  };
});
