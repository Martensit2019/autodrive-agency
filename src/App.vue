<script setup>
import { useStore } from 'vuex'
import Button from '@/components/UI/Button.vue'
import Modal from '@/components/Modal.vue'

const store = useStore()
const btnClick = (id) => {
  store.commit('SET_CITY_ID', id)
  store.commit('SET_STATUS_MODAL')
}
</script>

<template>
  <Modal />
  <div class="container mx-auto">
    <div class="px-2.5 sm:px-0 py-5">
      <Button v-for="btn in store.state.mainBtns" :btn="btn" :key="btn.id" @click="btnClick" />
    </div>
  </div>
</template>
