import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const productsModule = defineStore("productsModule", () => {
  const flashDeals = ref([]);
  const newProducts = ref([]);
  const mobilePhones = ref([]);
  const fragrances = ref([]);
  const groceries = ref([]);
  const categoryProducts = ref([]);
  const categories = ref([
    {
      title: "Smart Phones",
      rout: "smartphones",
    },
    {
      title: "Laptops",
      rout: "laptops",
    },
    {
      title: "Furniture",
      rout: "furniture",
    },
    {
      title: "Fragrances",
      rout: "fragrances",
    },
    {
      title: "Men's Watches",
      rout: "mens-watches",
    },
    {
      title: "Women's Bags",
      rout: "womens-bags",
    },
    {
      title: "Groceries",
      rout: "groceries",
    },
  ]);
  const singleProduct = ref("");
  const getProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    flashDeals.value = res.data.products.slice(0, 8);
    newProducts.value = res.data.products.filter(
      (el) => el.category === "laptops"
    );
    mobilePhones.value = res.data.products.filter(
      (el) => el.category === "smartphones"
    );
    fragrances.value = res.data.products.filter(
      (el) => el.category === "fragrances"
    );
    groceries.value = res.data.products.filter(
      (el) => el.category === "groceries"
    );
  };

  const getProductsByCategory = async (category) => {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    categoryProducts.value = res.data;
  };
  const getSingleProduct = async (productId) => {
    const res = await axios.get(`https://dummyjson.com/products/${productId}`);
    singleProduct.value = res.data;
  };

  return {
    flashDeals,
    getProducts,
    newProducts,
    mobilePhones,
    fragrances,
    groceries,
    categories,
    categoryProducts,
    getProductsByCategory,
    singleProduct,
    getSingleProduct,
  };
});
