
import React, { useRef, useEffect } from 'react'
import { points, lines, startT, lineWidth } from './glucose'
// import { points, lines, startT, lineWidth } from './guitar'
import "./Canvas.css"

const Canvas = props => {
  
  const canvasRef = useRef(null)

   for (let i = 0; i < points.length; i++) {
      scale(points[i], startT)
      scale(points[i], getmat(Math.PI/2,0,0))
   }
   const speed = 1/120*2
   var drot = [speed/2, speed, 0]

   function getmat(x,y,z) {
         const ca = Math.cos(x), sa = Math.sin(x),
         cb = Math.cos(y), sb = Math.sin(y),
         cc = Math.cos(z), sc = Math.sin(z)
         return [
            [cc*cb, -sc*ca+cc*sb*sa, sc*sa+cc*sb*ca],
            [sc*cb, cc*ca+sc*sb*sa, -cc*sa+sc*sb*ca],
            [-sb, cb*sa, ca*cb]
         ]
   }

   function scale(vec, scale) {
         let vec2 = []
         for (let i = 0; i < 3; i++) {
            vec2[i] = scale[i][0]*vec[0]+scale[i][1]*vec[1]+scale[i][2]*vec[2]
         }
         for (let i = 0; i < 3; i++) {
            vec[i] = vec2[i]
         }
   }

   const handleMouseMove = function(e){
      let h = window.innerHeight;
      let w = window.innerWidth;
      let mr = 50;
      let x = Math.min(e.clientX,w)-w/2;
      let y = Math.min(e.clientY,h)-h/2;
      let mag = Math.pow(x * x + y * y, 0.5)
      if (mag > mr) {
         x = x / mag * mr;
         y = y / mag * mr;
      }
      let posx = x/mr
      let posy = y/mr
      drot[0] = Math.sin(posx*Math.PI*0.5)*speed
      drot[1] = Math.sin(posy*Math.PI*0.5)*speed
      console.log(drot)
   }

let newpoints, e, grd, v, m, s, f, half;
  const draw = (ctx,c) => {
      ctx.globalAlpha = 0.4;
      ctx.clearRect(0, 0, c.width, c.height);
      newpoints = []
      half = c.width/2
      for (let i = 0; i < points.length; i++) {
         e = points[i];
         ctx.beginPath();
         scale(e, getmat(drot[0],drot[1],drot[2]))

         grd = ctx.createRadialGradient(e[0]+half, e[1]+half, 1, e[0]+half, e[1]+half, e[3]);
         grd.addColorStop(0, "rgb(250,250,250)");
         grd.addColorStop(1, "rgb(150,150,150)");
         ctx.fillStyle = grd;

         ctx.arc(e[0]+half, e[1]+half, e[3], 0, 2 * Math.PI);
         ctx.fill();
         newpoints[i] = [e[0]+half,e[1]+half]
      }
      ctx.strokeStyle="rgb(200,200,200)"
      for (let i = 0; i < lines.length; i++) {
         e = lines[i];
         if (e.length > 2) {
            ctx.lineWidth = e[2];
         } else {
            ctx.lineWidth = lineWidth;
         }
         ctx.beginPath();
         v = [newpoints[e[0]][0]-newpoints[e[1]][0],
         newpoints[e[0]][1]-newpoints[e[1]][1]]
         m = Math.pow(Math.pow(v[0], 2)+Math.pow(v[1], 2), 0.5)
         s = [v[0]/m*(points[e[0]][3]-1),
         v[1]/m*(points[e[0]][3]-1)]
         f = [v[0]/m*(points[e[1]][3]-1),
         v[1]/m*(points[e[1]][3]-1)]
         ctx.moveTo(points[e[0]][0]+half-s[0], points[e[0]][1]+half-s[1]);
         ctx.lineTo(points[e[1]][0]+half+f[0], points[e[1]][1]+half+f[1]);
         ctx.stroke();
      }
      ctx.lineWidth = 0;
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let animationFrameId
    
    window.addEventListener('mousemove', handleMouseMove)
    //Our draw come here
    
    const render = () => {
      draw(context, canvas)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [draw])
  
  return <canvas className='canvas' ref={canvasRef} {...props}/>
}

export default Canvas