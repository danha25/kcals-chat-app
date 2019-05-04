<template>
  <div class="columns">
    <div class="column is-12">
      <input
        id="message"
        class="input"
        type="text"
        v-model="input"
        placeholder="Message"
        autocomplete="off"
        @keyup.enter="monitorEnterKey"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InputMessage extends Vue {
  input: string = '';

  monitorEnterKey() {
    this.$emit('newMessage', this.input);
    this.input = '';
  }
}
</script>
