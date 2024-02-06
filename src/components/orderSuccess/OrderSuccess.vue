<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { cartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
const router = useRouter();
const store = cartStore();
const dialog = ref(false);
const props = defineProps(["popup"]);

const emits = defineEmits(["close_popup"]);

function closePopup() {
  setTimeout(() => {
    emits("close_popup");
  }, 200);
}
function resetData() {
  closePopup();
  store.resetItems();
  router.push({ name: "home" });
}

onMounted(() => {
  dialog.value = props.popup;
});
</script>

<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="50%" persistent
      ><v-card class="text-center py-7"
        ><div class="text-center">
          <v-icon
            style="
              background: white;
              color: green;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              font-size: 76px;
              border: 1px solid green;
            "
            >mdi-check</v-icon
          >
        </div>
        <v-card-title
          style="font-size: 30px; font-weight: bold; color: rgb(93, 93, 93)"
          >Order Placed Successfully</v-card-title
        >
        <v-card-text style="color: rgb(134, 134, 134); font-size: 17px"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum earum
          architecto, ea facilis autem voluptatibus dolor maiores! Incidunt
          totam magnam tempore non, facilis, esse quis dignissimos officiis
          nesciunt, ab molestiae.</v-card-text
        ><v-card-actions class="mt-5 justify-center"
          ><v-btn variant="elevated" color="blue" @click="resetData"
            >Got it!</v-btn
          ></v-card-actions
        ></v-card
      ></v-dialog
    >
  </div>
</template>
