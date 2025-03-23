import * as THREE from "three";

// 创建椎体几何体 (底部半径=20，高度=50，分段数=32)
const geometry = new THREE.ConeGeometry(20, 50, 32);

// 创建材质（粉色）
const material = new THREE.MeshPhongMaterial({
  color: 0xFF69B4, // 粉色
  opacity: 0.9,
  transparent: true,
  shininess: 100,
});

// 创建椎体网格
const cone = new THREE.Mesh(geometry, material);

// 设置椎体位置
cone.position.set(30, 25, 50);

export default cone;
