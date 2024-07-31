<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps({
  label: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  inputType: {
    type: String as any,
    default: 'text'
  },
  modelValue: {
    required: true,
    type: String,
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  classes: {
    type: String,
    default: ''
  },
  validation: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <FormKit
      :type="inputType"
      :label="label"
      :name="name"
      v-model="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :classes="{
          label:'block text-sm font-medium leading-6 text-gray-900',
          input:'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          messages : 'px-1 pt-2',
          message : 'block text-sm text-red-600'
      }"
      :validation="validation"
  />
</template>
