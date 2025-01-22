{/* <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.min.js"></script>
<script src="https://cdn/jsdelivr.net/npm/matter-wrap@0.2.0/build/matter-wrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/matter-attractors@0.1.6/build/matter-attractors.min.js"></script>
 */}

 var canvas = $('#wrapper-canvas').get(0)

 var dimensions = {
   width: $(window).width(),
   height: $(window).height(),
 }
 
 Matter.use('matter-attractors')
 Matter.use('matter-wrap')
 
 function runMatter() {
   // module aliases
   var Engine = Matter.Engine,
     Events = Matter.Events,
     Runner = Matter.Runner,
     Render = Matter.Render,
     World = Matter.World,
     Body = Matter.Body,
     Mouse = Matter.Mouse,
     Common = Matter.Common,
     Composite = Matter.Composite,
     Composites = Matter.Composites,
     Bodies = Matter.Bodies
 
   // create engine
   var engine = Engine.create()
 
   engine.world.gravity.y = 0
   engine.world.gravity.x = 0
   engine.world.gravity.scale = 0.1
 
   // create renderer
   var render = Render.create({
     element: canvas,
     engine: engine,
     options: {
       showVelocity: false,
       width: dimensions.width,
       height: dimensions.height,
       wireframes: false,
       background: 'transparent',
     },
   })
 
   // create runner
   var runner = Runner.create()
 
   // Runner.run(runner, engine);
   // Render.run(render);
 
   // create demo scene
   var world = engine.world
   world.gravity.scale = 0
 
   // create a body with an attractor
   var attractiveBody = Bodies.circle(
     render.options.width / 2,
     render.options.height / 2,
     Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
     {
       render: {
         fillStyle: `#000`,
         strokeStyle: `#000`,
         lineWidth: 0,
       },
 
       isStatic: true,
       plugin: {
         attractors: [
           function (bodyA, bodyB) {
             return {
               x: (bodyA.position.x - bodyB.position.x) * 1e-6,
               y: (bodyA.position.y - bodyB.position.y) * 1e-6,
             }
           },
         ],
       },
     }
   )
 
   World.add(world, attractiveBody)
 
   // add some bodies that to be attracted
   for (var i = 0; i < 60; i += 1) {
     let x = Common.random(0, render.options.width)
     let y = Common.random(0, render.options.height)
     let s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60)
     let poligonNumber = Common.random(3, 6)
     var body = Bodies.polygon(
       x,
       y,
       poligonNumber,
       s,
 
       {
         mass: s / 20,
         friction: 0,
         frictionAir: 0.02,
         angle: Math.round(Math.random() * 360),
         render: {
           fillStyle: '#222222',
           strokeStyle: `#000000`,
           lineWidth: 2,
         },
       }
     )
 
     World.add(world, body)
 
     let r = Common.random(0, 1)
     var circle = Bodies.circle(x, y, Common.random(2, 8), {
       mass: 0.1,
       friction: 0,
       frictionAir: 0.01,
       render: {
         fillStyle: r > 0.3 ? `#30cfd0` : `#a8edea`,
         strokeStyle: `#304352`,
         lineWidth: 2,
       },
     })
 
     World.add(world, circle)
 
     var circle = Bodies.circle(x, y, Common.random(2, 20), {
       mass: 6,
       friction: 0,
       frictionAir: 0,
       render: {
         fillStyle: r > 0.3 ? `#334443` : `#485563`,
         strokeStyle: `#111111`,
         lineWidth: 4,
       },
     })
 
     World.add(world, circle)
 
     var circle = Bodies.circle(x, y, Common.random(2, 30), {
       mass: 0.2,
       friction: 0.6,
       frictionAir: 0.8,
       render: {
         fillStyle: `#596164`,
         strokeStyle: `#485563`,
         lineWidth: 3,
       },
     })
 
     World.add(world, circle)
   }
 
   // add mouse control
   var mouse = Mouse.create(render.canvas)
 
   Events.on(engine, 'afterUpdate', function () {
     if (!mouse.position.x) return
     // smoothly move the attractor body towards the mouse
     Body.translate(attractiveBody, {
       x: (mouse.position.x - attractiveBody.position.x) * 0.12,
       y: (mouse.position.y - attractiveBody.position.y) * 0.12,
     })
   })
 
   // return a context for MatterDemo to control
   let data = {
     engine: engine,
     runner: runner,
     render: render,
     canvas: render.canvas,
     stop: function () {
       Matter.Render.stop(render)
       Matter.Runner.stop(runner)
     },
     play: function () {
       Matter.Runner.run(runner, engine)
       Matter.Render.run(render)
     },
   }
 
   Matter.Runner.run(runner, engine)
   Matter.Render.run(render)
   return data
 }
 
 function debounce(func, wait, immediate) {
   var timeout
   return function () {
     var context = this,
       args = arguments
     var later = function () {
       timeout = null
       if (!immediate) func.apply(context, args)
     }
     var callNow = immediate && !timeout
     clearTimeout(timeout)
     timeout = setTimeout(later, wait)
     if (callNow) func.apply(context, args)
   }
 }
 
 function setWindowSize() {
   let dimensions = {}
   dimensions.width = $(window).width()
   dimensions.height = $(window).height()
 
   m.render.canvas.width = $(window).width()
   m.render.canvas.height = $(window).height()
   return dimensions
 }
 
 let m = runMatter()
 setWindowSize()
 $(window).resize(debounce(setWindowSize, 250))
 




 // htmlcss progress circular bar 
