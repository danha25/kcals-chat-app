<template>
  <div id="app">
    <div class="container is-fullhd">
      <div class="columns">
        <div class="column is-2">
          <ChannelList />
        </div>
        <div class="column is-10">
          <h2>Messages</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelList from "./components/ChannelList.vue";
import socketIO from './socket.io/client';

@Component({
  components: {
    ChannelList
  }
})
export default class App extends Vue {

  socketIO = new socketIO(this);
}
</script>

<style>
@import "~bulma/css/bulma.css";
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
