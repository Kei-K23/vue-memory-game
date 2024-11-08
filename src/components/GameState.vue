<script setup lang="ts">
import { computed, onUnmounted, ref, watchEffect } from "vue";
import { GameState } from "../type/game";

const props = defineProps<{
  state: GameState;
  isGameStarted: boolean;
  isGameCompleted: boolean;
}>();

const currentTime = ref(Date.now());
let timer: number | undefined;

watchEffect(() => {
  if (!props.isGameCompleted && props.isGameStarted) {
    timer = setInterval(() => {
      currentTime.value = Date.now();
    }, 1000);
  } else if (props.isGameCompleted && timer) {
    clearInterval(timer);
  }
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

const elapsedTime = computed(() => {
  if (!props.isGameStarted) return "0:00";
  const seconds = Math.floor(
    (currentTime.value - props.state.startTime) / 1000
  );
  return `${Math.floor(seconds / 60)}:${(seconds % 60)
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
    <div class="bg-neutral-800 shadow-md p-1 md:p-2 rounded-xl">
      <h3 class="text-sm md:text-lg md:font-medium">Moves</h3>
      <p class="text-[15px] md:text-2xl text-emerald-600">{{ state.moves }}</p>
    </div>
    <div class="bg-neutral-800 shadow-md p-1 md:p-2 rounded-xl">
      <h3 class="text-sm md:text-lg md:font-medium">Matches</h3>
      <p class="text-[15px] md:text-2xl text-emerald-600">
        {{ state.matched }}
      </p>
    </div>
    <div class="bg-neutral-800 shadow-md p-1 md:p-2 rounded-xl">
      <h3 class="text-sm md:text-lg md:font-medium">Times</h3>
      <p class="text-[15px] md:text-2xl text-emerald-600">{{ elapsedTime }}</p>
    </div>
    <div class="bg-neutral-800 shadow-md p-1 md:p-2 rounded-xl">
      <h3 class="text-sm md:text-lg md:font-medium">Best Time</h3>
      <p class="text-[15px] md:text-2xl text-emerald-600">
        {{ state.bestRecord ? formatTime(state.bestRecord) : "--:--" }}
      </p>
    </div>
  </div>
</template>
