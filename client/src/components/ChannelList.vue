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
import socketIO from 'socket.io-client';
import User from '../../node_modules/kcals-common/User';
// emit
const EVENT_LOGIN: string = 'login';

//listen
const EVENT_UPDATE_USERS: string = 'updateUsers';

@Component({
  components: {
    ChannelListItem
  }
})
export default class ChannelList extends Vue {
  created() {
    const socket = socketIO("http://localhost:3000");

    socket.on("connect", function() {
      console.log("I am woooorking");
      socket.emit(EVENT_LOGIN, { username: "danha", room: "room1" });
    });

    socket.on(EVENT_UPDATE_USERS, (users: Array<User>) => {
      this.$store.dispatch("updateUserList", users);
    });
  }

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
