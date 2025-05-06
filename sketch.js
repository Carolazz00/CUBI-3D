/**
 * @typedef {import("./p5/types").Graphics} Graphics
 *
 * @typedef {Object} Cubo
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} size
 * @property {string} color
 * @property {function} rotationFunction
 */

//
let myFont;

function preload() {
  myFont = loadFont("./RAVIE.TTF");
}

/** @type {Cubo[]} */
let cubi = [];

let copie = 100;

/** @type {Graphics} */
let g;

//

function setup() {
  createCanvas(windowWidth, windowHeight, "webgl");

  g = createGraphics(100, 100);

  let distanza = 500;
  for (let i = 0; i < copie; i++) {
    let cubo = {
      x: random(-distanza, distanza),
      y: random(-distanza, distanza),
      z: random(-distanza, distanza),
      size: 100,
      color: random(["pink", "yellow", "blue"]),
      rotationFunction: random([rotateX, rotateY]),
    };
    cubi.push(cubo);
  }
}

function draw() {
  background("LavenderBlush");
  orbitControl();
  rotateY(frameCount * 0.005);
  stroke("deeppink");
  strokeWeight(10);
  g.background("HOTPINK");
  g.textFont(myFont);
  g.textAlign(CENTER, CENTER);
  g.text("ZHU", g.width / 2, g.height / 2);
  g.textSize(30);
  g.fill("WHITE");

  texture(g);

  for (let cubo of cubi) {
    push();
    translate(cubo.x, cubo.y, cubo.z);

    let velocita = frameCount * 0.005;
    cubo.rotationFunction(velocita);
    rotateZ(velocita);

    box(cubo.size, 60);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//function mouseClicked() {
// saveGif("mySketch", 2);
//}
