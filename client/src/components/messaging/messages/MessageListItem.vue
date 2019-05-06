<template>
  <article class="media">
  <figure class="media-left">
    <p class="image is-32x32">
      <img :src="sender.photoUrl" class="avatar" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong class="name">{{sender.username}}</strong>  <small>{{formattedDate}}</small>
        <br>
        {{message.content}}
      </p>
    </div>
  </div>
</article>
</template>

<script lang="ts">
import Message from 'kcals-common/lib/Message';
import moment from 'moment';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MessageListItem extends Vue {
  @Prop() private message!: Message;

  get sender(): string {
    return this.$store.getters.userById(this.message.userId);
  }
  get formattedDate(): string {
    return moment(this.message.timestamp.valueOf()).format('h:mm a');
  }
}
</script>
 <style>
 .media{
   padding-left: 18px
 }
 .avatar{
   border-radius: 3px;
   vertical-align: middle;
   margin-top: 8px;
 }
 .name{
   font-weight: 900;
   font-size: 15px;
   margin-right: 8px;
 }
 small{
   font-size: 12px;
 }
 </style>
 