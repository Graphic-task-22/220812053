import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
const noise2D = createNoise2D();

const geometry = new THREE.PlaneGeometry(500, 500, 200, 200);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color('orange'),
  wireframe: true,
  //wireframe: false, 
  vertexColors: true,
});
const mesh = new THREE.Mesh(geometry, material);
const positions = geometry.attributes.position;
const vertexCount = positions.count;

// 添加颜色数组
const colors = new Float32Array(vertexCount * 3); // 每个顶点一个 RGB

const color = new THREE.Color();

// 调整噪声缩放比例
const scale = 0.01;
const amplitude = 40;

let time = 0;

// 动态更新地形高度
function updateTerrain(){
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    // 使用simplex噪声生成连续高度
    const z = noise2D(x * scale+ time, y * scale+ time) * amplitude;
    positions.setZ(i, z);

     //  将高度归一化为 0 ~ 1（用于映射颜色）
    const heightRatio = (z + amplitude) / (amplitude * 2); // z ∈ [-amp, amp]
    //高度颜色渐变：绿色 → 黄色 → 白色
        if (heightRatio < 0.5) {
          // 低 → 中：绿到黄
          color.setRGB(heightRatio * 2, 1, 0); // 0~1,1,0
        } else {
          // 中 → 高：黄到白
          const t = (heightRatio - 0.5) * 2;
          color.setRGB(1, 1 - t * 0.5, t); // 1,1~0.5,0~1
        }
    
    //写入 color array
    colors[i * 3 + 0] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
}
// 更新几何体属性以生效
positions.needsUpdate = true;
geometry.attributes.color.needsUpdate = true;
geometry.computeVertexNormals();
time += 0.002; // 控制波动速度
}


geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
// 暴露 update 函数
mesh.userData.update = updateTerrain;
// 旋转至X-Z平面呈现为地形
mesh.rotateX(Math.PI / 2);



export default mesh;