let htmlProgress = document.querySelector(".html-css"),
htmlValue = document.querySelector(".html-progress");

let htmlStartValue = 0,
htmlEndValue = 90,
htmlspeed = 30;

let progresshtml = setInterval(() => {
htmlStartValue++;

htmlValue.textContent = `${htmlStartValue}%`;
htmlProgress.style.background = `conic-gradient(#fca61f ${
  htmlStartValue * 3.6
}deg, #ededed 0deg)`;

if (htmlStartValue == htmlEndValue) {
  clearInterval(progresshtml);
}
}, htmlspeed);

// javasript progress circular bar 
let javascriptProgress = document.querySelector(".javascript"),
javascriptValue = document.querySelector(".javascript-progress");

let javascriptStartValue = 0,
javascriptEndValue = 75,
jsspeed = 30;

let progressjs = setInterval(() => {
javascriptStartValue++;

javascriptValue.textContent = `${javascriptStartValue}%`;
javascriptProgress.style.background = `conic-gradient(#7d2ae8 ${
  javascriptStartValue * 3.6
}deg, #ededed 0deg)`;

if (javascriptStartValue == javascriptEndValue) {
  clearInterval(progressjs);
}
}, jsspeed);

// php progress circular bar 
let phpProgress = document.querySelector(".php"),
phpValue = document.querySelector(".php-progress");

let phpStartValue = 0,
phpEndValue = 80,
phpspeed = 30;

let progressphp = setInterval(() => {
phpStartValue++;

phpValue.textContent = `${phpStartValue}%`;
phpProgress.style.background = `conic-gradient(#20c997 ${
  phpStartValue * 3.6
}deg, #ededed 0deg)`;

if (phpStartValue == phpEndValue) {
  clearInterval(progressphp);
}
}, phpspeed);

// reactjs progress circular bar 
let reactProgress = document.querySelector(".reactjs"),
reactValue = document.querySelector(".reactjs-progress");

let reactStartValue = 0,
reactEndValue = 30,
rjsspeed = 30;

let progressreact = setInterval(() => {
reactStartValue++;

reactValue.textContent = `${reactStartValue}%`;
reactProgress.style.background = `conic-gradient(#3f396d ${
  reactStartValue * 3.6
}deg, #ededed 0deg)`;

if (reactStartValue == reactEndValue) {
  clearInterval(progressreact);
}
}, rjsspeed);


// filter using javascript
$(document).ready(function () {
$(".filter-item").click(function () {
  const value = $(this).attr("data-filter");
  if (value == "all") {
    $(".post").show("1000");
  } else {
    $(".post")
      .not("." + value)
      .hide("1000");
    $(".post")
      .filter("." + value)
      .show("1000");
  }
});
});


// javascript for sticky navbar even if u scroll the navbar will be fixed
document.addEventListener("DOMContentLoaded", function(){
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.getElementById('navbar-top').classList.add('fixed-top');
      // add padding top to show content behind navbar
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar-top').classList.remove('fixed-top');
       // remove padding top from body
      document.body.style.paddingTop = '0';
    } 
});
}); 


// adding funtionality to back to top button 

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
scrollFunction();
};
function scrollFunction() {
if (
  document.body.scrollTop > 20 ||
  document.documentElement.scrollTop > 20
) {
  mybutton.style.display = "block";
} else {
  mybutton.style.display = "none";
}
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click",function(){
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
});
 
 