export const vof = 0.45

export const white = 16, red = 24, black = 20

export const lineWidth = 14;

export const points = [
    //inside ring
    [1,vof,0, red],
    [Math.cos(Math.PI/3),0,Math.sin(Math.PI/3), black],
    [Math.cos(2*Math.PI/3),vof,Math.sin(2*Math.PI/3), black],
    [-1,0,0, black],
    [Math.cos(-2*Math.PI/3),vof,Math.sin(-2*Math.PI/3), black],
    [Math.cos(-Math.PI/3),0,Math.sin(-Math.PI/3), black],
    //outside ring
    [-2,vof,0,red],
    [2*Math.cos(Math.PI/3),vof,2*Math.sin(Math.PI/3),black],//out
    [2*Math.cos(Math.PI/1.5),0,2*Math.sin(Math.PI/1.5),red],
    [-2*Math.cos(Math.PI/3),0,-2*Math.sin(Math.PI/3),red],
    [-2*Math.cos(Math.PI/1.5),vof,-2*Math.sin(Math.PI/1.5),red],
    //inside ring h
    [-1,-1,0,white],
    [Math.cos(Math.PI/3),-1,Math.sin(Math.PI/3),white],
    [Math.cos(2*Math.PI/3),vof+1,Math.sin(2*Math.PI/3),white],
    [Math.cos(-2*Math.PI/3),vof+1,Math.sin(-2*Math.PI/3),white],
    [Math.cos(-Math.PI/3),-1,Math.sin(-Math.PI/3),white],
    //outside h
    [2*Math.cos(Math.PI/3)+1,-vof,2*Math.sin(Math.PI/3),red],

    [-3,0,0,white],
    [2*Math.cos(Math.PI/1.5)-1,vof,2*Math.sin(Math.PI/1.5),white],
    [-2*Math.cos(Math.PI/3)-1,vof,-2*Math.sin(Math.PI/3),white],
    [-2*Math.cos(Math.PI/1.5)+1,0,-2*Math.sin(Math.PI/1.5),white],

    [3*Math.cos(Math.PI/3)-1,0,3*Math.sin(Math.PI/3),white],
    [2*Math.cos(Math.PI/3),vof+1,2*Math.sin(Math.PI/3),white],
    [Math.cos(Math.PI/3)+2,-vof,Math.sin(Math.PI/3),white],


]
export const lines = [
    [0,1],
    [1,2],
    [2,3],
    [3,4],
    [4,5],
    [5,0],

    [6,3],
    [7,1],//out
    [8,2],
    [9,4],
    [10,5],

    [11,3],
    [12,1],
    [13,2],
    [14,4],
    [15,5],

    [16,7],

    [17,6],
    [18,8],
    [19,9],
    [20,10],

    [21,7],
    [22,7],
    [23,16]
]
export const startT = [
    [60,0,0],
    [0,60,0],
    [0,0,60]
]

