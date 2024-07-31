<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {companyColumns, useCompany} from "@/composable/useCompany";
import type {Params} from "@/types/global";
// Components
import AuthLayout from "@/layouts/AuthLayout.vue";
import VTable from "@/components/VTable.vue";
import VPaginate from "@/components/VPaginate.vue";
import VDrawer from "@/components/VDrawer.vue";
import VLoader from "@/components/VLoader.vue";
import CompanyForm from "@/views/Companies/CompanyForm.vue";


const companyStore = useCompany()
const router = useRouter()

const state = reactive({
  open: false,
  selectedId: undefined as string | undefined,
})

onMounted(async () => {
  await companyStore.fetchCompanies()
})

const openDrawer = (event?: any) => {
  if (event) {
    state.selectedId = event.id
  }
  state.open = true
}

const closeDrawer = async () => {
  state.open = false
  state.selectedId = undefined
  await companyStore.fetchCompanies()
}

const changePage = (page: number) => {
  const params: Params = {
    page: page,
  };
  companyStore.fetchCompanies(params)
}
</script>

<template>
  <AuthLayout>
    <VDrawer
        :open="state.open"
        :setOpen="() => {
          state.open = !state.open
          state.selectedId = undefined
        }"
        :title="state.selectedId ? 'Modifier une entreprise' : 'Ajouter une entreprise'"
    >
      <CompanyForm
          :id="state.selectedId"
          @closeDrawer="closeDrawer"
      />
    </VDrawer>
    <VLoader v-if="companyStore.loading.value"/>
    <div v-else>
      <VTable title="Entreprises"
              button-title="Ajouter une entreprise"
              :rows="companyStore.companies.value"
              :columns="companyColumns"
              description="Liste des entreprises enregistrées"
              @openDrawer="openDrawer"
              @deleteRow="(event) => console.log(event)"
              @seeDetails="(event) => router.push({name: 'CompanyDetails', params: {id: event.id}})"
      />
      <VPaginate v-if="companyStore.meta.value"
                 :meta="companyStore.meta.value" @changePage="changePage"/>
    </div>
  </AuthLayout>
</template>