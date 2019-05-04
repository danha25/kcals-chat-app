<template>
  <div>
    <p>{{message.userId}}: {{message.content}}</p>
  </div>
</template>

<script lang="ts">
import Message from 'kcals-common/lib/Message';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MessageListItem extends Vue {
  @Prop() private message!: Message;
}
</script>
