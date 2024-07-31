import {ref} from "vue";
import type {Company} from "@/types/Company";
import axiosInstance from "@/utils/axiosInstance";
import type {Params} from "@/types/global";

export const companyColumns = [
    {
        key: 'name',
        label: 'Nom',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'phone',
        label: 'Téléphone',
    },
    {
        key: 'status',
        label: 'Statut',
    },
]

export function useCompany() {
    const company = ref<Company | null>(null);
    const companies = ref<Company[] | null>(null);
    const meta = ref(null);
    const loading = ref(false);

    async function fetchCompanies(params?: Params) {
        loading.value = true;
        try {
            const response = await axiosInstance.get('/companies', {params});
            companies.value = response.data.data
            meta.value = response.data.meta
            loading.value = false;
        } catch (error) {
            console.error(error);
            loading.value = false;
        }
    }

    async function fetchCompany(id: string) {
        try {
            const response = await axiosInstance.get('/companies/' + id);
            company.value = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        company,
        companies,
        meta,
        loading,
        fetchCompanies,
        fetchCompany,
    };
}