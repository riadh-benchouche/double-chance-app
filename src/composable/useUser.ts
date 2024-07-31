import type {UserProfile} from "@/types/UserProfile";
import {ref} from "vue";
import axiosInstance from "@/utils/axiosInstance";
import type {Params} from "@/types/global";

export const userColumns = [
    {
        key: 'profile.full_name',
        label: 'Nom',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'status',
        label: 'Statut',
    },
    {
        key: 'roles',
        label: 'Rôles',
    },
]

export function useUser() {
    const user = ref<UserProfile | null>(null);
    const users = ref<UserProfile[] | null>(null);
    const meta = ref(null);
    const loading = ref(false);

    async function fetchUsers(params?: Params) {
        loading.value = true;
        try {
            const response = await axiosInstance.get('/users', {params});
            users.value = response.data.data
            meta.value = response.data.meta
            loading.value = false;
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchUser(id: string) {
        try {
            const response = await axiosInstance.get('/users/' + id);
            user.value = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        user,
        users,
        meta,
        loading,
        fetchUsers,
        fetchUser,
    };
}