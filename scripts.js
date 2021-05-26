function preload() {
    img = loadImage('logo.png');
}

var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composite = Matter.Composite,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Bodies = Matter.Bodies;

var engine = Engine.create(),
    world = engine.world;

    var w = window.innerWidth;
    var h = window.innerHeight;

function setup() {
}
  
function draw() {

}
  

    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: w,
            height: h,
            showAngleIndicator: true,
            showAngleIndicator: false,
            wireframes: false,
            background: 'black',
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);  

    // add bodies
    Composite.add(world, [
        Bodies.rectangle(400, 600, 1200, 50.5, { 
            isStatic: true, 
            render: { fillStyle: 'black' },
           
        })
    ]);



    var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
        return Bodies.circle(x, y, Common.random(15, 30), { 
            friction: 0.5,
            render: {
               sprite: {
                texture: 'logo.png'
            }}
        });
    });
    
    
    Composite.add(world, [
        stack,  
 
    ]);


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.4,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // wrapping using matter-wrap plugin
    var allBodies = Composite.allBodies(world);

    for (var i = 0; i < allBodies.length; i += 1) {
        allBodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
            max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
        };
    }


if (typeof module !== 'undefined') {
    module.exports = Example.ballPool;
}

