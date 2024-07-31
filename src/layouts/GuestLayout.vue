<script setup lang="ts">
const props = defineProps({
  title: {
    required: true,
    type: String
  }
})

</script>
<template>
  <div class="flex h-screen flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
             alt="Your Company"/>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {{ props.title }}
        </h2>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
