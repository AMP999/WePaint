

///////////////////////////////////////  Initialization  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var line_color = "black";
var toolSize = "10";


var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var holder = document.querySelector('#canvasHolder');
var holder_style = getComputedStyle(holder);
canvas.width = parseInt(holder_style.getPropertyValue('width'));
canvas.height = parseInt(holder_style.getPropertyValue('height'));
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height)


var tmp_canvas = document.createElement('canvas');
var tmp_ctx = tmp_canvas.getContext('2d');
tmp_canvas.id = 'tmp_canvas';
tmp_canvas.width = canvas.width;
tmp_canvas.height = canvas.height;

holder.appendChild(tmp_canvas);




(function(){

///////////////////////////////////////  New Page  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    document.getElementById("new").addEventListener("click", function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height)
    });

///////////////////////////////////////  Open An Image  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    document.getElementById("open").addEventListener("click", function(){
        var openForm1 = document.getElementById("openForm1");
        var openForm2 = document.getElementById("openForm2");
        var adress = document.getElementById("imageAdress");

        if(openForm1.checked){
            var reader = new FileReader();
            reader.addEventListener("load", function() {
                imageLoader(reader.result);
            });
            reader.readAsDataURL(adress.files[0]);
        }

        if(openForm2.checked){
            imageLoader(document.getElementById("imageURL").value);
        }
    });
    function imageLoader(url){
        var image = document.createElement("img");
        image.addEventListener("load", function() {
            image.width = ctx.canvas.width;
            image.height = ctx.canvas.height;
            ctx.drawImage(image, 0, 0,image.width,image.height);
        });
        image.src = url;
    }


////////////////////////////  Save An Image Ostad Pedaram dar umad ta rahe download kardan ro yad begiram :D \\\\\\\\\\\\\\\\\\\\\\\\\\\\
    document.getElementById("downlodLink").addEventListener("click", function(){
        var dataURL = canvas.toDataURL();
        var link = document.getElementById("downlodLink");
        link.href = dataURL;
    });


///////////////////////////////////////  Coloring the Color Boxes  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var allColors = document.getElementsByClassName("color");

    allColors[0].style.backgroundColor = "black";
    allColors[1].style.backgroundColor = "green";
    allColors[2].style.backgroundColor = "blue";
    allColors[3].style.backgroundColor = "pink";
    allColors[4].style.backgroundColor = "yellow";
    allColors[5].style.backgroundColor = "white";
    allColors[6].style.backgroundColor = "red";
    allColors[7].style.backgroundColor = "purple";
    allColors[8].style.backgroundColor = "grey";
    allColors[9].style.backgroundColor = "skyblue";
    document.getElementById("color-5").value = "#0dbd11";

///////////////////////////////////////  Color Selecting  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    for (var i=0; i<allColors.length; i++){
        allColors[i].addEventListener("click", function select(){
            for (var i=0; i<allColors.length    ; i++){
                allColors[i].style.borderColor = "white";
            }
            document.getElementById("color-5").style.borderColor = "white";
            document.getElementById(this.id).style.borderColor = "blue";
            line_color = document.getElementById(this.id).style.backgroundColor;
        },false);
    }
    document.getElementById("color-5").addEventListener("mousedown", function select(){
        line_color = document.getElementById(this.id).value;
        for (var i=0; i<allColors.length    ; i++){
            allColors[i].style.borderColor = "white";
        }
        document.getElementById(this.id).style.borderColor = "blue";
    });
    document.getElementById("color-5").addEventListener("change", function select(){
        line_color = document.getElementById(this.id).value;
    });




///////////////////////////////////////  Tool Selecting  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var allTools = document.getElementsByClassName("tools");

    for (var i=0; i<allTools.length; i++){
        allTools[i].addEventListener("click", function select(){
            tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            for (var i=0; i<allTools.length; i++){
                allTools[i].style.borderColor = "white";
            }
            document.getElementById(this.id).style.borderColor = "red";
            event_canceller();
        },false);
    }




///////////////////////////////////////  Font Size Selecting  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    document.getElementById("toolSize").addEventListener("change", function(){
        toolSize = parseInt(document.getElementById("toolSize").value) ;
    },false);



///////////////////////////////////////                        \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    document.getElementById("pen").addEventListener("click", penDrawer,false);

    document.getElementById("line").addEventListener("click", lineDrawer,false);

    document.getElementById("ellipse").addEventListener("click", ellipseDrawer,false);

    document.getElementById("circle").addEventListener("click", circleDrawer,false);

    document.getElementById("rectangle").addEventListener("click", rectangleDrawer,false);

    document.getElementById("square").addEventListener("click", squareDrawer,false);

    document.getElementById("triangle").addEventListener("click", triangleDrawer,false);

    document.getElementById("spray").addEventListener("click", sprayDrawer,false);

    document.getElementById("eraser").addEventListener("click", eraser,false);

    document.getElementById("text").addEventListener("click", textTool,false);

}());



