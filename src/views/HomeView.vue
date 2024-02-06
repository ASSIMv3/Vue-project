<script setup>
import TheFeatures from "@/components/home_page/TheFeatures.vue";
import UpperBanner from "@/components/home_page/UpperBanner.vue";
import TopOffers from "@/components/home_page/TopOffers.vue";
import TopCategories from "@/components/home_page/TopCategories.vue";
import NewProducts from "@/components/home_page/NewProducts.vue";
import QualityFeatures from "@/components/home_page/QualityFeatures.vue";
import ShopWithus from "@/components/home_page/ShopWithus.vue";
import { productsModule } from "@/stores/products";
import { onMounted } from "vue";
import ProductsComponent from "@/components/home_page/ProductsSwiper.vue";
const store = productsModule();
onMounted(async () => {
  await store.getProducts();
});
</script>

<template>
  <div class="home">
    <UpperBanner />
    <TheFeatures />
    <TopOffers />
    <ProductsComponent
      :products="store.flashDeals"
      title="Flash Deals"
      titleColor="red-darken-3"
      :index="0"
    />
    <TopCategories />
    <NewProducts :products="store.newProducts" :index="1" />
    <QualityFeatures />
    <ProductsComponent
      :products="store.mobilePhones"
      title="Top Mobile Phones"
      titleColor="#404040"
      :index="0"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="6" class="pr-5">
          <img
            src="@/assets/images/band-left-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
        <v-col cols="6" class="pl -5">
          <img
            src="@/assets/images/band-right-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-container>
    <ProductsComponent
      :products="store.fragrances"
      title="Top Fragrances"
      titleColor="#404040"
      :index="3"
    />
    <img src="@/assets/images/tv-banner.webp" class="w-100" alt="" />
    <ProductsComponent
      :products="store.groceries"
      title="Top Groceries"
      titleColor="#404040"
      :index="6"
    />
    <ShopWithus />
  </div>
</template>
