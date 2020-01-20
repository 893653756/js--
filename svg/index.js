// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Document</title>
//     <style>
//         .red {
//             fill: red;
//         }

//         .fancy {
//             fill: none;
//             stroke: black;
//             stroke-width: 3pt;
//         }

//         circle:hover {
//             fill: red
//         }
//     </style>

// </head>

// <body>
//     <svg width="100" height="100" viewBox="50 50 50 50">
//         <circle id="cir" cx="50" cy="50" r="50"></circle>
//     </svg>
//     <svg width="300" height="100">
//         <circle cx="30" cy="50" r="25"></circle>
//         <circle cx="90" cy="50" r="25" class="red"></circle>
//         <circle cx="150" cy="50" r="25" class="fancy"></circle>
//     </svg>

//     <svg width="300" height="10">
//         <line x1="0" y1="0" x2="200" y2="0" style="stroke: rgb(0,0,0);stroke-width:5" />
//     </svg>

//     <svg width="300" height="60">
//         <polyline points="3,3 30,28 3,53" fill="none" style="stroke: rgb(0,0,0);" />
//     </svg>

//     <svg width="300" height="60">
//         <rect x="0" y="0" height="50" width="200" fill="#ff0000" style="stroke: rgb(0,0,0);" />
//     </svg>

//     <svg width="300" height="180">
//         <ellipse cx="150" cy="90" rx="100" ry="70" fill="#silver" style="stroke: rgb(0,0,0);stroke-width:3" />
//     </svg>

//     <svg width="300" height="180">
//         <polygon points="0,0 100,0 100,100 0,100 0,0" fill="green" style="stroke: orange;stroke-width:1" />
//     </svg>

//     <svg width="300" height="90">
//         <path d="
//             M 18,3
//             L 46,3
//             L 46,40
//             L 61,40
//             L 32,68
//             L 3,40
//             L 18,40
//             Z
//         " />
//     </svg>

//     <svg width="100" height="50">
//         <text x="0" y="25">Hello World</text>
//     </svg>

//     <svg width="100" height="50">
//         <circle id="my_circle" cx="20" cy="20" r="10" />
//         <use href="#my_circle" x="30" y="0" fill="red" />
//         <use href="#my_circle" x="60" y="0" fill="green" />
//     </svg>

//     <svg width="300" height="100">
//         <g id="my_group">
//             <text x="35" y="20">圆形</text>
//             <circle cx="50" cy="50" r="20"></circle>
//         </g>
//         <use href="#my_group" x="100" y="0" fill="blue" />
//         <use href="#my_group" x="200" y="0" stroke="blue" />
//     </svg>

//     <svg width="300" height="100">
//         <defs>
//             <g id="my_group2">
//                 <text x="35" y="20">圆形2</text>
//                 <circle cx="50" cy="50" r="20"></circle>
//             </g>
//         </defs>
//         <use href="#my_group2" x="100" y="0" fill="blue" />
//         <use href="#my_group2" x="200" y="0" stroke="blue" />
//     </svg>

//     <svg width="200" height="200" id="pattern">
//         <defs>
//             <pattern id="xxx" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//                 <circle fill="#bee9e8" cx="50" cy="50" r="35" />
//             </pattern>
//         </defs>
//         <rect x="0" y="0" width="100%" height="100%" fill="url(#xxx)" />
//     </svg>

//     <svg width="200" height="200">
//         <rect x="0" y="0" width="20" height="20" fill="#feac5e">
//             <animate attributeName="x" from="0" to="180" dur="2s" repeatCount="indefinite" />
//             <animate attributeName="y" from="0" to="180" dur="2s" repeatCount="indefinite" />
//         </rect>
//     </svg>

//     <svg width="100" height="100">
//         <rect x="20" y="20" width="60" height="60" fill="#4bc0c8">
//             <animateTransform attributeName="transform" type="rotate" begin="0s" dur="3s" from="0 50 50" to="360 50 50"
//                 repeatCount="5" />
//         </rect>
//     </svg>
//     <canvas id="canvas"></canvas>

// </body>
// <script>
//     var svgString = new XMLSerializer().serializeToString(document.getElementById("pattern"));
//     var img = new Image();
//     var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
//     var url = URL.createObjectURL(svg);
//     img.src = url;
//     img.onload = function () {
//         var canvas = document.getElementById("canvas");
//         canvas.width = "200";
//         canvas.height = "200";
//         var ctx = canvas.getContext("2d");
//         console.log(url);
//         URL.revokeObjectURL(url);
//         ctx.drawImage(img, 0, 0);
//     }
// </script>

// </html>