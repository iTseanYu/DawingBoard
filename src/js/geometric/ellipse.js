
import geometric from './geometric.js'
/**
*椭圆类
* @version  1.0.0
* @author seanYU
*/
export default class ellipse extends geometric {
  /**
   * 构造函数
   * @param {Object} obj 图形构造对象参数
   * @example {geometric：point:{x:0,y:0},radius:10},symbol:{lineWidth:2,strokeStyle:'black'}}   */
  constructor (obj) {
    super()
    this.point = obj.geometric.point
    this.centerpoint = obj.geometric.point
    this.radius = obj.geometric.radius
    this.symbol = obj.symbol === undefined ? this.symbol : obj.symbol
  }

  /**
   *图形绘画
   * @param {Dom} canvas dom元素
   */
  draw (canvas) {
    this.canvas = canvas
    let ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.lineWidth = this.symbol.lineWidth
    ctx.strokeStyle = this.symbol.strokeStyle
    ctx.ellipse(this.point.x, this.point.y, this.width, this.height, 0, 0, 2 * Math.PI)
    ctx.stroke()
  }
  /**
   * 更新图形
   * @param {Object} startPoint 绘画起点
   * @param {Object} event 事件对象
   */
  _updataGeom (startPoint, event) {
    let ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.point = startPoint
    // 长短半轴不能为负数
    this.width = Math.abs(event.layerX - startPoint.x)
    this.height = Math.abs(event.layerY - startPoint.y)
  }
}
