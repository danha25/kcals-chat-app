<template>
  <div class="columns is-gapless">
    <div class="column is-2">
      <ChannelList/>
    </div>
    <div class="column is-10">
      <div class="flex-container">
        <MessageList class="flex-expand"/>
        <InputMessage class="flex-fixed" @newMessage="newMessage"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ChannelList from "./channels/ChannelList.vue";
import MessageList from "./messages/MessageList.vue";
import InputMessage from "./messages/InputMessage.vue";

import socketIO from "../../socket.io/client";
import User from "kcals-common/lib/User";

@Component({
  components: {
    ChannelList,
    MessageList,
    InputMessage
  }
})
export default class Messaging extends Vue {
   @Prop()namespace!: string

  private socketIO = new socketIO(this);

  newMessage(input: string) {
    let urlParams = new URLSearchParams(window.location.search);
    let channelId: string = urlParams.get("channelId") || "";
    let toUserId: string = urlParams.get("toUserId") || "";

    if (channelId !== "") {
      this.socketIO.newChannelMessage(this.user.id, channelId, input);
    } else {
      this.socketIO.newDirectMessage(this.user.id, toUserId, input);
    }
  }

  get user(): User {
    let urlParams = new URLSearchParams(window.location.search);
    const username: string = urlParams.get("username") || "";
    return this.$store.getters.user(username);
  }
}
</script>

<style>
@import "~bulma/css/bulma.css";
.flex-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-flow: column nowrap;
}
.flex-a {
  display: flex;
  flex-flow: column nowrap;
}
.flex-expand {
  flex: auto;
  overflow-y: scroll;
}
.flex-fixed {
  flex: none;
}
</style>
