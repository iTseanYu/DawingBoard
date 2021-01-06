
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
    layer.draw(this)
  }
  /**
   * 更新图形
   * @param {Object} startPoint 绘画开始起点
   * @param {Object} event 事件回调对象
   */
  updataGeom (startPoint, event) {
    this.point = startPoint
  }
}
