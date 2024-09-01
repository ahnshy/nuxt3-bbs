<template>
  <md-speed-dial :class="topPosition" md-direction="bottom">
    <md-speed-dial-target @click="addArticle">
      <md-icon>edit</md-icon>
    </md-speed-dial-target>
  </md-speed-dial>
</template>

<script>
export default {
  name: "ButtonDial",
  data() {
    return {
      topPosition: "md-top-right"
    }
  },
  methods: {
    addArticle: function() {
      this.$emit("add-article", true)
    }
  }
}
</script>

<style lang="scss">
.md-speed-dial {
  position: absolute;
  z-index: 9;
}

.md-button.md-theme-default.md-fab:not([disabled]) {
  color: #fff;
}

.md-speed-dial.md-top-left,
.md-speed-dial.md-top-right {
  top: 5px;
}
</style>
