<template>
  <div class="drawBoard">
    <canvas class="drawBoard_canvas"
            id="drawBoard_canvas"></canvas>
    <geometric> </geometric>
  </div>
</template>

<script>

import geometric from './geometric'
export default {
  name: 'drawBoard',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    'geometric': geometric
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drawBoard {
  flex: 1;
}
.drawBoard_canvas {
  width: 100%;
  height: 100%;
}
</style>
