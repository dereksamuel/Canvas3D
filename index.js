import * as THREE from "https://cdn.skypack.dev/three@latest";
import { OrbitControls } from "https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // First get ahold of the legacy getUserMedia, if present
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}


navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, }).then((stream) => {
  // Get texture dom element video
  const video = document.getElementById("video");
  video.srcObject = stream;
  video.play();

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