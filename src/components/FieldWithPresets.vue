<template>
  <div class="relative flex flex-col text-sm">
    <label>
      <div>{{ label }}</div>
      <input
        type="number"
        :value="modelValue"
        @focus="togglePresets"
        @input="$emit('update:modelValue', Number($event.target.value))"
        class="fwp-input bg-gray-200 text-black rounded-md px-2 py-1 w-[100px] font-sans text-sm"
      />
    </label>
    <div
      v-if="showPresets"
      class="absolute top-full left-0 mt-1 bg-white text-black rounded shadow-lg z-10 p-1 min-w-[350px]"
    >
      <div class="grid grid-cols-5 gap-1">
        <button
          class="btn btn-sm btn-soft btn-secondary"
          @click.prevent="resetValue()"
        >
        x
        </button>
        <button
          v-for="n in 49"
          :key="n"
          class="btn btn-sm btn-outline btn-primary"
          @click.prevent="addValue(n+1)"
        >+{{ n+1 }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps(['label', 'modelValue']);

const emit = defineEmits(['update:modelValue']);

const showPresets = ref(false);

function togglePresets() {
  showPresets.value = true;
}

function hidePresets() {
  showPresets.value = false;
}

const resetValue = () => {
  emit('update:modelValue', 0);
}

const addValue = (amount) => {
  emit('update:modelValue', props.modelValue + amount);
}

function handleClickOutside(event) {
  if (!event.target.closest('.fwp-input')) {
    hidePresets();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
