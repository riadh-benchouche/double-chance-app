<script setup lang="ts">
import {onMounted, reactive} from "vue";
// Components
import AuthLayout from "@/layouts/AuthLayout.vue";
import VTable from "@/components/VTable.vue";
import VPaginate from "@/components/VPaginate.vue";
import VDrawer from "@/components/VDrawer.vue";
import VLoader from "@/components/VLoader.vue";
import type {Params} from "@/types/global";
import {gameColumns, useGame} from "@/composable/useGame";
import GameForm from "@/views/Games/GameForm.vue";

const gameStore = useGame()

const state = reactive({
  open: false,
  selectedId: undefined as string | undefined,
})

onMounted(async () => {
  await gameStore.fetchGames()
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
  await gameStore.fetchGames()
}

const changePage = (page: number) => {
  const params: Params = {
    page: page,
  };
  gameStore.fetchGames(params)
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
        :title="state.selectedId ? 'Modifier un jeu' : 'Ajouter un jeu'"
    >
      <GameForm
          :id="state.selectedId"
          @closeDrawer="closeDrawer"
      />
    </VDrawer>
    <VLoader v-if="gameStore.loading.value"/>
    <div v-else>
      <VTable title="Jeux"
              button-title="Ajouter un jeu"
              :rows="gameStore.games.value"
              :columns="gameColumns"
              description="Liste des jeux disponibles dans la base de données"
              @openDrawer="openDrawer"
      />
      <VPaginate v-if="gameStore.meta.value"
                 :meta="gameStore.meta.value" @changePage="changePage"/>
    </div>
  </AuthLayout>
</template>