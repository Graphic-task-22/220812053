import * as THREE from 'three';

const arc = new THREE.EllipseCurve(0, 0, 100, 50);
const points = arc.getPoints(100); // 更多点使线更平滑
const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({ color: 'orange' });
const line = new THREE.Line(geometry, material);

export default line;
