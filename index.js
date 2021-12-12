import * as THREE from "https://cdn.skypack.dev/three@latest";
import { OrbitControls } from "https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, }).then((stream) => {
  // Get texture dom element video
  const video = document.getElementById("video");
  video.srcObject = stream;

  const texture = new THREE.VideoTexture(video);

  // Materials and Objects(the shapes)
  const geometry = new THREE.PlaneGeometry(5, 5);
  const material = new THREE.MeshBasicMaterial( {
    map: texture,
  } );

  // Mesh Camera
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);

  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
  };

  animate();
});

// Three js para el futuro porque webgl es muy comple