/* eslint-disable no-unused-vars */
/**
 * 图层类
 */
export default class Layer {
  constructor (canvasid = undefined) {
    this.canvas = undefined
    if (canvasid) {
      this.canvas = document.getElementById(canvasid)
      // 改变canvas的默认大小，css改变大小会导致图形等比变化，改变大小会导致canvas重绘
      this.canvas.width = this.canvas.offsetWidth
      this.canvas.height = this.canvas.offsetHeight
      this.geom = []
    } else {
      console.error('请输入正确的dom元素id')
    }
  }

  draw (geom) {
    this.geom.push(geom)
    this.reDraw()
  }
  reDraw () {
    this.geom.forEach(geom => {
      geom.draw(this.canvas)
    })
  }
}
