<template>
  <div id="app" class="full-height">
    <div class="container is-fullhd" style="height:100%">
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
html, body{
    height: 100%;
    margin:0;
    padding:0;
}
.full-height{
  height: 100%;
}
@import "~bulma/css/bulma.css";
</style>
