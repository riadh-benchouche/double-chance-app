<script setup lang="ts">
import type {Company} from "@/types/Company";
import type {PropType} from "vue";
import {getStatusClass, getStatusText} from "@/utils/globalHelpers";

defineProps({
  company: {
    type: Object as PropType<Company>,
    required: true,
  },
})

</script>

<template>
  <dl v-for="key in Object.keys(company)"
      class="divide-y divide-gray-100"
      :key="key"
  >
    <div v-if="key !== 'id' && key !== 'admin_id'"
         class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-900">{{ key }}</dt>
      <dd v-if="key === 'admin'"
          class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {{ company.admin.profile.full_name }}
      </dd>
      <dd v-else-if="key === 'status'"
          class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span
                  :class="getStatusClass(company.status)">
                {{ getStatusText(company.status) }}
              </span>
      </dd>
      <dd v-else
          class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {{ company[key as keyof Company] }}
      </dd>
    </div>
  </dl>
</template>