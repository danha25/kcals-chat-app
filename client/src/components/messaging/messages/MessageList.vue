<template>
  <div class>
    <div v-for="message in messages" :key="message.id">
      <MessageListItem :message="message"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import MessageListItem from "./MessageListItem.vue";

@Component({
  components: {
    MessageListItem
  }
})
export default class MessageList extends Vue {
  get channelId() {
    let urlParams = new URLSearchParams(window.location.search);
    let channel: string = urlParams.get("channelId") || "";
    return channel;
  }
  get messages() {
    let urlParams = new URLSearchParams(window.location.search);
    let channelId: string = urlParams.get("channelId") || "";
    let toUserId: string = urlParams.get("toUserId") || "";
    if (channelId !== "") {
      return this.$store.getters.channelMessages(this.channelId);
    } else {
      const username: string = urlParams.get("username") || "";
      const user = this.$store.getters.user(username);
      if(!user) return new Array();
      return this.$store.getters.userMessages(user.id, toUserId);
    }
  }
}
</script>

<style>
</style>
