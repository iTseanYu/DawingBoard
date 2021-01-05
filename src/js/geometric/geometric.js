/* eslint-disable no-unused-vars */
/**
 * 图形类父类
 */
const defuatobj = {
  geometric: {},
  symbol: {
    lineWidth: 2,
    strokeStyle: 'black'
  }}
export default class geometric {
  constructor (obj = defuatobj) {
    this.symbol = obj.symbol
    this.geometric = geometric
  }
  /**
   * 图形绘画
   */
  draw (canvas) {
  }
  /**
   * 添加到图层上
   */
  addTo (layer) {
    layer.draw(this)
  }
  /**
   * 更新图形
   */
  updataGeom (startPoint, event) {

  }
  /**
   * 事件添加
   */
  on () {

  }
}
