<script setup>
const props = defineProps({
  btn: {
    type: Object,
  },
  type: {
    type: String,
    default: 'button',
  },
})
const emit = defineEmits(['click'])
const clickBtn = () => {
  emit('click', props.btn.id)
}
</script>

<template>
  <button
    :type="type"
    :class="['w-full sm:w-auto mb-2.5 mr-5 px-4 py-2 rounded-md text-base text-white', btn.bg, { 'sm:w-full mb-0 mt-7 md:mt-0': type === 'submit' }]"
    @click="clickBtn"
  >
    {{ btn.title }}
  </button>
</template>
