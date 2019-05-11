<template>
  <div class="columns is-gapless full-height">
    <div class="column is-2">
      <ChannelList/>
    </div>
    <div class="column is-10 full-height">
      <div class="flex-container">
        <MessageList class="flex-expand" :messages="messages"/>
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
import Message from "kcals-common/lib/Message";
import User from "kcals-common/lib/User";

const CHANNEL_MESSAGE: string = "channel";
const DIRECT_MESSAGE: string = "direct";

@Component({
  components: {
    ChannelList,
    MessageList,
    InputMessage
  }
})
export default class Messaging extends Vue {
  @Prop() namespace!: number;
  @Prop() type!: string; //channels or messages
  @Prop() id!: number;

  private socketIO = new socketIO(this);

  get messages(): Array<Message> {
    if (this.type === CHANNEL_MESSAGE) {
      return this.$store.getters.channelMessages(this.id);
    } else {
      return this.$store.getters.userMessages(this.user.id, this.id);
    }
  }

  newMessage(input: string) {
    if (this.type === CHANNEL_MESSAGE) {
      this.socketIO.newChannelMessage(this.user.id, this.id, input);
    } else if (this.type === DIRECT_MESSAGE) {
      this.socketIO.newDirectMessage(this.user.id, this.id, input);
    }
  }

  get user(): User {
    const username = localStorage.getItem("username");
    return this.$store.getters.user(username);
  }
}
</script>

<style>
.flex-container {
  height: 100%;
  display: flex;
  flex-direction: column;
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
