<template>
  <div>
    <p>{{user.name}}</p>
  </div>
</template>

<script lang="ts">
import User from '../../node_modules/kcals-common/lib/User';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannelListItem extends Vue {
  @Prop() private user!: any;
}
</script>
