<template>
  <div class>
     <div v-for="message in messages">  <!--:key="user.id" -->
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
  get messages() {
    return this.$store.getters.getMessages;
  }
}
</script>

<style>
</style>
