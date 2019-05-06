<template>
  <div>
    <router-link :to="'/namespace1/direct/' + user.id" class="channel-item">○ {{ user.username}}</router-link>
  </div>
</template>

<script lang="ts">
import User from 'kcals-common/lib/User';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannelListUser extends Vue {
  @Prop() private user!: User;
}
</script>
<style>
.channel-item {
    font-family: 'NotoSansJP','Slack-Lato','appleLogo',sans-serif;
    padding-left: 15px;
    color: #c5b7c6;
    font-size: 16px;
}
.channel-item:hover {
  background: #3F0D40;
  color: #c5b7c6;
}
</style>
