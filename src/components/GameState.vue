<script setup lang="ts">
import { computed } from "vue";
import { GameState } from "../type/game";

const props = defineProps<{
  state: GameState;
}>();

const elapsedTime = computed(() => {
  const second = Math.floor((Date.now() - props.state.startTime) / 1000);
  return `${Math.floor(second / 60)}:${(second % 60)
    .toString()
    .padStart(2, "0")}`;
});

const formatTime = (ms: number) => {
  const second = Math.floor(ms / 1000);
  return `${Math.floor(second / 60)}:${(second % 60)
    .toString()
    .padStart(2, "0")}`;
};
</script>

<template>
  <div class="grid grid-cols-4 gap-4 text-center mt-5">
    <div class="bg-neutral-800 shadow-md p-2 rounded-xl">
      <h3 class="text-lg font-medium">Moves</h3>
      <p class="text-2xl text-emerald-600">{{ state.moves }}</p>
    </div>
    <div class="bg-neutral-800 shadow-md p-2 rounded-xl">
      <h3 class="text-lg font-medium">Matches</h3>
      <p class="text-2xl text-emerald-600">{{ state.matched }}</p>
    </div>
    <div class="bg-neutral-800 shadow-md p-2 rounded-xl">
      <h3 class="text-lg font-medium">Time</h3>
      <p class="text-2xl text-emerald-600">{{ elapsedTime }}</p>
    </div>
    <div class="bg-neutral-800 shadow-md p-2 rounded-xl">
      <h3 class="text-lg font-medium">Best Time</h3>
      <p class="text-2xl text-emerald-600">
        {{ state.bestRecord ? formatTime(state.bestRecord) : "--:--" }}
      </p>
    </div>
  </div>
</template>
