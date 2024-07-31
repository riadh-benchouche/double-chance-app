<script setup lang="ts">
import GuestLayout from "@/layouts/GuestLayout.vue";
import VInput from "@/components/VInput.vue";
import {reactive} from "vue";
import axiosInstance from "@/utils/axiosInstance";
import {useRouter} from "vue-router";

const router = useRouter()
const state = reactive({
  email: '',
  password: ''
})
const submit = () => {
  axiosInstance.post('/login', state)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        router.push({name: 'Dashboard'})
      })
      .catch(error => {
        console.log(error)
      })
}
</script>

<template>
  <GuestLayout title="Connectez-vous à votre compte">
    <FormKit
        type="form"
        method="post"
        @submit="submit"
        form-class="space-y-6"
        :actions="false"
    >
      <VInput
          v-model="state.email"
          type="email"
          name="email"
          label="Email"
          placeholder="example@double-chance.com"
          validation="required|email"
      />
      <VInput
          v-model="state.password"
          type="password"
          name="password"
          label="Mot de passe"
          placeholder="********"
          validation="required|min:6"
      />
      <div>
        <button type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Se connecter
        </button>
      </div>
    </FormKit>
  </GuestLayout>
</template>
