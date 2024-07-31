<script setup lang="ts">
import type {PropType} from "vue";

export interface Tab {
  name: string;
  href: string;
  current: boolean;
}

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
  currentTab: {
    type: Object as PropType<Tab>,
    required: true,
  },
});

const emit = defineEmits(['update:currentTab']);

const handleTabChange = (selectedTabName: string) => {
  const selectedTab = props.tabs.find(tab => tab.name === selectedTabName);
  if (selectedTab) {
    emit('update:currentTab', selectedTab);
  }
};
</script>

<template>
  <div class="pb-10 max-w-5xl mx-auto">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select id="tabs" name="tabs"
              class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              @change="handleTabChange($event.target.value)">
        <option v-for="tab in tabs" :key="tab.name" :value="tab.name" :selected="tab.current">{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <a v-for="tab in tabs" :key="tab.name" :href="tab.href"
           :class="[tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']"
           :aria-current="tab.current ? 'page' : undefined"
           @click.prevent="handleTabChange(tab.name)">{{ tab.name }}</a>
      </nav>
    </div>
  </div>
</template>
