<script setup lang="ts">
import { computed, ref } from "vue";
import { Card, GameState as GameStateType } from "../type/game";
import { useStorage } from "@vueuse/core";
import CardComponent from "./CardComponent.vue";
import GameState from "./GameState.vue";
import ConfettiExplosion from "vue-confetti-explosion";

// const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];
const emojis = ["🐶", "🐱"];
const cards = ref<Card[]>([]);
const flippedCards = ref<Card[]>([]);
const showConfetti = ref<boolean>(false);
const bestTimeStorage = useStorage("vue-memory-game", 0);
// Initial game state value
const state = ref<GameStateType>({
  moves: 0,
  matched: 0,
  startTime: Date.now(),
  bestRecord: bestTimeStorage.value,
});

// Get the reactive value
const isGameComplete = computed(() => {
  return cards.value.every((card) => card.isMatched);
});

const initializeGame = () => {
  const shuffledCard: Card[] = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false,
      isMatched: false,
    }));
  cards.value = shuffledCard;
  flippedCards.value = [];
  state.value = {
    moves: 0,
    matched: 0,
    startTime: Date.now(),
    bestRecord: bestTimeStorage.value,
  };
};

const handleCardClick = (card: Card) => {
  if (flippedCards.value.length === 2 || card.isFlipped || card.isMatched) {
    return;
  }

  card.isFlipped = true;
  flippedCards.value.push(card);

  if (flippedCards.value.length === 2) {
    state.value.moves++;
    checkMatch();
  }
};

const checkMatch = () => {
  const [cardOne, cardTwo] = flippedCards.value;

  if (cardOne.value === cardTwo.value) {
    cardOne.isMatched = true;
    cardTwo.isMatched = true;
    state.value.matched++;
    flippedCards.value = []; // Clear the flipped card array

    // Check the game completed
    if (isGameComplete.value) {
      const currentTime = Date.now() - state.value.startTime;

      if (!state.value.bestRecord || currentTime > state.value.bestRecord) {
        bestTimeStorage.value = currentTime;
        state.value.bestRecord = currentTime;
      }
      showConfetti.value = true;
      setTimeout(() => {
        showConfetti.value = false;
      }, 3000);
    }
  } else {
    setTimeout(() => {
      cardOne.isFlipped = false;
      cardTwo.isFlipped = false;
      flippedCards.value = [];
    }, 1000);
  }
};

initializeGame();
</script>

<template>
  <div class="w-[800px]">
    <GameState :state="state" />
    <div class="grid grid-cols-5 gap-5 mt-10 w-full">
      <CardComponent
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @click="handleCardClick(card)"
      />
    </div>
    <div class="flex items-center justify-center mt-8">
      <button
        class="px-4 py-1.5 bg-emerald-600 rounded-md hover:bg-emerald-600/80 transition-colors"
        @click="initializeGame"
      >
        New Game
      </button>
    </div>
    <div class="flex items-center justify-center">
      <ConfettiExplosion
        v-if="showConfetti"
        :particleCount="200"
        :force="0.3"
      />
    </div>
  </div>
</template>
