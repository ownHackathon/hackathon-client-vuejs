<template>
  <main class="flex-grow-1 flex flex-column overflow-auto p-1">
    <!-- min-h-screen und flex zum Zentrieren der gesamten Box -->
    <div class="flex-grow-1 flex flex-column surface-0 dark:surface-900 h-full flex align-items-center justify-content-center p-4 overflow-hidden">

      <!-- Hauptcontainer: Volle Breite (w-full) und vertikale Ausrichtung (flex-column) -->
      <div class="flex flex-column w-full uppercase font-black italic">

        <!-- 1. Wort: Ganz links -->
        <div class="w-full text-left">
          <h1 class="staircase-text m-0">
            Wir
          </h1>
        </div>

        <!-- 2. Wort: Mitte (Primary Color vom PrimeVue Theme) -->
        <div class="w-full text-center text-primary">
          <h1 class="staircase-text m-0">
            erschaffen
          </h1>
        </div>

        <!-- 3. Wort: Ganz rechts -->
        <div class="w-full text-right text-900 dark:text-0">
          <h1 class="staircase-text m-0">
            Möglichkeiten
          </h1>
        </div>

      </div>
    </div>
  </main>
</template>
