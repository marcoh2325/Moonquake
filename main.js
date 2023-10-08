import * as THREE from "three";
import { OrbitControls } from "three";
import { Planet } from "./Planet.js";
import { Stars } from "./Stars.js";
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");
var ambiente = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambiente);
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  2000
);
//camera.position.z += 10;
const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
//renderer.toneMappingExposure=1;
var canvas = document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, canvas);
//controls.enableZoom = false;
controls.maxDistance = 23;
controls.minDistance = 23;
controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.enablePan = false;
controls.autorotate = true;
renderer.setSize(window.innerWidth, window.innerHeight);
var sunlight = new THREE.PointLight(0xf6ecea, 6000, 100);
var light = new THREE.Group();
light.add(sunlight);
sunlight.position.x -= 50;
scene.add(light);
var texMoon = [
  "./assets/moon/color-balance.jpg",
  "./assets/moon/heigth.png",
  "./assets/moon/normal.png",
  "./assets/moon/impactosFinal.jpg",
];
var moon = new Planet(texMoon, 80, 0.1);
scene.add(moon.obj);
document.getElementById("cambiar").onclick = function () {
  cambiarModo();
};
function cambiarModo() {
  console.log("hola");
  moon.switchTex(sunlight, ambiente);
}
var stars = new Stars();
scene.add(stars.particles);
//lunar info
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

var startPoint = new THREE.Vector3(0,0,0); // Punto de inicio de la onda
const duration = 6; // Duración de la onda en segundos
const speed = 1; // Velocidad de expansión de la onda

var circleGeometry = new THREE.CircleGeometry(0.08, 32);
var circleMaterial = new THREE.MeshBasicMaterial({ color: 'red', transparent: true, opacity: 0.7,side:THREE.DoubleSide });
var circle = new THREE.Mesh(circleGeometry, circleMaterial);
scene.add(circle);
var reloj = new THREE.Clock(true);
var radius = 0;
//
requestAnimationFrame(Update);
function Update() {
  requestAnimationFrame(Update);
  stars.particles.rotateY(-0.0002);
  light.rotateY(0.005);
  //
  radius += reloj.getDelta()*14;
  circle.scale.set(radius,radius,radius);
  circle.translateZ(0.0008);
  if (radius >= 14)
  {
    radius = 0;
    circle.position.copy(startPoint);
  }
  //
  controls.update();
  renderer.render(scene, camera);
}
function showWave(lat,lon){
  startPoint = getSeism(8.04,lat,lon);
  radius = 0;
  circle.position.copy(startPoint);
  circle.lookAt(moon.obj.position);
}
window.addEventListener(
  "message",
  (event) => {
    console.log(event.data);
    showWave(parseFloat(event.data[0]),parseFloat(event.data[1]));
  },
  false,
);
function getSeism(radius, lat, lon) {
  var phi = (90 - lat) * (Math.PI / 180);
  var theta = (lon + 180) * (Math.PI / 180);
  var x = -(radius * Math.sin(phi) * Math.cos(theta));
  var z = radius * Math.sin(phi) * Math.sin(theta);
  var y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}
