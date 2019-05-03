<template>
  <div id="app">
    <div class="container is-fullhd">
      <div class="columns is-gapless">
        <div class="column is-2">
          <ChannelList/>
        </div>
        <div class="column is-10">
          <div class="flex-container">
            <MessageList class="flex-expand"/>
            <InputMessage class="flex-fixed"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelList from "./components/ChannelList.vue";
import MessageList from "./components/MessageList.vue";
import InputMessage from "./components/InputMessage.vue";

import socketIO from "./socket.io/client";

@Component({
  components: {
    ChannelList,
    MessageList,
    InputMessage
  }
})
export default class App extends Vue {
  socketIO = new socketIO(this);
}
</script>

<style>
@import "~bulma/css/bulma.css";
.flex-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.flex-expand {
  flex: auto;
  overflow-y: scroll;
}
.flex-fixed {
  flex: none;
}
</style>