//___________________________________________________________________EventCanceller____________________________________________________________________________
function event_canceller(){
    tmp_canvas.removeEventListener("mousedown", pen_event1,false);
    tmp_canvas.removeEventListener("mouseup", pen_event2,false);
    tmp_canvas.removeEventListener("mousedown", line_event1,false);
    tmp_canvas.removeEventListener("mouseup", line_event2,false);
    tmp_canvas.removeEventListener("mousedown", rectangle_event1,false);
    tmp_canvas.removeEventListener("mouseup", rectangle_event2,false);
    tmp_canvas.removeEventListener("mousedown", square_event1,false);
    tmp_canvas.removeEventListener("mouseup", square_event2,false);
    tmp_canvas.removeEventListener("mousedown", ellipse_event1,false);
    tmp_canvas.removeEventListener("mouseup", ellipse_event2,false);
    tmp_canvas.removeEventListener("mousedown", circle_event1,false);
    tmp_canvas.removeEventListener("mouseup", circle_event2,false);
    tmp_canvas.removeEventListener("mousedown", triangle_click,false);
    tmp_canvas.removeEventListener("mousedown", spray_event1,false);
    tmp_canvas.removeEventListener("mouseup", spray_event2,false);
    tmp_canvas.removeEventListener("mousedown", eraser_event1,false);
    tmp_canvas.removeEventListener("mouseup", eraser_event2,false);
    tmp_canvas.removeEventListener("click", textGrabber, false);
}



var mouse = {x: 0, y: 0};
var points = [];
var start_mouse = {x: 0, y: 0};
var last_mouse = {x: 0, y: 0};
//_______________________________________________________________________PenDrawer______________________________________________________________________
function penDrawer() {
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);


    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;


    tmp_canvas.addEventListener('mousedown', pen_event1, false);
    tmp_canvas.addEventListener('mouseup', pen_event2, false);
}

var pen_event1 = function mousedown(e){
    tmp_canvas.addEventListener('mousemove', onCanvas_pen, false);

    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;
    tmp_ctx.lineWidth = toolSize;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    points.push({x: mouse.x, y: mouse.y});

    onCanvas_pen();
};

var pen_event2 = function mouseup(){
    tmp_canvas.removeEventListener('mousemove', onCanvas_pen, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    points = [];
};

var onCanvas_pen = function() {
    points.push({x: mouse.x, y: mouse.y});

    if (points.length < 3) {
        var b = points[0];
        tmp_ctx.beginPath();
        tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
        tmp_ctx.fill();
        tmp_ctx.closePath();

        return;
    }

    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    tmp_ctx.beginPath();
    tmp_ctx.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length - 2; i++) {
        var c = (points[i].x + points[i + 1].x) / 2;
        var d = (points[i].y + points[i + 1].y) / 2;

        tmp_ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }

    tmp_ctx.quadraticCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
    );
    tmp_ctx.stroke();

};
//_________________________________________________________________________LineDrawer____________________________________________________________________
function lineDrawer(){
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);


    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    tmp_canvas.addEventListener('mousedown', line_event1, false);
    tmp_canvas.addEventListener('mouseup', line_event2, false);
}

var line_event1= function mousedown(e){
    tmp_canvas.addEventListener('mousemove', onCanvas_line, false);

    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;

    onCanvas_line();
};

var line_event2 = function mouseup(){
    tmp_canvas.removeEventListener('mousemove', onCanvas_line, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

};

var onCanvas_line = function() {

    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    tmp_ctx.beginPath();
    tmp_ctx.moveTo(start_mouse.x, start_mouse.y);
    tmp_ctx.lineTo(mouse.x, mouse.y);
    tmp_ctx.stroke();
    tmp_ctx.closePath();

};
//______________________________________________________________________EllipseDrawer_____________________________________________________________________
function ellipseDrawer(){

    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);


    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    tmp_canvas.addEventListener('mousedown', ellipse_event1, false);
    tmp_canvas.addEventListener('mouseup', ellipse_event2, false);
}


var ellipse_event1 = function mousedown(e){

    tmp_canvas.addEventListener('mousemove', onCanvas_ellipse, false);

    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;
    tmp_ctx.lineWidth = toolSize;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;

    onCanvas_ellipse();
};

var ellipse_event2 = function mouseup(){

    tmp_canvas.removeEventListener('mousemove', onCanvas_ellipse, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

};

var onCanvas_ellipse = function() {

    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);

    var w = Math.abs(mouse.x - start_mouse.x);
    var h = Math.abs(mouse.y - start_mouse.y);

    drawEllipse(tmp_ctx, x, y, w, h);
};

