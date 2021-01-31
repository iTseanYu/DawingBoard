
const defuatobj = {
  geometric: {},
  symbol: {
    lineWidth: 2,
    strokeStyle: 'black'
  }}
/**
*图形类父类
* @version  1.0.0
* @author seanYU
*/
export default class geometric {
  constructor (obj = defuatobj) {
    this.symbol = obj.symbol
    this.geometric = obj.geometric
    this.point = obj.geometric.point
    this.layer = null
    this.edit = false
  }
  /**
   * 图形绘画
   * @param {Dom} canvas
   */
  draw (canvas) {
  }
  /**
   * 添加到图层上
   * @param {Object} layer
   */
  addTo (layer) {
    this.layer = layer
    layer.draw(this)
  }
  /**
   * 更新图形
   * @param {Object} startPoint 绘画开始起点
   * @param {Object} event 事件回调对象
   */
  _updataGeom (startPoint, event) {
    this.point = startPoint
  }
  /*
 * 返回最小矩形范围坐标
 * @return {Array}  [leftup, leftdown, rightdown, rightup]
 */
  getextent () {
    const leftup = {x: 0, y: 0}
    const leftdown = {x: 0, y: 0}
    const rightdown = {x: 0, y: 0}
    const rightup = {x: 0, y: 0}
    return [leftup, leftdown, rightdown, rightup]
  }
  /**
   *
   * @param {Number} x x坐标数字
   * @param {Number} y y坐标数字
   */
  isPointInPath (x, y) {
    let ctx = this.canvas.getContext('2d')
    return ctx.isPointInPath(x, y)
  }
  /**
   *
   * @param {String} type 事件类型
   * @param {Function} callback  回调函数
   */
  on (type, callback) {
    this.layer.on(type, callback, 'geom', this)
  }
  /**
   *
   * @param {String} type 事件类型
   * @param {Function} callback  回调函数
   */
  off (type, callback) {
    this.layer.off(type, callback, 'geom', this)
  }
}
