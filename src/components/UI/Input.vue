<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  error: {
    type: Array,
    required: false
  }
})
const emit = defineEmits(['update:value'])
const updateValue = (e) => {
  emit('update:value', e.target.value)
}
</script>

<template>
  <div class="w-full mb-5 sm:mb-0">
    <label :for="name" class="inline-block mb-1 text-gray-700">{{ label }}*</label>
    <input class="w-full text-gray-500 border border-solid border-gray-300 rounded px-3 py-2" :type="type" :name="name"
      :id="name" :placeholder="placeholder" :value="value" @input="updateValue" />
      <TransitionGroup>
         <div v-for="err of error" :key="err.$uid">
        <div class="text-xs text-red-700">{{ err.$message }}</div>
      </div>
      </TransitionGroup>
     
  </div>
</template>
