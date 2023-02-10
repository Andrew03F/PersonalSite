function setup() {
    createCanvas(700, 700);
    t = 0;
    x = 0;
    y = 0;
  }
  
  function draw() {
    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(x, y, 80 *sin(t),cos(t) *80);
    t  += .05;
    x = x % 700;
    y = y % 700;
    r = Math.random()
    x+= r * 5; y +=5;
  }