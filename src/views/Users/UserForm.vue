<script setup lang="ts">
import {onMounted, reactive} from "vue";
import AxiosInstance from "@/utils/axiosInstance";
import VInput from "@/components/VInput.vue";
import type {UserRequest} from "@/types/UserProfile";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
})

const state = reactive({
  user: {} as UserRequest,
})

const fetchCompany = async (id: string) => {
  await AxiosInstance.get(`/users/${id}`)
      .then(response => {
        state.user.address = response.data.data.profile.address
        state.user.email = response.data.data.email
        state.user.first_name = response.data.data.profile.first_name
        state.user.last_name = response.data.data.profile.last_name
        state.user.phone_number = response.data.data.profile.phone_number
        state.user.password = ''
        state.user.password_confirmation = ''
        state.user.roles = response.data.data.roles
      })
      .catch(error => {
        console.log(error)
      })
}

onMounted(() => {
  if (props.id) {
    fetchCompany(props.id)
  }
})

const emit = defineEmits(['closeDrawer'])
const submit = async () => {
  if (props.id) {
    await AxiosInstance.put(`/users/${props.id}`, state.user)
        .then(() => {
          emit('closeDrawer')
        })
        .catch(error => {
          console.log(error)
        })
  } else {
    await AxiosInstance.post('/users', state.user)
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
        v-model="state.user.email"
        type="email"
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        validation="required|email"
    />
    <VInput
        v-model="state.user.password"
        type="password"
        name="password"
        label="Mot de passe"
        placeholder="********"
        validation="required"
    />
    <VInput
        v-model="state.user.password_confirmation"
        type="password"
        name="password_confirmation"
        label="Confirmation du mot de passe"
        placeholder="********"
        validation="required|same:password"
    />
    <VInput
        v-model="state.user.first_name"
        type="text"
        name="first_name"
        label="Prénom"
        placeholder="John"
        validation="required"
    />
    <VInput
        v-model="state.user.last_name"
        type="text"
        name="last_name"
        label="Nom"
        placeholder="John"
        validation="required"
    />
    <VInput
        v-model="state.user.roles"
        type="select"
        name="roles"
        label="Rôles"
        :options="[
          {value: '[ROOT]', label: 'Super Admin'},
          {value: '[COMPANY_ADMINISTRATOR]', label: 'Admin Entreprise'},
          {value: '[USER]', label: 'Utilisateur'},
        ]"
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