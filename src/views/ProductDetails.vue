<script setup>
import { ref, inject } from "vue";
import { productsModule } from "@/stores/products";
import { useRoute } from "vue-router";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { cartStore } from "@/stores/cart";
const storeCart = ref(cartStore());
const route = useRoute();
const Emitter = inject("Emitter");
const store = productsModule();
const tab = ref("");
const quantity = ref(1);
const loading = ref(false);
const btnLoading = ref(false);
const getSingleProduct = async () => {
  try {
    loading.value = true;
    await store.getSingleProduct(route.params.productId);
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};
getSingleProduct();
const addToCart = ref((item) => {
  item.quantity = quantity.value;
  storeCart.value.addItem(item);
  btnLoading.value = true;
  setTimeout(() => {
    btnLoading.value = false;
    Emitter.emit("openCart");
    Emitter.emit("showMsg", item.title);
  }, 1000);
});
</script>

<template>
  <div class="product-details mt-16">
    <v-container fluid>
      <v-row>
        <v-skeleton-loader
          type="image, image, image "
          v-if="loading"
        ></v-skeleton-loader>
        <v-col cols="12" md="7" v-if="!loading">
          <img
            :src="tab ? tab : store.singleProduct.thumbnail"
            class="w-100"
            height="500"
            alt=""
          />
          <v-tabs center-active height="220" v-model="tab">
            <v-tab
              v-for="(img, i) in store.singleProduct.images"
              :key="i"
              :value="img"
              class="mx-10 mt-10"
              ><img :src="img" alt="" width="100" height="200"
            /></v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" md="5" class="pt-0 pl-6 mt-8 mt-md-0" v-if="!loading">
          <v-skeleton-loader
            type="article, article, article "
            v-if="loading"
          ></v-skeleton-loader>
          <v-card elevation="0">
            <v-card-title
              class="px-0"
              style="font-size: 19px; font-weight: bold"
              >({{ store.singleProduct.title }}) Sample -
              {{ store.singleProduct.category }} For Sale
            </v-card-title>
            <div class="rating-parent d-flex align-center" style="gap: 10px">
              <v-rating
                v-model="store.singleProduct.rating"
                half-increments
                readonly
                color="yellow-darken-3"
                size="x-small"
              ></v-rating>
              <span class="mt-1" style="color: rgb(96, 96, 96); font-size: 13px"
                >Stock: {{ store.singleProduct.stock }}</span
              >
            </div>
            <v-card-text
              class="px-0"
              style="color: rgb(96, 96, 96); font-size: 13px"
              >{{ store.singleProduct.description }}</v-card-text
            >
            <v-card-text
              class="pt-0 px-0"
              style="color: rgb(96, 96, 96); font-size: 13px"
              >Brand: {{ store.singleProduct.brand }}</v-card-text
            >
            <v-card-text
              class="pt-0 px-0"
              style="color: rgb(96, 96, 96); font-size: 13px"
              >Availability:
              {{
                store.singleProduct.stock > 0
                  ? "Available In Stock"
                  : "Not Available In Stock"
              }}</v-card-text
            >
            <v-card-text class="pl-0 pt-0">
              <del>${{ store.singleProduct.price }}</del> From
              <span style="font-weight: 900; font-size: 17px"
                >${{
                  Math.ceil(
                    store.singleProduct.price -
                      store.singleProduct.price *
                        (store.singleProduct.discountPercentage / 100)
                  )
                }}</span
              ></v-card-text
            >
            <v-card-text class="pt-0 px-0">Quantity</v-card-text>
            <div
              class="counter px-1"
              style="
                border-radius: 30px;
                border: 1px solid rgb(201, 201, 201);
                width: fit-content;
              "
            >
              <v-icon size="22" @click="quantity > 1 ? quantity-- : false"
                >mdi-minus</v-icon
              >
              <input
                type="number"
                class="text-center py-2"
                style="width: 60px; font-size: 14px"
                min="1"
                v-model="quantity"
              />
              <v-icon size="22" @click="quantity++">mdi-plus</v-icon>
            </div>
            <v-card-text class="px-0"
              >Subtotal: ${{
                Math.ceil(
                  store.singleProduct.price -
                    store.singleProduct.price *
                      (store.singleProduct.discountPercentage / 100)
                ) * quantity
              }}</v-card-text
            >
            <v-card-actions class="mt-2 w-100 px-0">
              <v-btn
                variant="outlined"
                class="w-75 text-white"
                style="
                  text-transform: none;
                  border-radius: 30px;
                  background-color: rgb(34, 34, 34);
                "
                :loading="btnLoading"
                height="50"
                @click="addToCart(store.singleProduct)"
                >Add To Cart</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
