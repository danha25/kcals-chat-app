<template>
  <div>
    <p>{{user.username}}</p>
  </div>
</template>

<script lang="ts">
import User from '../../node_modules/kcals-common/User';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannelListItem extends Vue {
  @Prop() private user!: User;
}
</script>
