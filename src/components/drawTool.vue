<template>
  <div class="drawTool">
    <div class="drawtool_row">
      <div class="drawtool_title"> 形状</div>
      <div class="drawtool_shape">
        <el-button class="iconfont iconweibiaoti38"
                   @click="drawCircle"></el-button>
        <el-button class="iconfont iconxiantiao-line"></el-button>
        <el-button class="iconfont iconjuxing"></el-button>
        <el-button class="iconfont icontx-zhengfangxing"></el-button>
      </div>
    </div>

    <div class="drawtool_row">
      <div class="drawtool_title"> 样式</div>
      <div class="drawtool_shape">
        <el-color-picker v-model="strokeStyle"
                         @change="colorChange"></el-color-picker>
        <el-input-number v-model="lineWidth"
                         @change="handleChange"
                         :min="1"
                         :max="10"
                         label="描述文字"></el-input-number>
      </div>
    </div>
    <div class="drawtool_row">
      <div class="drawtool_title">开启编辑 </div>
      <div class="drawtool_shape">
        <el-switch v-model="edit"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import Layer from '@/js/layer'
import DrawTool from '@/js/drawTool'

export default {

  name: 'drawTool',
  data () {
    return {
      layer: {},
      strokeStyle: '#409EFF',
      lineWidth: 2,
      edit: false,
      drawtool: {}
    }
  },
  mounted: function () {
    this.layer = new Layer('drawBoard_canvas')
    this.drawtool = new DrawTool()
    this.drawtool.addTo(this.layer)
  },
  methods: {
    drawCircle () {
      let symbol = {
        lineWidth: this.lineWidth,
        strokeStyle: this.strokeStyle
      }
      this.drawtool.setCategory('circle', symbol)
    },
    /**
     * 颜色改变
     */
    colorChange (value) {
      this.strokeStyle = value
    },
    /**
     * 画笔粗细
     */
    handleChange (val) {
      debugger
      this.lineWidth = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drawTool {
  height: 100%;
  width: 270px;
  background-color: #9e9e9e;
}
.drawtool_shape {
  margin: 8px;
  display: flex;
  /* height: 50px; */
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
