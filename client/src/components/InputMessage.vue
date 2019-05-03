<template>
  <div class="columns is-gapless">
    <div class="column is-11">
      <input id="message" class="input" type="text" placeholder="Message">
    </div>
    <div class="column">
      <button id="btn-send" class="button">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InputMessage extends Vue {}
</script>

<style>
.button{
    width: 100%;
}
</style>
