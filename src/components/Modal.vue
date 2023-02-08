<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Form from '@/components/Form.vue'

const store = useStore()

const isOpen = computed(() => {
  return store.state.isOpen
})
</script>

<template>
  <teleport to="body">
    <div v-if="isOpen" class="modal-backdrop fixed bg-gray-500 bg-opacity-70 w-full h-full inset-0">
        <div class="flex justify-center pt-28" @click.self="store.commit('SET_STATUS_MODAL')">
          <div class="mx-6 md:w-[793px] bg-white shadow-xl p-4 rounded-lg">
            <Form v-if="store.state.cityId !== null" />
            <div v-else v-html="store.state.response" />
          </div>
        </div>
    </div>
  </teleport>
</template>

<style></style>