function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa,
        oy = (h / 2) * kappa,
        xe = x + w,
        ye = y + h,
        xm = x + w / 2,
        ym = y + h / 2;

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.closePath();
    ctx.stroke();
}

//__________________________________________________________________________CircleDrawer___________________________________________________________________________

function circleDrawer() {

    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);

    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    tmp_canvas.addEventListener('mousedown', circle_event1, false);
    tmp_canvas.addEventListener('mouseup', circle_event2, false);
}

var circle_event1 = function mousedown(e) {

    tmp_canvas.addEventListener('mousemove', onCanvas_circle, false);

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;

    onCanvas_circle();
};

var circle_event2 = function mouseup() {

    tmp_canvas.removeEventListener('mousemove', onCanvas_circle, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

};

var onCanvas_circle = function () {

    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    var x = (mouse.x + start_mouse.x) / 2;
    var y = (mouse.y + start_mouse.y) / 2;

    var radius = Math.max(
            Math.abs(mouse.x - start_mouse.x),
            Math.abs(mouse.y - start_mouse.y)
        ) / 2;

    tmp_ctx.beginPath();
    tmp_ctx.arc(x, y, radius, 0, Math.PI*2, false);
    // tmp_ctx.arc(x, y, 5, 0, Math.PI*2, false);
    tmp_ctx.stroke();
    tmp_ctx.closePath();
};


//____________________________________________________________________RectangleDrawer______________________________________________________________________
function rectangleDrawer(){
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);


    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    tmp_canvas.addEventListener('mousedown', rectangle_event1, false);
    tmp_canvas.addEventListener('mouseup', rectangle_event2, false);

}
var rectangle_event1 = function mousedown(e){
    tmp_canvas.addEventListener('mousemove', onCanvas_rectangle, false);

    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;
    tmp_ctx.lineWidth = toolSize;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;

    onCanvas_rectangle();
};
var rectangle_event2 = function mouseup(){
    tmp_canvas.removeEventListener('mousemove', onCanvas_rectangle, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

};
var onCanvas_rectangle = function() {

    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    var width = Math.abs(mouse.x - start_mouse.x);
    var height = Math.abs(mouse.y - start_mouse.y);
    tmp_ctx.strokeRect(x, y, width, height);

};

//____________________________________________________________________SquareDrawer______________________________________________________________________
function squareDrawer(){

    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);


    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    tmp_canvas.addEventListener('mousedown', square_event1, false);
    tmp_canvas.addEventListener('mouseup', square_event2, false);

}
var square_event1 = function mousedown(e){
    tmp_canvas.addEventListener('mousemove', onCanvas_square, false);

    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;
    tmp_ctx.lineWidth = toolSize;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;

    onCanvas_square();
};
var square_event2 = function mouseup(){
    tmp_canvas.removeEventListener('mousemove', onCanvas_square, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

};
var onCanvas_square = function() {

    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    var width = Math.abs(mouse.x - start_mouse.x);
    var height = Math.abs(mouse.y - start_mouse.y);
    var length = Math.min(height, width);

    if(width > height && mouse.x < start_mouse.x){
        tmp_ctx.strokeRect(x+(width - height), y, length, length);
    }
    else if(height > width && mouse.y < start_mouse.y){
        tmp_ctx.strokeRect(x, y + (height - width), length, length);
    }
    else{
        tmp_ctx.strokeRect(x, y, length, length);
    }
};


//_________________________________________________________________________TriangleDrawer__________________________________________________________________

var turn = 0;
var mouse_click1 = {x: 0, y: 0};
var mouse_click2 = {x: 0, y: 0};
var mouse_click3 = {x: 0, y: 0};

function triangleDrawer(){
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefisned' ? e.offsetY : e.layerY;
    }, false);

    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    tmp_canvas.addEventListener('mousedown', triangle_click, false);
}

var triangle_click = function(e){
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;
    tmp_ctx.lineWidth = toolSize;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    if(turn == 0) {
        turn++;
        mouse_click1.x = mouse.x;
        mouse_click1.y = mouse.y;
        triangle_spotting1();
    }
    else if(turn == 1){
        turn++;
        mouse_click2.x = mouse.x;
        mouse_click2.y = mouse.y;
        triangle_spotting2();
    }
    else if(turn == 2){
        turn =0;
        mouse_click3.x = mouse.x;
        mouse_click3.y = mouse.y;
        onCanvas_triangle();
    }
};
function triangle_spotting1 (){
    tmp_ctx.font = parseInt("35") +"px" + ' ' + "verdana";
    tmp_ctx.fillText("1", mouse_click1.x, mouse_click1.y);
    tmp_ctx.font = parseInt(toolSize) +"px" + ' ' + "verdana";
};

