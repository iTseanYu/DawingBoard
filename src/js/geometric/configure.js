import CircleShip from '@/js/geometric/circle'
  export default const geom={
    circle:()=>{
        let param = {
      geometric: {
        point: {x: event.layerY, y: event.layerY},
        radius: 0
      },
      symbol: JSON.parse(JSON.stringify(this.symbol))// 深度拷贝，防止对象污染
    }
     return new CircleShip(param)
    }
  }
  

  //   let circle = new CircleShip(param)