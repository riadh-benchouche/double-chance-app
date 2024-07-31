<script setup lang="ts">
import {ref, onMounted} from 'vue';

const wheelCanvas = ref<HTMLCanvasElement | null>(null);
const isSpinning = ref(false);
const rotation = ref(0);

const drawWheel = () => {
  const ctx = wheelCanvas.value?.getContext('2d');
  const sections = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6'];
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF', '#FF8333'];
  const arcSize = (2 * Math.PI) / sections.length;

  if (ctx) {
    ctx.clearRect(0, 0,
        wheelCanvas.value.width,
        wheelCanvas.value.height);

    sections.forEach((section, index) => {
      const angle = index * arcSize;
      ctx.beginPath();
      ctx.fillStyle = colors[index];
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 250, angle, angle + arcSize);
      ctx.fill();
      ctx.save();
      ctx.translate(250 + Math.cos(angle + arcSize / 2) * 200, 250 + Math.sin(angle + arcSize / 2) * 200);
      ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
      ctx.fillStyle = 'white';
      ctx.fillText(section, -ctx.measureText(section).width / 2, 0);
      ctx.restore();
    });
  }
};

const spin = () => {
  if (!isSpinning.value) {
    isSpinning.value = true;
    const randomDegree = Math.floor(Math.random() * 360) + 720; // Spin at least 2 full rotations
    rotation.value += randomDegree;

    setTimeout(() => {
      isSpinning.value = false;
    }, 5000); // Match with CSS animation duration
  }
};

onMounted(drawWheel);
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="relative">
      <canvas ref="wheelCanvas" width="500" height="500"
              :style="{ transform: `rotate(${rotation}deg)`, transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none' }"></canvas>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-white font-bold text-3xl">
          <button @click="spin"
                  class="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full">
            Spin
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  border-radius: 50%;
  border: 2px solid #333;
}
</style>
