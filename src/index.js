import "./styles/index.scss";
// import * as THREE from "three";

var container;
var camera, scene, raycaster, renderer, mouse;

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

  // var loader = new THREE.FontLoader();
  // loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
  //   var geometry = new THREE.TextGeometry( 'Hello three.js!', {
  //     font: font,
  //     size: 80,
  //     height: 5,
  //     curveSegments: 12,
  //     bevelEnabled: true,
  //     bevelThickness: 10,
  //     bevelSize: 8,
  //     bevelOffset: 0,
  //     bevelSegments: 5
  //   } );
  //   scene.add(model1);
  //   renderer.render(scene, camera);
  // } );

  var loader = new THREE.GLTFLoader();
  loader.load("src/assets/gltf/chess/scene.gltf", function (gltf) {
    var model1 = gltf.scene;
    console.log(model1);
    model1.scale.set(1, 1, 1);
    model1.position.x = -1.75;
    model1.position.y = 0;
    model1.rotation.x = 0.2;
    scene.add(model1);
    renderer.render(scene, camera);
  }); // (...onprogress, error cb)

  loader.load("src/assets/gltf/open_book/scene.gltf", function(gltf) {
    var model2 = gltf.scene;
    model2.scale.set(0.07, 0.07, 0.07);
    model2.position.x = 2.5;
    model2.position.y = 0;
    model2.rotation.x = 0.4;
    scene.add(model2);
    renderer.render(scene, camera);
  });

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
  window.addEventListener('click', changeHeader);
};
 
function changeHeader(event){
  const header = document.getElementById("header-text");
  header.innerHTML = "Now a teen..."
}

 

function onMouseClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    console.log(scene.children);
    raycaster.setFromCamera(mouse, camera);


    var intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects);
    for (var i = 0; i < intersects.length; i++) {
      intersects[i].object.material.transparent = true;
      var t1 = new TimelineMax();
      t1.to(intersects[i].object.material, 3, { opacity: 0 });
      // setTimeout(function(){scene.children=[]}, 3000);
      // group.uuid = E34A4EE8-B572-44DD-A7A1-8081124DC5D5
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
      scene.children[i].rotation.y += (Math.random() ) * Math.PI / 180;
    }

    renderer.render(scene, camera);
}

init();
animate();

