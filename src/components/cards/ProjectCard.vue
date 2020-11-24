<template>
  <md-card class="md-card-login">
    <md-card-content> </md-card-content>

    <md-card-actions>
      <slot name="donar"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "project-card",
  props: {},
  data() {
    return {};
  },
  beforeMount() {},
  methods: {}
};
</script>

<style lang="css"></style>
