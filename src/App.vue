<template>
  <div id="app">
    <router-view />
    <notifications group="foo" width="350" position="center bottom" />
  </div>
</template>

<style lang="scss">
.vue-notification {
  padding: 20px;
  margin: 0 5px 5px;
  margin-bottom: 55px;

  font-size: 15px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>
