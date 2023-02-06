<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, email, required } from '@vuelidate/validators'
import { IMaskDirective } from 'vue-imask'
import Input from './UI/Input.vue'
import Select from './UI/Select.vue'
import Button from '@/components/UI/Button.vue'

const store = useStore()
const nameField = ref('')
const phoneField = ref('')
const phoneNumber = ref('')
const emailField = ref('')
const cityId = ref(store.state.cityId)
const phoneNumberMask = ref({
  mask: '+{7}(000)000-00-00',
  lazy: true,
})

const rules = computed(() => ({
  nameField: {
    required: helpers.withMessage('Имя обязательно к заполнению', required),
    minLength: helpers.withMessage('Имя не должно быть короче 3 символов', minLength(3)),
  },
  phoneField: {
    required: helpers.withMessage('Телефон обязателен к заполнению', required),
    minLength: helpers.withMessage('Телефон не должен быть короче 16 символов', minLength(16)),
  },
  emailField: {
    required: helpers.withMessage('Email обязателен к заполнению', required),
    email: helpers.withMessage('Введите валидный email', email),
  },
}))
const v = useVuelidate(rules, { nameField, phoneField, emailField })

const isNumber = (e) => {
  let regex = /[0-9]/
  if (!regex.test(e.key)) {
    e.returnValue = false
    if (e.preventDefault) e.preventDefault()
  }
}
const onAccept = (e) => {
  const maskRef = e.detail
  phoneField.value = maskRef.value
}
const onComplete = (e) => {
  const maskRef = e.detail
  phoneNumber.value = maskRef.unmaskedValue
}

const handleSubmit = async () => {
  v.value.$touch()
  if (v.value.$invalid) {
    // console.log('какие-то ошибки')
    
    return
  } else {
    // console.log('нет ошибок')
    const data = {
      name: nameField.value,
      phone: `+${phoneNumber.value}`,
      email: emailField.value,
      city_id: +cityId.value,
    }
    nameField.value = phoneField.value = emailField.value = ''
    store.commit('SET_STATUS_MODAL')
    store.commit('SET_CITY_ID', null)
    store.dispatch('getResponse', data)
  }
}
const vImask = IMaskDirective
</script>
<template>
  <div class="">
    <h1 class="text-neutral-900 text-2xl font-medium mb-5">Заказать звонок</h1>
    <form class="block sm:grid grid-cols-3 md:grid-cols-4 gap-4" @submit.prevent="handleSubmit">
      <div class="w-full mb-5 sm:mb-0">
        <label for="phone" class="inline-block mb-1 text-gray-700">Телефон*</label>
        <input
          class="w-full text-gray-500 border border-solid border-gray-300 rounded px-3 py-2"
          v-model="phoneField"
          type="tel"
          name="phone"
          id="phone"
          v-imask="phoneNumberMask"
          placeholder="+7 (___) ___-__-__"
          @keypress="isNumber"
          @accept="onAccept"
          @complete="onComplete"
        />
        <TransitionGroup>
          <div v-for="err of v.phoneField.$errors" :key="err.$uid">
            <div class="text-xs text-red-700">{{ err.$message }}</div>
          </div>
        </TransitionGroup>
      </div>
      <Input
        class="md:row-start-1 md:col-span-1"
        label="Имя"
        type="text"
        name="name"
        placeholder="Иван Иванов"
        v-model:value="v.nameField.$model"
        :error="v.nameField.$errors"
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        v-model:value="v.emailField.$model"
        :error="v.emailField.$errors"
      />
      <Select label="Город" :options="store.state.cities" v-model:value="cityId" />
      <div class="md:col-start-4 items-end">
        <Button type="submit" class="" :btn="store.state.btnSubmit" />
      </div>
    </form>
  </div>
</template>
