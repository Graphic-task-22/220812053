import * as THREE from 'three';

// 创建一个精灵对象并返回
export function createSprite(texturePath) {
  // 创建精灵材质
  const texture = new THREE.TextureLoader().load(texturePath);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });

  // 创建精灵
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(0, 10, 0); // 初始位置
  sprite.scale.set(5, 5, 1); // 设置缩放
  return sprite;
}
