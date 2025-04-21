import * as THREE from 'three';

// 创建盾牌轮廓（近似形状）
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.quadraticCurveTo(0, 60, 50, 100);  // 左下到顶部
shape.quadraticCurveTo(100, 60, 100, 0); // 顶部到右下
shape.quadraticCurveTo(100, -30, 50, -50); // 右下到底部尖角
shape.quadraticCurveTo(0, -30, 0, 0);     // 底部尖角回到左下
shape.closePath();

// 创建星形孔洞
const starPath = new THREE.Path();
const cx = 50, cy = 30, spikes = 5, outerRadius = 15, innerRadius = 7;

let rot = Math.PI / 2 * 3;
let step = Math.PI / spikes;
starPath.moveTo(cx, cy - outerRadius);
for (let i = 0; i < spikes; i++) {
    let x = cx + Math.cos(rot) * outerRadius;
    let y = cy + Math.sin(rot) * outerRadius;
    starPath.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    starPath.lineTo(x, y);
    rot += step;
}
starPath.closePath();

// 把星星作为孔洞添加到盾牌里
shape.holes.push(starPath);

// 挤出厚度（盾牌立体化）
const extrudeSettings = {
    depth: 10,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

const material = new THREE.MeshLambertMaterial({
    color: 'lightblue',
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);

// 可选：让盾牌稍微立起来看看效果
mesh.rotation.x = -Math.PI / 6;

export default mesh;
