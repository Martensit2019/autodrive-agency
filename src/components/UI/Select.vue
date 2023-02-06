<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String
  },
  options: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:value'])
const changeOption = (e) => {
  emit('update:value', e.target.value)
}
</script>

<template>
  <div class="col-span-2 md:col-span-1">
    <label class="inline-block mb-1 text-gray-700">{{ label }}*</label>
    <select class="w-full text-gray-500 border border-solid border-gray-300 rounded px-3 py-2" :value="value"
      @change="changeOption">
      <option v-for="option in options" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>

  </div>
</template>
