<template>
  <div class="relative flex flex-col text-sm">
    <div>
      <div>{{ label }}</div>
      <div class="join">
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', Number($event.target.value))"
          class="input text-lg input-sm join-item max-w-[45px]" />
        <button class="btn btn-square btn-sm join-item" @click.prevent="displayPresets()">+</button>
      </div>
    </div>
    <dialog :id="modal_id" class="modal z-10">
      <div class="modal-box max-w-[320px]">
        <div class="mb-1 grid grid-cols-5 gap-2">
          <div
            class="btn btn-sm btn-outline max-w-[44px] col-span-3"
          >{{ modelValue }}</div>
          <button
            class="btn btn-sm btn-outline btn-secondary max-w-[44px] whitespace-nowrap"
            @click.prevent="resetValue()"
          >➔0</button>
          <form method="dialog">
            <button class="btn btn-sm btn-outline btn-error max-w-[44px] whitespace-nowrap">✕</button>
          </form>
        </div>
        <div class="grid grid-cols-5 gap-2">
          <button v-for="n in 20" :key="n" class="btn btn-sm btn-outline btn-primary max-w-[44px]" @click.prevent="addValue(n)">+{{
            n }}</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps(['label', 'modelValue', 'tgt']);

const emit = defineEmits(['update:modelValue']);

const showPresets = ref(false);
const modal_id = ref('presets_modal_' + props.tgt);

function displayPresets() {
  document.getElementById(modal_id.value).showModal();
}

function hidePresets() {
  document.getElementById(modal_id.value).close();
}

const resetValue = () => {
  emit('update:modelValue', 0);
}

const addValue = (amount) => {
  emit('update:modelValue', props.modelValue + amount);
  hidePresets();
}
</script>