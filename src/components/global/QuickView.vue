<script setup>
import { ref, inject } from "vue";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { cartStore } from "@/stores/cart";
const store = ref(cartStore());
const Emitter = inject("Emitter");
const tab = ref("");
const quantity = ref(1);
const loading = ref(false);
const btnLoading = ref(false);
const dialog = ref(false);
const product = ref("");
const addToCart = ref((item) => {
  item.quantity = quantity.value;
  store.value.addItem(item);
  btnLoading.value = true;
  setTimeout(() => {
    btnLoading.value = false;
    Emitter.emit("openCart");
    Emitter.emit("showMsg", item.title);
    dialog.value = false;
  }, 1000);
});
Emitter.on("openQuickView", (data) => {
  product.value = data;
  dialog.value = true;
});
</script>

<template>
  <div class="quick-view">
    <v-dialog v-model="dialog" max-width="900" max-height="500">
      <v-icon
        style="
          position: absolute;
          right: 5px;
          background-color: red;
          color: white;
          z-index: 2;
          cursor: pointer;
        "
        @click="dialog = false"
        >mdi-close</v-icon
      >
      <v-card class="content-card" elevation="0"
        ><v-container class="bg-white pt-10 px-10" fluid>
          <v-row>
            <v-skeleton-loader
              type="image, image, image "
              v-if="loading"
            ></v-skeleton-loader>
            <v-col cols="12" md="7" v-if="!loading">
              <img
                :src="tab ? tab : product.thumbnail"
                class="w-100"
                height="400"
                alt=""
              />
              <v-tabs center-active height="130" v-model="tab">
                <v-tab
                  v-for="(img, i) in product.images"
                  :key="i"
                  :value="img"
                  class="mx-10 mt-10"
                  ><img :src="img" alt="" width="70" height="100"
                /></v-tab>
              </v-tabs>
            </v-col>
            <v-col
              cols="12"
              md="5"
              class="pt-0 pl-6 mt-8 mt-md-0"
              v-if="!loading"
            >
              <v-skeleton-loader
                type="article, article, article "
                v-if="loading"
              ></v-skeleton-loader>
              <v-card elevation="0">
                <v-card-title
                  class="px-0"
                  style="
                    font-size: 19px;
                    font-weight: bold;
                    white-space: pre-wrap;
                  "
                  >({{ product.title }}) Sample - {{ product.category }} For
                  Sale
                </v-card-title>
                <div
                  class="rating-parent d-flex align-center"
                  style="gap: 10px"
                >
                  <v-rating
                    v-model="product.rating"
                    half-increments
                    readonly
                    color="yellow-darken-3"
                    size="x-small"
                  ></v-rating>
                  <span
                    class="mt-1"
                    style="color: rgb(96, 96, 96); font-size: 13px"
                    >Stock: {{ product.stock }}</span
                  >
                </div>
                <v-card-text
                  class="px-0"
                  style="color: rgb(96, 96, 96); font-size: 13px"
                  >{{ product.description }}</v-card-text
                >
                <v-card-text
                  class="pt-0 px-0"
                  style="color: rgb(96, 96, 96); font-size: 13px"
                  >Brand: {{ product.brand }}</v-card-text
                >
                <v-card-text
                  class="pt-0 px-0"
                  style="color: rgb(96, 96, 96); font-size: 13px"
                  >Availability:
                  {{
                    product.stock > 0
                      ? "Available In Stock"
                      : "Not Available In Stock"
                  }}</v-card-text
                >
                <v-card-text class="pl-0 pt-0">
                  <del>${{ product.price }}</del> From
                  <span style="font-weight: 900; font-size: 17px"
                    >${{
                      Math.ceil(
                        product.price -
                          product.price * (product.discountPercentage / 100)
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
                      product.price -
                        product.price * (product.discountPercentage / 100)
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
                    height="50"
                    @click="addToCart(product)"
                    :loading="btnLoading"
                    >Add To Cart</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container></v-card
      >
    </v-dialog>
  </div>
</template>
<style lang="scss">
.content-card {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background: rgb(149, 149, 149);
  }
  &::-webkit-scrollbar-track {
    width: 5px;
    background: rgb(200, 200, 200);
  }
}
</style>
