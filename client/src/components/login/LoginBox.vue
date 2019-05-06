<template>
  <div class="box column is-half is-offset-one-quarter">
    <form>
      <div class="field">
        <label class="label">Namespace</label>
        <div class="control">
          <input class="input" type="text" placeholder="Namespace" v-model="namespace">
        </div>
      </div>
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" placeholder="Username" v-model="username">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password">
        </div>
      </div>

      <button type="submit" class="button" @click="login">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginBox extends Vue {
  namespace: string = "";
  username: string = "";
  password: string = "";

  login(evt: Event) {
    evt.preventDefault();
    localStorage.setItem("namespace", this.namespace);
    localStorage.setItem("username", this.username);

    this.$router.push({ path: `/${this.namespace}` });
  }
}
</script>

<style scoped>
.box {
  margin-top: 30px;
}
</style>
