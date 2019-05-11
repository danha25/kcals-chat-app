<template>
  <div>
    <router-link :to="'/namespace1/channel/' + channel.id" class="channel-item"># {{ channel.name}}</router-link>
  </div>
</template>

<script lang="ts">
import Channel from 'kcals-common/lib/Channel';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannelListItem extends Vue {
  @Prop() private channel!: Channel;
}
</script>

<style>
.channel-item {
    font-family: 'NotoSansJP','Slack-Lato','appleLogo',sans-serif;
    padding-left: 15px;
    color: #c5b7c6;
    font-size: 16px;
    width: 100%;
}
.channel-item:hover {
  background: #3F0D40;
  color: #c5b7c6;
}
</style>
