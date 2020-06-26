import "./styles/index.scss";
// import * as THREE from "three";

var container;
var camera, scene, raycaster, renderer, mouse, mesh, mesh2, mesh3;

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  scene.background = new THREE.TextureLoader().load("src/assets/heaven_ft.jpg");

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector3();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
camera.position.z = 5;

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0,1,0);
directionalLight.castShadow = true;
// scene.add(directionalLight);
var light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,300,500);
// scene.add(light);
var light2 = new THREE.PointLight(0xc4c4c4,10);
light2.position.set(500,100,0);
// scene.add(light2);
var light3 = new THREE.PointLight(0xc4c4c4,10);
light3.position.set(0,100,-500);
// scene.add(light3);
var light4 = new THREE.PointLight(0xc4c4c4,10);
light4.position.set(-500,300,500);
// scene.add(light4);
const light5 = new THREE.AmbientLight( 0xffffff, 1.0 );
scene.add(light5)
var spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
scene.add(spotLight);
var spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set( -200, -200, -200);
scene.add(spotLight2);

// light.position.set(10,10,10).normalize();
// scene.add(light); 
// const light6 = new THREE.PointLight(0xFFFFFF, 1, 500);
// light.position.set(1,1,1).normalize();
// scene.add(light6); 
// delete


var loader = new THREE.GLTFLoader();
loader.load("src/assets/gltf/playground/scene.gltf", function(gltf) {
  console.log(gltf.scene);
  var model1 = gltf.scene;
  model1.scale.set(0.2, 0.2, 0.2);
  model1.position.x = -1.75;
  model1.position.y = 0;
  model1.rotation.x = 0.2;
  scene.add(model1);
  renderer.render(scene, camera);
}); // (...onprogress, error cb)


//object 1
// var geometry = new THREE.PlaneGeometry(1.0, 1.0, 16, 16);
// texture.encoding = THREE.sRGBEncoding;
// texture.anisotropy = 16;

// var material = new THREE.MeshStandardMaterial({ map: texture });
// var geometry = new THREE.SphereGeometry(0.4, 32, 32);
// var texture = new THREE.TextureLoader().load("src/assets/autumn3.jpg");
// var material = new THREE.MeshPhongMaterial( {map: texture} );
// mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = -1.0;
// mesh.position.z = 0.5;
// scene.add(mesh);

// object 2
// var geometry = new THREE.PlaneGeometry(1.0, 1.0, 16, 16);
// var geometry = new THREE.SphereGeometry(0.4, 32, 32);
// var texture = new THREE.TextureLoader().load("src/assets/rain.jpg");
// var material = new THREE.MeshPhongMaterial({ map: texture });
// mesh2 = new THREE.Mesh(geometry, material);
// mesh2.position.y = 1;
// mesh2.position.x = 2;
// scene.add(mesh2);

//object 3
// var geometry = new THREE.SphereGeometry(0.4, 32, 32);
// // var geometry = new THREE.PlaneGeometry(1.0, 1.0, 16, 16);
// var texture = new THREE.TextureLoader().load("src/assets/stone1.jpg");
// var material = new THREE.MeshPhongMaterial({ map: texture });
// mesh3 = new THREE.Mesh(geometry, material);
// mesh3.position.y = 1;
// mesh3.position.x = -2;
// scene.add(mesh3);

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaFactor = 10;
renderer.gammaOutput = true;
container.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth /window.innerHeight;

    camera.updateProjectionMatrix();
})

window.addEventListener('click', onMouseClick);
};
 

function onMouseClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    console.log(scene.children);
    raycaster.setFromCamera(mouse, camera);


    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
      intersects[i].object.material.transparent = true;
      var t1 = new TimelineMax();
      t1.to(intersects[i].object.material, 3, { opacity: 0 });
      setTimeout(function(){scene.children=[]}, 3000);
    }   
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
    camera.lookAt(scene.position);
    for (let i = 0; i < scene.children.length; i++) {
      // scene.children[i].rotation.x += 0.005;
      scene.children[i].rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

init();
animate();

