<template>
  <div class="sidebar">
    <h3>Dirrect Messages</h3>
    <!-- here v for frineds -->
    <ChannelListItem user='username'/>
  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelListItem from './ChannelListItem.vue';

@Component({
  components: {
    ChannelListItem
  }
})
export default class ChannelList extends Vue {}
</script>

<style>
.sidebar {
  min-height: 100vh;
  background-color: #4a144b;
  color: azure;
}
</style>
