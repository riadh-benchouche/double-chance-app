<script setup lang="ts">
import {onMounted, reactive} from "vue";
// Components
import AuthLayout from "@/layouts/AuthLayout.vue";
import VTable from "@/components/VTable.vue";
import VPaginate from "@/components/VPaginate.vue";
import VDrawer from "@/components/VDrawer.vue";
import VLoader from "@/components/VLoader.vue";
import type {Params} from "@/types/global";
import {userColumns, useUser} from "@/composable/useUser";
import UserForm from "@/views/Users/UserForm.vue";

const userStore = useUser()

const state = reactive({
  open: false,
  selectedId: undefined as string | undefined,
})

onMounted(async () => {
  await userStore.fetchUsers()
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
  await userStore.fetchUsers()
}

const changePage = (page: number) => {
  const params: Params = {
    page: page,
  };
  userStore.fetchUsers(params)
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
        :title="state.selectedId ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'"
    >
      <UserForm
          :id="state.selectedId"
          @closeDrawer="closeDrawer"
      />
    </VDrawer>
    <VLoader v-if="userStore.loading.value"/>
    <div v-else>
      <VTable title="Utilisateurs"
              button-title="Ajouter un utilisateur"
              :rows="userStore.users.value"
              :columns="userColumns"
              description="Liste des utilisateurs avec leurs informations et leurs rôles."
              @openDrawer="openDrawer"
      />
      <VPaginate v-if="userStore.meta.value"
                 :meta="userStore.meta.value" @changePage="changePage"/>
    </div>
  </AuthLayout>
</template>