function triangle_spotting2 (){
    tmp_ctx.font = parseInt("35") +"px" + ' ' + "verdana";
    tmp_ctx.fillText("2", mouse_click2.x, mouse_click2.y);
    tmp_ctx.font = parseInt(toolSize) +"px" + ' ' + "verdana";

    tmp_ctx.beginPath();
    tmp_ctx.moveTo(mouse_click2.x, mouse_click2.y);
    tmp_ctx.lineTo(mouse_click1.x, mouse_click1.y);
    tmp_ctx.stroke();
    tmp_ctx.closePath();
};

var onCanvas_triangle = function() {
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    tmp_ctx.beginPath();
    tmp_ctx.moveTo(mouse_click2.x, mouse_click2.y);
    tmp_ctx.lineTo(mouse_click1.x, mouse_click1.y);
    tmp_ctx.moveTo(mouse_click3.x, mouse_click3.y);
    tmp_ctx.lineTo(mouse_click2.x, mouse_click2.y);
    tmp_ctx.moveTo(mouse_click1.x, mouse_click1.y);
    tmp_ctx.lineTo(mouse_click3.x, mouse_click3.y);
    tmp_ctx.stroke();
    tmp_ctx.closePath();

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
};


//_______________________________________________________________________SprayDrawer____________________________________________________________________
var sprayIntervalID;
function sprayDrawer(){
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);


    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;

    tmp_canvas.addEventListener('mousedown', spray_event1, false);
    tmp_canvas.addEventListener('mouseup', spray_event2, false);
}
var spray_event1 = function mousedown(e){
    tmp_canvas.addEventListener('mousemove', onCanvas_spray, false);

    tmp_ctx.strokeStyle = line_color;
    tmp_ctx.fillStyle = line_color;
    tmp_ctx.lineWidth = toolSize;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;

    onCanvas_spray();
    sprayIntervalID = setInterval(onCanvas_spray, 50);
};

var spray_event2 = function mouseup(){
    tmp_canvas.removeEventListener('mousemove', onCanvas_spray, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    clearInterval(sprayIntervalID);
};

var onCanvas_spray = function() {

    // tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    var x = mouse.x;
    var y = mouse.y;

    generateSprayParticles();
};

var getRandomOffset = function(radius) {
    radius = toolSize*2;
    var random_angle = Math.random() * (2*Math.PI);
    var random_radius = Math.random() * radius;

    return {
        x: Math.cos(random_angle) * random_radius,
        y: Math.sin(random_angle) * random_radius
    };
};

var generateSprayParticles = function() {
    var density = 50;

    for (var i = 0; i < density; i++) {
        var offset = getRandomOffset(10);

        var x = mouse.x + offset.x;
        var y = mouse.y + offset.y;

        tmp_ctx.fillRect(x, y, 1, 1);
    }
};
//________________________________________________________________________Eraser_________________________________________________________________________
function eraser(){
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);


    tmp_ctx.lineWidth = toolSize;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = "white";
    tmp_ctx.fillStyle = "white";

    tmp_canvas.addEventListener('mousedown', eraser_event1, false);
    tmp_canvas.addEventListener('mouseup', eraser_event2, false);
}

var eraser_event1 = function mousedown(e){
    tmp_canvas.addEventListener('mousemove', onCanvas_eraser, false);

    tmp_ctx.strokeStyle = "white";
    tmp_ctx.fillStyle = "white";
    tmp_ctx.lineWidth = toolSize;

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    points.push({x: mouse.x, y: mouse.y});

    onCanvas_eraser();
};


var eraser_event2 = function mouseup(){
    tmp_canvas.removeEventListener('mousemove', onCanvas_eraser, false);

    ctx.drawImage(tmp_canvas, 0, 0);
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    points = [];
};

var onCanvas_eraser = function() {

    points.push({x: mouse.x, y: mouse.y});

    if (points.length < 3) {
        var b = points[0];
        tmp_ctx.beginPath();
        tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
        tmp_ctx.fill();
        tmp_ctx.closePath();

        return;
    }

    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    tmp_ctx.beginPath();
    tmp_ctx.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length - 2; i++) {
        var c = (points[i].x + points[i + 1].x) / 2;
        var d = (points[i].y + points[i + 1].y) / 2;

        tmp_ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }

    tmp_ctx.quadraticCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
    );
    tmp_ctx.stroke();

};
//___________________________________________________________________________TEXTTOOL___________________________________________________________________

function textTool(){
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);

    document.getElementById("tmp_canvas").addEventListener("click", textGrabber, false);
}

var textGrabber = function(){
    ctx.font = parseInt(toolSize) +"px" + ' ' + "verdana";
    ctx.fillStyle = line_color;
    var text = prompt("متن :", "");
    if (text != null) {
        ctx.fillText(text, mouse.x,mouse.y);
    }
};


