<template>
  <div id="container" >
<drawTool></drawTool>
<drawBoard></drawBoard>
  </div>
</template>

<script>
import drawTool from '@/components/drawTool'
import drawBoard from '@/components/drawBoard'
export default {
  name: 'container',
  components: {
    'drawTool': drawTool,
    'drawBoard': drawBoard
  }
}
</script>

<style>
#container {
height:calc(100vh - 16px);
    display: flex;
}
</style>
