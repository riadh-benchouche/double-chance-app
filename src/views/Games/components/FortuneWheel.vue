<script setup lang="ts">
import { onMounted, reactive } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import type { Game } from "@/types/Game";

const state = reactive({
  game: {} as Game,
  config: {} as any,
  spinning: false,
  selectedPrize: null as any
});

onMounted(() => {
  axiosInstance.get("/games/86f7f814-5f9d-3216-aefa-ba206ce689a0").then((response) => {
    state.game = response.data.data;
    state.config = JSON.parse(state.game.config);
    console.log(state.config);
  });
});

const spinWheel = () => {
  if (state.spinning) return;

  state.spinning = true;
  const sections = state.config.wheel.sections;
  const numSections = sections.length;
  const randomIndex = Math.floor(Math.random() * numSections);
  const prize = sections[randomIndex];

  // Calculate rotation
  const degreesPerSection = 360 / numSections;
  const extraDegrees = 360 * 3; // Extra spins
  const rotation = randomIndex * degreesPerSection + extraDegrees;

  const wheel = document.getElementById("wheel");
  if (wheel) {
    wheel.style.transition = "transform 5s ease-out";
    wheel.style.transform = `rotate(${rotation}deg)`;
  }

  setTimeout(() => {
    state.selectedPrize = prize;
    state.spinning = false;
  }, 5000);
};
</script>

<template>
  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <h1 class="text-2xl font-bold mb-4">Fortune Wheel</h1>
    <div class="relative mx-auto w-64 h-64">
      <div v-if="state.config.wheel" id="wheel" class="relative w-full h-full rounded-full border-4 border-gray-700 overflow-hidden">
        <div
            v-for="(section, index) in state.config.wheel.sections"
            :key="index"
            class="absolute w-full h-full"
            :style="{
            transform: `rotate(${index * (360 / state.config.wheel.sections.length)}deg)`,
          }"
        >
          <div
              class="absolute w-full h-1/2 origin-bottom"
              :style="{
              backgroundColor: section.color,
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
            }"
          >
            <div
                class="absolute w-full h-full flex items-center justify-center"
                :style="{
                transform: `rotate(${(360 / state.config.wheel.sections.length) / 2}deg) translateY(-50%)`
              }"
            >
              <span class="text-white font-bold">{{ section.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="spinWheel" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
      Spin the Wheel
    </button>
    <div v-if="state.selectedPrize" class="mt-4">
      <p class="text-xl">You won: {{ state.selectedPrize.label }}</p>
    </div>
  </div>
</template>

<style scoped>
#wheel {
  transform-origin: center center;
  transition: transform 5s ease-out;
}
</style>
