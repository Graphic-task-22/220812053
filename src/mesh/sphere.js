import * as THREE from 'three';
import earthTexture from '../assets/glass.jpg';

// 创建贴图加载器
const textureLoader = new THREE.TextureLoader();
// 加载贴图
const texture = textureLoader.load(
  earthTexture, 
  () => console.log('贴图加载完成'),
  undefined,
  (error) => console.error('贴图加载失败:', error)
);

var sphereGeometry = new THREE.SphereGeometry(30, 30, 30);
var sphereMaterial = new THREE.MeshPhongMaterial({
  map: texture,  // 贴图
  //opacity: 0.8,
  transparent: true,
});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.set(-50, 50, 50);
export default sphere; // Path: src/mesh/cube.js
