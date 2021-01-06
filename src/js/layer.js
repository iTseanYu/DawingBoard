/**
*图层类
* @version  1.0.0
* @author seanYU
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
  /**
 *图层绘画
 * @param {Object} geom 图形对象
 */
  draw (geom) {
    this.geom.push(geom)
    this.reDraw()
  }
  /**
   * 图层重绘
   */
  reDraw () {
    this.geom.forEach(geom => {
      geom.draw(this.canvas)
    })
  }
}
