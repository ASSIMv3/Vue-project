<script setup>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { defineProps, ref, inject } from "vue";
import { productsModule } from "@/stores/products";
const store = productsModule();
const Emitter = inject("Emitter");
const openQuickView = ref((product) => {
  Emitter.emit("openQuickView", product);
});
const props = defineProps({
  products: {
    type: Array,
  },
  title: {
    type: String,
  },
  titleColor: {
    type: String,
  },
  routeCategory: {
    type: String,
  },
  index: {
    type: Number,
  },
});
const shownItem = ref({});
const modules = ref([Pagination, Navigation, Autoplay]);
const breakpoints = ref({
  0: { slidesPerView: 1 },
  580: { slidesPerView: 2 },
  767: { slidesPerView: 3 },
  990: { slidesPerView: 4 },
});
</script>

<template>
  <div class="products-swiper pt-16">
    <div class="title d-flex align-center justify-space-between mb-10 px-5">
      <h2
        style="font-weight: 900; font-size: 30px"
        :class="`text-${props.titleColor}`"
      >
        {{ props.title }}
      </h2>
      <router-link
        class="text-black"
        style="font-size: 14px"
        :to="{
          name: 'products_category',
          query: {
            title: store.categories[index].title,
            category: store.categories[index].rout,
          },
        }"
        >Shop All</router-link
      >
    </div>
    <v-container v-if="!products.length" fluid>
      <v-row
        ><v-col cols="12" class="pt-16">
          <v-row>
            <v-col cols="3" v-for="num in 4" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row> </v-col
      ></v-row>
    </v-container>
    <Swiper
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :modules="modules"
      :slides-per-view="4"
      :space-between="35"
      class="pb-9 px-5"
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :breakpoints="breakpoints"
      :loop="true"
      :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
    >
      <swiper-slide v-for="item in props.products" :key="item.id">
        <v-card elevation="0" class="pb-5" height="350">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="img-parent position-relative"
              style="height: 200px; overflow: hidden"
            >
              <img
                :src="
                  shownItem[item.title] ? shownItem[item.title] : item.thumbnail
                "
                class="w-100"
                v-bind="props"
                :style="`height: 100%; transition: 0.5s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                }; cursor:pointer`"
                alt=""
              />
              <v-btn
                width="60"
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
          <v-card-text class="pl-0 pb-1 text-center"
            >({{ item.title }})
            {{
              item.description.split(" ").length <= 2
                ? item.description
                : item.description.split(" ").slice(0, 2) + "..."
            }}</v-card-text
          >
          <div class="rating text-center">
            <v-rating
              v-model="item.rating"
              half-increments
              readonly
              color="yellow-darken-3"
              size="x-small"
            ></v-rating>
          </div>
          <v-card-text class="pl-0 pt-0 text-center">
            <del>${{ item.price }}</del> From
            <span class="text-red" style="font-weight: 900; font-size: 17px"
              >${{
                Math.ceil(
                  item.price - item.price * (item.discountPercentage / 100)
                )
              }}</span
            ></v-card-text
          >
          <v-btn-toggle
            v-model="shownItem[item.title]"
            mandatory
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
        </v-card>
        <div class="mt-8 text-center">
          <v-btn
            class="py-2 px-12"
            style="text-transform: none; border-radius: 30px"
            variant="outlined"
            @click="
              $router.push({
                name: 'product_details',
                query: { productId: item.id },
              })
            "
            >Choose Options</v-btn
          >
        </div>
      </swiper-slide>
      <div class="swiper-prev"></div>
      <div class="swiper-next"></div>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>

<style lang="scss">
.products-swiper {
  .swiper-button-next,
  .swiper-button-prev {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    border: 2px solid rgb(100, 96, 96);
    background-color: white;
    top: 30%;
    &::after {
      font-size: 13px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(100, 96, 96);
      font-weight: 900;
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
//Media Queries
@media (max-width: 580px) {
  .products-swiper {
    .img-parent {
      height: 300px !important;
    }
  }
}
</style>
