<template>
  <div id="app">
    <div class="container is-fullhd">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style>
@import "~bulma/css/bulma.css";
</style>
