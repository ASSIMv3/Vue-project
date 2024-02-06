<script setup>
import { productsModule } from "@/stores/products";
import { ref, watch, inject } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

const Emitter = inject("Emitter");
const openQuickView = ref((product) => {
  Emitter.emit("openQuickView", product);
});
const store = productsModule();
const route = useRoute();
const { categoryProducts } = storeToRefs(store);
const shownItem = ref({});
const loading = ref(false);

const getProducts = async () => {
  if (route.name == "products_category") {
    try {
      document.documentElement.scrollTo(0, 0);
      loading.value = true;
      await store.getProductsByCategory(route.query.category);
      loading.value = false;
    } catch (error) {
      console.log(error);
    }
  }
};
getProducts();

watch(
  () => route.query.category,
  () => getProducts()
);
</script>

<template>
  <div class="products-category mt-10">
    <h1 class="text-center">{{ route.query.title }}</h1>
    <v-container>
      <v-card :loading="loading" elevation="0" class="pt-5" min-height="700px">
        <v-row v-if="loading">
          <v-col cols="3" v-for="num in 4" :key="num">
            <v-skeleton-loader
              type="image, article, button"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="px-5 mt-8 mt-lg-0 px-10 px-sm-5 text-center"
            v-for="item in categoryProducts.products"
            :key="item.id"
          >
            <v-lazy
              ><v-card elevation="0" class="pb-5 pt-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div
                    class="img-parent position-relative"
                    style="height: 160px; overflow: hidden"
                  >
                    <img
                      :src="
                        shownItem[item.title]
                          ? shownItem[item.title]
                          : item.thumbnail
                      "
                      class="w-100"
                      v-bind="props"
                      :style="`height: 100%; transition: 0.5s all ease-in-out; scale: ${
                        isHovering ? 1.05 : 1
                      }; cursor:pointer`"
                      alt=""
                    />
                    <v-btn
                      width="90"
                      height="30"
                      variant="outlined"
                      class="bg-white quick-view-btn"
                      style="
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        text-transform: none;
                        border-radius: 30px;
                        font-size: 12px;
                        transition: 0.2s all ease-in-out;
                        opacity: 0;
                      "
                      @click="openQuickView(item)"
                      >Quick View</v-btn
                    >
                  </div>
                </v-hover>
                <v-card-text class="pl-0 pb-1" style="height: 75px"
                  >({{ item.title }})
                  {{
                    item.description.split(" ").length <= 2
                      ? item.description
                      : item.description.split(" ").slice(0, 3) + "..."
                  }}</v-card-text
                >
                <v-rating
                  v-model="item.rating"
                  half-increments
                  readonly
                  color="yellow-darken-3"
                  size="x-small"
                ></v-rating>
                <v-card-text class="pl-0 pt-0">
                  <del>${{ item.price }}</del> From
                  <span
                    class="text-red"
                    style="font-weight: 900; font-size: 17px"
                    >${{
                      Math.ceil(
                        item.price -
                          item.price * (item.discountPercentage / 100)
                      )
                    }}</span
                  ></v-card-text
                >
                <v-btn-toggle
                  v-model="shownItem[item.title]"
                  class="d-flex align-center justify-center"
                >
                  <v-btn
                    v-for="(pic, i) in item.images"
                    size="x-small"
                    :value="pic"
                    :key="i"
                    ><img
                      :src="pic"
                      alt=""
                      width="30"
                      height="30"
                      style="
                        border-radius: 50%;
                        border: 1px solid rgb(180, 173, 173);
                      "
                  /></v-btn>
                </v-btn-toggle>
                <div class="mt-5">
                  <v-btn
                    class="py-2 px-12"
                    style="text-transform: none; border-radius: 30px"
                    variant="outlined"
                    @click="
                      $router.push({
                        name: 'product_details',
                        params: { productId: item.id },
                      })
                    "
                    >Choose Options</v-btn
                  >
                </div>
              </v-card></v-lazy
            >
          </v-col>
        </v-row></v-card
      >
    </v-container>
  </div>
</template>

<style lang="scss">
.products-category {
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
</style>
