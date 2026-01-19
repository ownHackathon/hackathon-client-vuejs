<template>
  <main class="flex-grow-1 flex flex-column overflow-auto p-1">
    <!-- min-h-screen und flex zum Zentrieren der gesamten Box -->
    <div class="flex-grow-1 flex flex-column surface-0 dark:surface-900 h-full flex align-items-center justify-content-center p-4 overflow-hidden">

      <!-- Hauptcontainer: Volle Breite (w-full) und vertikale Ausrichtung (flex-column) -->
      <div class="flex flex-column w-full max-w-custom uppercase font-black italic">

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

<script setup>

</script>

<style scoped>
/* Eigene Klasse für den responsiven Treppen-Effekt */
.staircase-text {
  /* Fluid Typography:
     3.2rem = Mindestgröße für Handy (ca. 51px), damit 'Möglichkeiten' nicht bricht.
     12vw   = Skaliert perfekt mit der Breite des Browsers.
     20rem  = Maximale Größe für 4K-Monitore (ca. 320px).
  */
  font-size: clamp(1.0rem, 10vw, 20rem);

  /* Zeilenhöhe reduzieren für den kompakten Treppeneffekt */
  line-height: 0.85;

  /* Enger zusammenstehende Buchstaben (typisch für dieses Design) */
  letter-spacing: -0.05em;
}

/* Begrenzung der maximalen Breite auf sehr großen Bildschirmen,
   damit die Treppe nicht zu weit auseinanderreißt */
.max-w-custom {
  max-width: 1800px;
}

/* Sicherstellen, dass h1 sauber gerendert wird */
h1 {
  display: block;
  font-family: inherit;
}
</style>
