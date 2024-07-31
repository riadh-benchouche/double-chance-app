import { defineStore } from 'pinia'
import type {Company} from "@/types/Company";
import type {Meta} from "@/types/global";
import axiosInstance from "@/utils/axiosInstance";

export const useCompanyStore = defineStore('company', {
    state: () => {
        return {
            company: {} as Company,
            companies: [] as Company[],
            meta: {} as Meta,
            loading: false,
        }
    },

    getters: {
        getCompany: (state) => state.company,
        getCompanies: (state) => state.companies,
        getMeta: (state) => state.meta,
        getLoading: (state) => state.loading,
    },

    actions: {
        async fetchCompanies(params?: any) {
            this.loading = true
            try {
                const response = await axiosInstance.get('/companies', {params})
                this.companies = response.data.data
                this.meta = response.data.meta
                this.loading = false
            } catch (error) {
                console.error(error)
                this.loading = false
            }
        },
        async fetchCompany(id: string) {
            try {
                const response = await axiosInstance.get('/companies/' + id)
                this.company = response.data.data
            } catch (error) {
                console.error(error)
            }
        }
    }

})