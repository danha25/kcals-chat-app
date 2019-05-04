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
import MessageListItem from './MessageListItem.vue';

@Component({
  components: {
    MessageListItem
  }
})
export default class MessageList extends Vue {
  get channelId() {
     let urlParams = new URLSearchParams(window.location.search);
        let channel: string= urlParams.get('channelId') || "";
        console.log(channel);
        return channel;
  }
  get messages() {
    return this.$store.getters.channelMessages(this.channelId);
  }
}
</script>

<style>
</style>
