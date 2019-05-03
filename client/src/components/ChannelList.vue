<template>
  <div class="sidebar">
    <h3>Dirrect Messages</h3>
    <!-- here v for frineds -->
    <ChannelListItem user="username"/>

    <div v-for="user in users" :key="user.id">
      <ChannelListItem :user="user"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import ChannelListItem from "./ChannelListItem.vue";

@Component({
  components: {
    ChannelListItem
  }
})
export default class ChannelList extends Vue {
  get users() {
    return this.$store.getters.users;
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
