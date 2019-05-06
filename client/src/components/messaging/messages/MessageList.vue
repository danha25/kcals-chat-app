<template>
  <div class style="max-height:100vh">
    <div v-for="message in messages" :key="message.id">
      <MessageListItem :message="message"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from "vue-property-decorator";
import MessageListItem from "./MessageListItem.vue";
import Message from 'kcals-common/lib/Message';

@Component({
  components: {
    MessageListItem
  }
})
export default class MessageList extends Vue {
  @Prop() messages!: Array<Message>;
}
</script>

<style>
</style>
