<script setup lang="ts">
import {onMounted, reactive} from "vue";
import AxiosInstance from "@/utils/axiosInstance";
import type {Company} from "@/types/Company";
import VInput from "@/components/VInput.vue";
import type {UserProfile} from "@/types/UserProfile";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
})

const state = reactive({
  company: {} as Company,
  users: [] as UserProfile[],
})

const fetchCompany = async (id: string) => {
  await AxiosInstance.get(`/companies/${id}`)
      .then(response => {
        state.company = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
}

const fetchUsers = async () => {
  await AxiosInstance.get('/users')
      .then(response => {
        // transform data to match the options format

        state.users = response.data.data.map((user: UserProfile) => {
          return {
            label: `${user.profile.first_name} ${user.profile.last_name}`,
            value: user.id,
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
}


onMounted(() => {
  if (props.id) {
    fetchCompany(props.id)
  }
  fetchUsers()
})

const emit = defineEmits(['closeDrawer'])
const submit = async () => {
  if (props.id) {
    await AxiosInstance.put(`/companies/${props.id}`, state.company)
        .then(() => {
          emit('closeDrawer')
        })
        .catch(error => {
          console.log(error)
        })
  } else {
    await AxiosInstance.post('/companies', state.company)
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
        v-model="state.company.name"
        type="text"
        name="name"
        label="Nom de l'entreprise"
        placeholder="Nom de l'entreprise"
        validation="required|min:3"
    />
    <VInput
        v-model="state.company.admin_id"
        type="select"
        name="admin_id"
        label="Administrateur"
        placeholder="Administrateur de l'entreprise"
        :options="state.users"
    />
    <VInput
        v-model="state.company.phone"
        type="text"
        name="phone"
        label="Téléphone"
        placeholder="Numéro de téléphone"
        validation="required|phone"
    />
    <VInput
        v-model="state.company.website"
        type="url"
        name="website"
        label="Site web"
        placeholder="https://www.exemple.com"
    />
    <VInput
        v-model="state.company.address"
        type="text"
        name="address"
        label="Adresse"
        placeholder="Adresse de l'entreprise"
    />
    <VInput
        v-model="state.company.email"
        type="email"
        name="email"
        label="Email"
        placeholder="example@entreprise.com"
        validation="required|email"
    />
    <VInput
        v-model="state.company.facebook"
        type="url"
        name="facebook"
        label="Facebook"
        placeholder="Lien du profil Facebook"
    />
    <VInput
        v-model="state.company.twitter"
        type="url"
        name="twitter"
        label="Twitter"
        placeholder="Lien du profil Twitter"
    />
    <VInput
        v-model="state.company.linkedin"
        type="url"
        name="linkedin"
        label="LinkedIn"
        placeholder="Lien du profil LinkedIn"
    />
    <VInput
        v-model="state.company.instagram"
        type="url"
        name="instagram"
        label="Instagram"
        placeholder="Lien du profil Instagram"
    />
    <VInput
        v-model="state.company.youtube"
        type="url"
        name="youtube"
        label="YouTube"
        placeholder="Lien de la chaîne YouTube"
    />
    <VInput
        v-model="state.company.description"
        type="textarea"
        name="description"
        label="Description"
        placeholder="Description de l'entreprise"
    />
    <VInput
        v-model="state.company.status"
        type="select"
        name="status"
        label="Statut"
        placeholder="Statut de l'entreprise"
        :options="[
          { label: 'Active', value: 1},
          { label: 'Inactive', value: 2}
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