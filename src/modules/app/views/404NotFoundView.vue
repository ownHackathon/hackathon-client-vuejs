<script setup>
// Falls du PrimeVue Buttons nutzt, stelle sicher, dass Button importiert ist oder global registriert wurde.
</script>

<template>
  <main class="flex-grow-1 flex flex-column overflow-auto p-1">
    <!-- Zentraler Container analog zur Referenz -->
    <div class="flex-grow-1 flex flex-column surface-0 dark:surface-900 h-full flex align-items-center justify-content-center p-4 overflow-hidden">

      <div class="flex flex-column w-full max-w-7xl">

        <!-- Die "Staircase" Headline: Professionalität durch Wucht, Witz durch den Inhalt -->
        <div class="flex flex-column w-full uppercase font-black italic">
          <!-- 1. Wort: Ganz links -->
          <div class="w-full text-left">
            <h1 class="staircase-text m-0">
              Seite
            </h1>
          </div>

          <!-- 2. Wort: Mitte (Primary Color für den Fokus) -->
          <div class="w-full text-center text-primary">
            <h1 class="staircase-text m-0">
              Nicht
            </h1>
          </div>

          <!-- 3. Wort: Ganz rechts -->
          <div class="w-full text-right text-900 dark:text-0">
            <h1 class="staircase-text m-0">
              Gefunden
            </h1>
          </div>
        </div>

        <!-- Infotext & CTA: Hier bringen wir die seriöse Note rein -->
        <div class="mt-6 flex flex-column align-items-center text-center">
          <p class="text-xl md:text-2xl text-700 dark:text-300 max-w-30rem line-height-3">
            Eigentlich sind wir für unsere Präzision bekannt. Dass dieser Pfad ins Leere führt,
            ist uns fast ein wenig unangenehm. Lassen Sie uns diesen Umweg gemeinsam beenden.
          </p>

          <div class="flex flex-wrap gap-3 mt-4">
            <!-- Router-Link als Button gestylt für professionellen Look -->
            <router-link :to="{name: 'app_home'}" class="no-underline">
              <button class="p-button p-component p-button-raised p-button-primary font-bold uppercase p-3 px-6 cursor-pointer">
                <span class="p-button-label">Zurück zur Startseite</span>
              </button>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
/*
   Falls staircase-text noch nicht global definiert ist,
   hier eine Orientierung für die Größe
*/
.staircase-text {
  font-size: clamp(3rem, 12vw, 10rem); /* Dynamische Größe je nach Bildschirm */
  line-height: 0.9;
  letter-spacing: -0.05em;
}
</style>
