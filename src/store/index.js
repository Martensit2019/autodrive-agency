import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: () => ({
    isOpen: false,
    cityId: null,
    mainBtns: [
      {
        id: 1,
        bg: 'bg-blue-500',
        title: 'Заказать в Москву',
      },
      {
        id: 2,
        bg: 'bg-teal-600',
        title: 'Заказать в Санкт-Петербург',
      },
    ],
    btnSubmit: { bg: 'bg-green-600', title: 'Отправить' },
    cities: [
      {
        id: 1,
        name: 'Москва',
      },
      {
        id: 2,
        name: 'Санкт-Петербург',
      },
      {
        id: 3,
        name: 'Казань',
      },
    ],
    response: null,
  }),
  mutations: {
    SET_STATUS_MODAL(state) {
      state.isOpen = !state.isOpen
    },
    SET_CITY_ID(state, payload) {
      if (payload !== null) {
        state.cityId = payload.toString()
      } else {
        state.cityId = null
      }
    },
    SET_RESPONSE(state, payload){
      state.response = payload
    }
  },
  actions: {
    async getResponse({ commit }, data) {
      try {
        const res = await axios.post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/', data)
        commit('SET_RESPONSE', res.data)
      } catch (e) {
        console.log(e)
      }finally{
        commit('SET_STATUS_MODAL')
      }
    },
  },
})

export default store
