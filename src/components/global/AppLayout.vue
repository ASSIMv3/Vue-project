<script setup>
import AppNav from "./AppNav.vue";
import AppFooter from "./AppFooter.vue";
import CardDrawer from "./CardDrawer.vue";
import FixedNav from "./FixedNav.vue";
import ResponsiveNav from "./ResponsiveNav";
import MenuDrawer from "./MenuDrawer.vue";
import { ref } from "vue";
const windowWidth = ref(0);
windowWidth.value = window.innerWidth;
window.onresize = () => {
  windowWidth.value = window.innerWidth;
};
</script>

<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CardDrawer :windowWidth="windowWidth" />
      <MenuDrawer :windowWidth="windowWidth" />
      <v-main
        :style="`padding-top: ${
          $route.name == 'check_out'
            ? '0px'
            : windowWidth <= 990
            ? '60px'
            : '150px'
        }`"
      >
        <RouterView v-slot="{ Component, route }">
          <component :is="Component" :key="route.name" />
        </RouterView>
      </v-main>
      <AppNav v-show="$route.name != 'check_out' && windowWidth > 990" />
      <ResponsiveNav
        v-show="windowWidth <= 990 && $route.name != 'check_out'"
      />
      <FixedNav v-show="$route.name != 'check_out' && windowWidth > 990" />
      <AppFooter v-show="$route.name != 'check_out'" />
    </v-layout>
  </div>
</template>
