export const FigureGeometriche={
   0:{forma: [[0]], color:"0,0,0" }, 
   
   J: {
       forma:[
           [0,"J",0],
           [0,"J",0],
           ["J","J",0]
        ],
        color:"36,95,223",
    },
    I:{
     forma: [
         [0,"I",0,0],
         [0,"I",0,0],
         [0,"I",0,0],
         [0,"I",0,0]
     ],
     color:"80,227,230",
    },
    i:{
        forma: [
            [0,"i",0,0],
            [0,"i",0,0],
        ],
        color:"60,228,330",
       },
L:{ 
forma:
    [
        [0,"L",0],
        [0,"L",0],
        [0,"L","L"]
    ],
   color:"223,173,36",
},
S: {
    forma:[
        [0,"S","S"],
        ["S","S",0],
        [0,0,0]
    ],
    color:"48,211,56"
},
O:{
    forma:[
        ["O","O"],
        ["O","O"]
],
color:"223,217,36",
},
T: {
    forma:[
        [0,0,0],
        ["T","T","T"],
        [0,"T",0],
],
color:"132,61,198"
},

Z: {
    forma:[
        ["Z","Z",0],
        [0,"Z","Z"],
        [0,0,0]
    ],
    color:"227,78,78"
},
k:{
    forma:[
        ["k","k","k"],
        ["k","k","k"],
        ["k","k","k"]
    ],
    color:"220,80,54"
},
C:{
    forma:[
        ["C","C","C"],
        ["C",0,0],
        ["C","C","C"],
    ],
    color:"127,255,0"
}

};


export  const randomFigure =()=>{
    const figureGeometriche="JIiLSOTZkC";
    const randFig =
    figureGeometriche[Math.floor(Math.random()*figureGeometriche.length)];
    return FigureGeometriche [randFig]
};
