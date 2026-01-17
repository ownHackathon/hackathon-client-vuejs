<script setup>
</script>

<template>
  <div>
    <h1>Oops!</h1>
    <h2>Das ist peinlich.</h2>
    <p>Wir haben einen 404 Not Found Fehler gefunden.</p>
    <p>
      Sie suchen etwas, das es nicht gibt oder das vielleicht umgezogen ist. Sehen Sie sich einen der Links auf dieser Seite an
      oder gehen Sie zurück zur
      <router-link :to="{name: 'app_home'}">Startseite</router-link>
      .
    </p>
  </div>
</template>
