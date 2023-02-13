
let w = 500;
let h = 500;
let cells = 33;
let spacer = (w - 1) / cells;
let m;
let s;
let v;
let stack = [];
let ls;
let safe = false;
let ld = .53;
let button;
let reset = false;
let speed;
function setup() {
  var canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  background(255);
  // make random 
  initMSV();
  stack.push(nextv());
  initls();
  //controls
  button = createButton("reset");
  button.position(460 ,10);
  button.mousePressed(reseter);

  speed = createSlider(0, 255, 188);
  speed.position(100, 10);
  speed.style('width', '300px');
 
  

}
function draw() {
  drawGrid();
  if(reset){ initMSV();}
  if (stack.length === 0) {
    // the stack is empty
    
    if (!safe) {
        // wipe the local s
        wipexLsm();
        initls();
    }
    else {
      initls();
    }
    safe = false;
    stack.push(nextv());
  }
  var top = stack.pop();
  v[top[0]][top[1]] = 1;
  s[top[0]][top[1]] = 1;
  ls[top[0]][top[1]] = 1;
  if (isEdge(top[0],top[1])) {
    safe = true;
  }
  if (top[0]-1 >=0) {
    if (v[top[0]-1][top[1]  ] != 1) if (m[top[0]-1][top[1]  ] === 1)   {stack.push([top[0]-1,top[1]  ]);v[top[0]-1][top[1]  ] = 1}
  }
  if (top[0]+1 < cells) {
    if (v[top[0]+1][top[1]  ] != 1) if (m[top[0]+1][top[1]  ] === 1)   {stack.push([top[0]+1,top[1]  ]);v[top[0]+1][top[1]  ] = 1}
  }
  if (top[1]-1 >= 0) { 
    if (v[top[0]  ][top[1]-1] != 1) if (m[top[0]  ][top[1]-1] === 1)   {stack.push([top[0]  ,top[1]-1]);v[top[0]  ][top[1]-1] = 1}
  }
  if (top[1]+1 < cells) {
    if (v[top[0]  ][top[1]+1] != 1) if (m[top[0]  ][top[1]+1] === 1)   {stack.push([top[0]  ,top[1]+1]);v[top[0]  ][top[1]+1] = 1}
  }
  let val = 255 - speed.value();
  blit();
  wait(val);
  
}
function reseter() {
  initMSV();
  initls();
  stack = [];
}


function drawGrid() {
  for (var x = 0; x < w; x+= spacer) {
    for (var y = 0; y < h; y+= spacer) {
      fill(255);
      rect(x, y, x+spacer, y+spacer);
    }
  }
}
function wipexLsm() {
  for (var i = 0; i < cells; i++) {
    for (var j = 0; j < cells; j++) {
      if (ls[i][j] === 1) {
          m[i][j] = 0;
          s[i][j] = 0;
      }
      
    }
  }
}
function initls() {
  ls = new Array(cells);
  for (var i = 0; i < m.length; i++) {
    ls[i] = new Array(cells);
    ls[i].fill(0);
  }
}
function nextv() {
  for (var x = 0; x < cells ; x++) {
    for (var y= 0; y < cells; y++) {
      if (m[x][y] === 1 && v[x][y] === 0) {
        return [x,y];
      }
    }
  }
  initMSV();
  for (var x = 0; x < cells ; x++) {
    for (var y= 0; y < cells ; y++) {
      if (m[x][y] === 1 && v[x][y] === 0) {
        return [x,y];
      }
    }
  }
}
function colorIn(x,y, c){
  fill(c);
  rect(x*spacer,y*spacer,spacer,spacer);
}
function initMSV() {
  m = new Array(cells);
  s = new Array(cells);
  v = new Array(cells);
  for (var i = 0; i < m.length; i++) {
    m[i] = new Array(cells);
    m[i].fill(0);
    s[i] = new Array(cells);
    s[i].fill(0);
    v[i] = new Array(cells);
    v[i].fill(0);
  }
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m.length; j++) {
      var r =Math.random();
      if (r < ld) {
        m[i][j] = 1;
      }
      else  {
        m[i][j]  = 0;
      }

    }
  }
}
function isEdge(x,y) {
  if (x === 0 || x === (cells -1)|| y === 0 || y === (cells -1)){
    return true;
  }
  return false;
}
function blit() {
  for (var x = 0; x < m.length; x++) {
    for (var y = 0; y < m.length; y++) {
      if (m[x][y] === 1) {
        colorIn(x,y, 150);
      }
      if (s[x][y] === 1) {
        colorIn(x,y, 0);
      }
      if (ls[x][y] === 1) {
        colorIn(x,y,0);
      }
    }
  }
}
function wait(time)
{
  start = millis()
  do
  {
    current = millis();
  }
  while(current < start + time)
}
