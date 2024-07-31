<script setup lang="ts">
import type {PropType} from "vue";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {DocumentMagnifyingGlassIcon, EllipsisVerticalIcon, TrashIcon, PencilIcon} from '@heroicons/vue/20/solid'
import {getNestedValue, getRoleClass, getRoleName, getStatusClass, getStatusText} from "@/utils/globalHelpers";
import dateFormatter from "../utils/dateFormatter";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  columns: {
    type: Array as PropType<{ key: string, label: string }[]> | any,
    required: true,
  },
  rows: {
    type: Array as PropType<{ [key: string]: string }[]> | any,
    required: true,
  },
  buttonTitle: {
    type: String,
    required: true,
  },
})

defineEmits(['openDrawer', 'seeDetails', 'deleteRow'])

</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">{{ title }}</h1>
        <p class="mt-2 text-sm text-gray-700">{{ description }}</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button"
                @click="$emit('openDrawer')"
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {{ buttonTitle }}
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg min-h-[538px]">
            <table class="min-w-full divide-y divide-gray-300 overflow-x-auto">
              <thead class="bg-gray-50">
              <tr>
                <th v-for="column in columns" :key="column"
                    scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  {{ column.label }}
                </th>
                <th scope="col" class="relative py-3.5 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="row in rows" :key="row.id">
                <td v-for="column in columns" :key="column">
                  <span v-if="column.key === 'status'"
                        :class="getStatusClass(getNestedValue(row, column.key))">
                        {{ getStatusText(row[column.key]) }}
                  </span>

                  <span v-else-if="column.key === 'roles'"
                        :class="getRoleClass(row[column.key])">
                    {{ getRoleName(row[column.key]) }}
                  </span>

                  <span v-else-if="column.key === 'created_at' || column.key === 'updated_at'"
                        class="py-3.5 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                    {{ dateFormatter(row[column.key]) }}
                  </span>

                  <span v-else class="py-3.5 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                    {{ getNestedValue(row, column.key) }}
                  </span>
                </td>
                <td class="py-3.5 pr-4 text-right text-sm font-medium">
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                        <span class="sr-only">Open options</span>
                        <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true"/>
                      </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                      <MenuItems
                          class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                            <button
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm w-full']"
                                @click="$emit('openDrawer', row)">
                              <PencilIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                              <span>Modifier</span>
                            </button>
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                            <button
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm w-full']"
                                @click="$emit('seeDetails', row)"
                            >
                              <DocumentMagnifyingGlassIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                              <span>Détail</span>
                            </button>
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                            <button
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm w-full']"
                                @click="$emit('deleteRow', row)"
                            >
                              <TrashIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                              <span>Supprimer</span>
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>