<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';

const wheelCanvas = ref<HTMLCanvasElement | null>(null);
const isSpinning = ref(false);
const rotation = ref(0);
const canvasSize = ref(500); // Utiliser une taille dynamique

const sections = [
  {label: '20% de réduction', color: 'lightskyblue'},
  {label: 'Dessert offert', color: '#000000'},
  {label: 'Perdu', color: 'lightskyblue'},
  {label: '10% de réduction', color: '#000000'},
  {label: 'Boisson offerte', color: 'lightskyblue'},
  {label: 'Perdu', color: '#000000'}
];
const arcSize = (2 * Math.PI) / sections.length;

const drawWheel = () => {
  const ctx = wheelCanvas.value?.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  if (wheelCanvas.value && ctx) {
    // Ajuster le canevas pour le DPR
    wheelCanvas.value.width = canvasSize.value * dpr;
    wheelCanvas.value.height = canvasSize.value * dpr;
    ctx.scale(dpr, dpr);

    // Positionner le canevas dans sa taille d'affichage
    wheelCanvas.value.style.width = `${canvasSize.value}px`;
    wheelCanvas.value.style.height = `${canvasSize.value}px`;

    ctx.clearRect(0, 0, canvasSize.value, canvasSize.value);

    // Dessiner les sections de la roue
    sections.forEach((section, index) => {
      const angle = index * arcSize;
      ctx.beginPath();
      ctx.fillStyle = section.color;
      ctx.moveTo(canvasSize.value / 2, canvasSize.value / 2);
      ctx.arc(canvasSize.value / 2, canvasSize.value / 2, canvasSize.value / 2, angle, angle + arcSize);
      ctx.fill();

      // Dessiner la bordure entre les sections
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.save();

      // Positionnement du texte dans chaque section
      ctx.translate(
          canvasSize.value / 2 + Math.cos(angle + arcSize / 2) * (canvasSize.value / 2.8),
          canvasSize.value / 2 + Math.sin(angle + arcSize / 2) * (canvasSize.value / 2.8)
      );
      ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
      ctx.fillStyle = 'white';
      ctx.font = `${Math.floor(canvasSize.value / 25)}px Arial`;
      ctx.fillText(section.label, -ctx.measureText(section.label).width / 2, 0);
      ctx.restore();
    });

    // Dessiner la bordure extérieure
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvasSize.value / 2, canvasSize.value / 2, canvasSize.value / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();
  }
};

const spin = () => {
  if (!isSpinning.value) {
    isSpinning.value = true;
    const randomDegree = Math.floor(Math.random() * 360) + 720; // Au moins 2 rotations complètes
    rotation.value += randomDegree;

    setTimeout(() => {
      isSpinning.value = false;
    }, 5000); // Durée de l'animation CSS
  }
};

// Fonction pour ajuster la taille de la roue en fonction de la largeur de l'écran
const updateCanvasSize = () => {
  canvasSize.value = window.innerWidth < 500 ? window.innerWidth * 0.9 : 500;
  drawWheel();
};

onMounted(() => {
  updateCanvasSize();
  window.addEventListener('resize', updateCanvasSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCanvasSize);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen mx-auto w-screen">
    <div class="relative">
      <canvas ref="wheelCanvas"
              :style="{ transform: `rotate(${rotation}deg)`, transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none' }"></canvas>

      <!-- Indicateur de pointage repositionné -->
      <div class="absolute top-1/2 left-[-30px] transform -translate-y-1/2">
        <div
            class="w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[30px] border-l-red-500"></div>
      </div>
    </div>

    <!-- Bouton pour faire tourner la roue -->
    <button @click="spin"
            class="mt-4 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full text-lg">
      Jouer la partie
    </button>
  </div>
</template>

<style scoped>
canvas {
  border-radius: 50%;
  border: 4px solid lightskyblue;
}
</style>
