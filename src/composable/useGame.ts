import axiosInstance from "@/utils/axiosInstance";
import {ref} from "vue";
import type {Params} from "@/types/global";

export const gameColumns = [
    {
        key: 'name',
        label: 'Nom',
    },
    {
        key: 'description',
        label: 'Description',
    },
    {
        key: 'created_at',
        label: 'Créé le',
    },
]

export function useGame() {
    const game = ref(null)
    const games = ref(null)
    const meta = ref(null)
    const loading = ref(false)

    async function fetchGames(params?: Params) {
        loading.value = true
        try {
            const response = await axiosInstance.get('/games', {params})
            games.value = response.data.data
            meta.value = response.data.meta
            loading.value = false
        } catch (error) {
            console.error(error)
            loading.value = false
        }
    }

    async function fetchGame(id: string) {
        try {
            const response = await axiosInstance.get('/games/' + id)
            game.value = response.data.data
        } catch (error) {
            console.error(error)
        }
    }

    return {
        game,
        games,
        meta,
        loading,
        fetchGames,
        fetchGame
    }
}