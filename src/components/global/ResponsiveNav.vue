<script setup>
import { ref, inject } from "vue";
import { cartStore } from "@/stores/cart";
const storeCart = cartStore();
const Emitter = inject("Emitter");
const openCart = ref(() => {
  Emitter.emit("openCart");
});
const openMenu = ref(() => {
  Emitter.emit("openMenu");
});
</script>

<template>
  <div class="res_nav">
    <v-app-bar
      ><v-container
        ><v-row class="align-center row-one"
          ><v-col cols="4" class="d-flex align-center col1"
            ><v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon
            ><svg
              data-icon="search"
              class="ml-5"
              viewBox="0 0 512 512"
              width="20"
            >
              <path
                d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z"
              ></path></svg></v-col
          ><v-col cols="4" class="text-center mt-7"
            ><img
              src="@/assets/images/footer-logo.webp"
              @click="$router.push({ name: 'home' })"
              style="cursor: pointer; width: 130px"
              class="pb-5"
              alt="" /></v-col
          ><v-col cols="4" class="d-flex justify-end"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              focusable="false"
              role="presentation"
              class="icon icon-account"
              width="25"
            >
              <path
                d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z"
              ></path></svg
            ><svg
              viewBox="0 0 30 30"
              class="icon icon-cart ml-7"
              enable-background="new 0 0 30 30"
              width="20"
              @click="openCart"
              style="cursor: pointer"
            >
              <g>
                <g>
                  <path
                    d="M20,6V5c0-2.761-2.239-5-5-5s-5,2.239-5,5v1H4v24h22V6H20z M12,5c0-1.657,1.343-3,3-3s3,1.343,3,3v1h-6V5z M24,28H6V8h4v3    h2V8h6v3h2V8h4V28z"
                  ></path>
                </g>
              </g></svg
            ><v-badge
              location="right top"
              :content="storeCart.cartItems.length"
              color="red"
            ></v-badge></v-col
        ></v-row> </v-container
    ></v-app-bar>
  </div>
</template>
<!-- <style lang="scss">
@media (max-width: 600px) {
  .res_nav {
    .row-one {
      width: 65%;
    }
  }
}
</style> -->
