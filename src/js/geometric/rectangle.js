
import geometric from './geometric.js'
/**
*矩形类
* @version  1.0.0
* @author seanYU
*/
export default class rectangle extends geometric {
  /**
   * 构造函数
   * @param {Object} obj 图形构造对象参数
   * @example {geometric：point:{x:0,y:0},width:10,height:20},symbol:{lineWidth:2,strokeStyle:'black'}}   */
  constructor (obj) {
    super()
    this.point = obj.geometric.point
    this.width = obj.geometric.width
    this.height = obj.geometric.height
    this.centerpoint = {x: this.point.x + this.width / 2, y: this.point.x + this.height / 2}
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
    ctx.rect(this.point.x, this.point.y, this.width, this.height)
    ctx.stroke()
  }
  /**
   * 更新图形
   * @param {Object} startPoint 绘画起点
   * @param {Object} event 事件对象
   */
  updataGeom (startPoint, event) {
    let ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.point = startPoint
    this.width = event.layerX - startPoint.x
    this.height = event.layerY - startPoint.y
  }
}
