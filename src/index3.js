import "./styles/index.scss";
import * as THREE from "three";

const scene = new THREE.Scene();
const background = new THREE.TextureLoader().load("src/assets/heaven_ft.jpg");
scene.background = background;

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth /window.innerHeight;

    camera.updateProjectionMatrix();
})

//object 1
const geometry = new THREE.PlaneGeometry(1.0, 1.0, 16, 16);
const texture = new THREE.TextureLoader().load("src/assets/crate.gif");
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//object 2
// const geometry = new THREE.SphereGeometry(1, 10, 4);
// const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
// const mesh2 = new THREE.Mesh(geometry, material);
// mesh2.position.y = 2;
// scene.add(mesh2);

const light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(1,1,1).normalize();
scene.add(light); 


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
 
function raycastMeshes(preScene, preRaycaster, callback) {
  var scene = preScene || scene || new THREE.Scene();
  var raycaster = preRaycaster || raycaster || new THREE.Raycaster();

  for (var i in scene.children) {
    if (scene.children[i] instanceof THREE.Group) {
      intersects = raycaster.intersectObjects(scene.children[i].children, true);
    //   console.log(intersects);
    } else if (scene.children[i] instanceof THREE.Mesh) {
      var intersects = [];
      intersects.push(...raycaster.intersectObject(scene.children[i]));
      console.log(raycaster.intersectObject(scene.children[i]));
    }

  }

  if (intersects.length > 0) {
    return callback(intersects);
  } else {
    return null;
  }
}

function changeColor(intersects){
    for (var i=0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);  
    }
};

function onMouseClick(event){
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
    console.log(raycaster);
    raycaster.setFromCamera(mouse, camera);
    camera.lookAt(scene.position);
    console.log(raycaster); 
    raycastMeshes(scene, raycaster, changeColor);

    const t1 = new TimelineMax();
    t1.to(mesh.position, .5, { x: 2, ease: Expo.easeOut })
    t1.to(mesh.position, .5, { y: 0, ease: Expo.ease })

    renderer.render(scene, camera);
}
window.addEventListener('click', onMouseClick);

function animate() {
  requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();


//   renderer.render(scene, camera);
// };

// storing code from index.js
// function raycastMeshes(preScene, preRaycaster, callback) {
//   var scene = preScene || scene || new THREE.Scene();
//   var raycaster = preRaycaster || raycaster || new THREE.Raycaster();
//   console.log(scene.children);
//   var intersects = [];
//   for (let i = 0; i < scene.children.length; i++) {
//     if (scene.children[i] instanceof THREE.Group) {
//       intersects = raycaster.intersectObjects(scene.children[i].children, true);
//     } else if (scene.children[i] instanceof THREE.Mesh) {
//       intersects.push(...raycaster.intersectObject(scene.children[i]));
//       console.log(intersects);  
//     }
 
//   }

//   if (intersects.length > 0) {
//     return callback(intersects);
//   } else {
//     return null;
//   }
// }

// function changeColor(intersects){
//   for (var i=0; i < intersects.length; i++) {
//       intersects[i].object.material.color.set(0xff0000);  
//   }
// };

  // onMouseClick
  // intersects[i].object.material.color.set(0xff0000);
      // TweenLite.to(intersects[i].object.material, 2, {opacity: 0});
      // scene.remove(intersects[i].object);
      // t1.to(mesh.position, .5, { y: 0, ease: Expo.ease }

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
