<template>
  <div class="sidebar">
    <h3>Channels</h3>
    <div v-for="channel in channels" :key="channel.name">
      <ChannelListItem :channel="channel"/>
    </div>

    <h3>Dirrect Messages</h3>
    <div v-for="user in users" :key="user.username">
      <ChannelListUser :user="user"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import ChannelListItem from "./ChannelListItem.vue";
import ChannelListUser from './ChannelListUser.vue';

@Component({
  components: {
    ChannelListItem,
    ChannelListUser
  }
})
export default class ChannelList extends Vue {
  get users() {
    return this.$store.getters.users;
  }
  get channels() {
    return this.$store.getters.channels;
  }
}
</script>

<style>
.sidebar {
  min-height: 100vh;
  background-color: #4a144b;
  color: azure;
}
</style>
