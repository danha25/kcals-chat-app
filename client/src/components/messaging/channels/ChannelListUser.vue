<template>
  <div>
    <router-link :to="'/namespace1/direct/' + user.id" class="channel-item">
      <span class="circle" v-bind:class="{ online: isOnline }"></span>
      {{ user.username}}
    </router-link>
  </div>
</template>

<script lang="ts">
import User from "kcals-common/lib/User";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannelListUser extends Vue {
  @Prop() private user!: User;

  get isOnline() {
    return this.user.online;
  }
}
</script>
<style>
.channel-item {
  font-family: "NotoSansJP", "Slack-Lato", "appleLogo", sans-serif;
  padding-left: 15px;
  color: #c5b7c6;
  font-size: 16px;
}
.channel-item:hover {
  background: #3f0d40;
  color: #c5b7c6;
}

.circle {
  background: rgb(0, 0, 0, 0);;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #c5b7c6;
  display: inline-block;
}
.online{
    background: rgb(0, 255, 0);;
}
</style>
