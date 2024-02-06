<template>
  <app-layout> </app-layout>
  <QuickView />
  <v-snackbar v-model="bar" location="left bottom" max-width="300"
    >{{ itemTitle }} has been added to your cart successfully!
    <template v-slot:actions
      ><v-icon @click="bar = false">mdi-close</v-icon>
    </template></v-snackbar
  >
</template>

<script setup>
import { ref, inject } from "vue";
import AppLayout from "./components/global/AppLayout.vue";
import QuickView from "@/components/global/QuickView.vue";
const bar = ref(false);
const itemTitle = ref("");
const Emitter = inject("Emitter");
Emitter.on("showMsg", (data) => {
  itemTitle.value = data;
  bar.value = true;
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
// * {
//   scroll-behavior: smooth;
// }
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-rating__wrapper {
  margin-right: 20px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
