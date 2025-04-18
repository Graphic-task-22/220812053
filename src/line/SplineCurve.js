import * as THREE from 'three';

const vector2 =[
    new THREE.Vector2(0,0),
    new THREE.Vector2(100,100),
    new THREE.Vector2(200,10)
];

// 创建样条曲线
const curve = new THREE.SplineCurve(vector2);
// 生成曲线上的点，用于绘制线条
const points =curve.getPoints(50);
const geometry=new THREE.BufferGeometry().setFromPoints(points);
const material =new THREE .LineBasicMaterial({color:0xff0000});
const line = new THREE.Line(geometry, material);



 export default line;