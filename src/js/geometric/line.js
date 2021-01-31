
import geometric from './geometric.js'
/**
*线类
* @version  1.0.0
* @author seanYU
*/
export default class line extends geometric {
  /**
   * 构造函数
   * @param {Object} obj 图形构造对象参数
   * @example {geometric：points:[{x:0,y:0}]},symbol:{lineWidth:2,strokeStyle:'black'}}   */
  constructor (obj) {
    super()
    this.points = obj.geometric.points
    // this.centerpoint

    this.symbol = obj.symbol === undefined ? this.symbol : obj.symbol
  }

  /**
   *图形绘画
   * @param {Dom} canvas dom元素
   */
  draw (canvas) {
    if (this.points.length === 0) return
    this.canvas = canvas
    let ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.lineWidth = this.symbol.lineWidth
    ctx.strokeStyle = this.symbol.strokeStyle
    ctx.moveTo(this.points[0].x, this.points[0].y)
    this.points.forEach(element => {
      ctx.lineTo(element.x, element.y)
    })

    ctx.stroke()
    ctx.closePath()
  }
  /**
   * 更新图形
   * @param {Object} startPoint 绘画起点
   * @param {Object} event 事件对象
   */
  _updataGeom (startPoint, event) {
    let ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.points.push({x: event.layerX, y: event.layerY})
  }
}
