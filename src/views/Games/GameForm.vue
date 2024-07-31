<script setup lang="ts">
import {onMounted, reactive} from "vue";
import AxiosInstance from "@/utils/axiosInstance";
import VInput from "@/components/VInput.vue";
import type {Game} from "@/types/Game";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
})

const state = reactive({
  game: {} as Game,
})

const fetchGame = async (id: string) => {
  await AxiosInstance.get(`/games/${id}`)
      .then(response => {
        state.game = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
}

onMounted(() => {
  if (props.id) {
    fetchGame(props.id)
  }
})

const emit = defineEmits(['closeDrawer'])
const submit = async () => {
  if (props.id) {
    await AxiosInstance.put(`/games/${props.id}`, state.game)
        .then(() => {
          emit('closeDrawer')
        })
        .catch(error => {
          console.log(error)
        })
  } else {
    await AxiosInstance.post('/games', state.game)
        .then(() => {
          emit('closeDrawer')
        })
        .catch(error => {
          console.log(error)
        })
  }
}
</script>

<template>
  <FormKit
      type="form"
      method="post"
      @submit="submit"
      form-class="space-y-6"
      :actions="false"
  >
    <VInput
        v-model="state.game.name"
        type="text"
        name="name"
        label="Nom"
        placeholder="Roue de la fortune"
        validation="required"
    />
    <VInput
        v-model="state.game.description"
        type="textarea"
        name="description"
        label="Description"
        placeholder="Jeu de société"
        validation="required"
    />
    <div>
      <button type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ props.id ? 'Modifier' : 'Créer' }}
      </button>
    </div>
  </FormKit>
</template>