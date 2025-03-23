import * as THREE from 'three';
import fl from '../assets/fl.jpg';
// 纹理加载器
const textureLoader = new THREE.TextureLoader();

// 加载网格贴图
const gridTexture = textureLoader.load(fl, () => {
    console.log('✅ 纹理加载成功', gridTexture);
  }, undefined, (err) => {
    console.error('❌ 纹理加载失败', err);
  });

// 让纹理在地板上重复，形成完整的网格效果
gridTexture.wrapS = THREE.RepeatWrapping;
gridTexture.wrapT = THREE.RepeatWrapping;
gridTexture.repeat.set(10, 10); // 让网格重复 10x10

// 创建地板几何体
const floorGeometry = new THREE.PlaneGeometry(500, 500);

// 创建材质，应用贴图
const floorMaterial = new THREE.MeshStandardMaterial({
  map: gridTexture, // 贴图
  side: THREE.DoubleSide, // 让地板正反面都可见
});

// 创建地板网格
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

// 旋转地板，使其水平放置
floor.rotation.x = -Math.PI / 2;

// 设置地板位置
floor.position.set(0, 0, 0); 

export default floor;
