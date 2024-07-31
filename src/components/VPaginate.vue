<script setup lang="ts">
import {ArrowLongLeftIcon, ArrowLongRightIcon} from '@heroicons/vue/20/solid'
import type {Meta} from "@/types/global";

defineProps({
  meta: {
    type: Object as () => Meta,
    required: true,
  }
})

const emit = defineEmits(['changePage'])

const changePage = (page: number | null) => {
  if (page) {
    emit('changePage', page)
  }
}
</script>

<template>
  <nav class="flex items-center justify-between px-10 mt-6">
    <div class="-mt-px flex w-0 flex-1">
      <button
          v-if="meta?.current_page > 1"
          @click="changePage(meta?.current_page - 1)"
          class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
        Précédent
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <button
          v-for="link in meta?.last_page"
          :key="link"
          @click="changePage(link)"
          v-html="link"
          :class="[
          'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
          link === meta?.current_page ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        ]">
      </button>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
          v-if="meta?.current_page < meta?.last_page"
          @click="changePage(meta?.current_page + 1)"
          class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        Prochain
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
      </button>
    </div>
  </nav>
</template>
