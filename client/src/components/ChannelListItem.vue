<template>
  <div>
    <p>{{user}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannelListItem extends Vue {
  @Prop() private user!: string;
}
</script>
