<script setup lang="ts">
import {onMounted, ref} from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import {useCompany} from "@/composable/useCompany";
import VTab, {type Tab} from "@/components/VTab.vue";
import {useRouter} from "vue-router";
import CompanyInformation from "@/views/Companies/Components/CompanyInformation.vue";
import FortuneWheel from "@/views/Games/components/FortuneWheel.vue";

const companyStore = useCompany()
const router = useRouter()
const tabs = ref<Tab[]>([
  {name: 'Information', href: '#info', current: true},
  {name: 'Jeux', href: '#games', current: false},
  {name: 'Utilisateurs', href: '#users', current: false},
])
const currentTab = ref(tabs.value[0]);

onMounted(async () => {
  const id = router.currentRoute.value.params.id
  await companyStore.fetchCompany(id as string)
  const hash = router.currentRoute.value.hash
  if (hash) {
    const tab = tabs.value.find(tab => tab.href === hash)
    if (tab) {
      updateCurrentTab(tab)
    }
  }
})
const updateCurrentTab = (newTab: Tab) => {
  tabs.value.forEach(tab => {
    tab.current = tab.name === newTab.name;
  });
  currentTab.value = newTab;
  router.push({hash: newTab.href});
};
</script>

<template>
  <AuthLayout>
    <VTab :tabs="tabs" :currentTab="currentTab" @update:currentTab="updateCurrentTab"/>
    <div class="max-w-5xl overflow-hidden bg-white shadow sm:rounded-lg mx-auto">
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base font-semibold leading-7 text-gray-900">{{ currentTab.name }}</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ currentTab.name }} de l'entreprise</p>
      </div>
      <div
          v-if="currentTab.href === '#info' && companyStore.company.value"
          class=" border-t border-gray-100">
        <CompanyInformation :company="companyStore.company.value"/>
      </div>
      <div
          v-if="currentTab.href === '#games'"
          class=" border-t border-gray-100">
        <FortuneWheel/>
      </div>
      <div
          v-if="currentTab.href === '#users'"
          class=" border-t border-gray-100">
        <h1>Tableau des utilisateurs</h1>
      </div>
    </div>
  </AuthLayout>
</template>