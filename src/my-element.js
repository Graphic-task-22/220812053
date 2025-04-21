import * as THREE from "three";
import  cube from "./mesh/cube"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/addons/libs/stats.module.js';
import sphere from './mesh/sphere';
import cone from "./mesh/cone"; 
import floor from "./mesh/floor";
import line from "./line/line"
import tuoyuan from "./line/EllipseCurve"
import SplineCurve from "./line/SplineCurve"
import QuadraticBezierCurve from "./line/QuadraticBezierCurve"
import mountain from "./demo/mountain"
import { mesh, tubePoints } from "./demo/tunnel"
import buffer from "./mesh/buffer";
import lathe from "./mesh/lathe";
import shape from "./mesh/shape";
import { createSprite } from './sprite'; 
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer,camera,scene,controls,ambientLight;


function init(){
  // 建立场景
scene = new THREE.Scene();


// scene.add(cube)
// scene.add(sphere);
// scene.add(cone);
// scene.add(floor);
//scene.add(line );
//scene.add(tuoyuan);
//scene.add(SplineCurve);
//scene.add(QuadraticBezierCurve);
//scene.add(mountain);
//scene.add(buffer);
//scene.add(lathe);
//scene.add(shape);
scene.add(tunnel);

// // 使用精灵创建函数创建精灵
// const sprite = createSprite('/assets/snowflake2.png'); 
// scene.add(sprite);
// console.log(sprite.material); // 查看精灵的材质信息

  // 环境光
ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 创建相机 使用的是 PerspectiveCamera（透视摄像机）
camera = new THREE.PerspectiveCamera(
  75, // 视野角度（FOV）
  window.innerWidth / window.innerHeight, // 长宽比（aspect ratio）
  0.1, // 近截面（near）
  1000 // 远截面（far）
);
// 设置相机摆放的位置
camera.position.set(100, 100, 100);
// 设置相机看向的位置
camera.lookAt(0,0,0);



// WebGLRenderer 渲染器
 renderer = new THREE.WebGLRenderer();
// 渲染器的尺寸

renderer.setSize(window.innerWidth, window.innerHeight);
//  renderer（渲染器）的dom元素（renderer.domElement）添加到 HTML 文档中
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

 // 渲染循环
 function animate() {
  requestAnimationFrame(animate);

    // 每一帧调用 mesh.userData.update()
    if (mountain.userData.update) {
      mountain.userData.update();
    }
  
    



  renderer.render(scene, camera);

}



animate();  // 开始渲染


}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.render(scene, camera); 
  //没有动画的时候需要重新render
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

function initHelper(params){
  // 辅助坐标轴
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);


// 设置相机控件轨道控制器OrbitControls
 controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
  renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件

// 添加一个辅助网格地面 网格地面辅助观察GridHelper
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);

}

function initStats(params) {
  const stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement);
  // 渲染函数
  function render() {
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
    stats.update();
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
}

init();
initHelper()
initStats();

const gui = new GUI();
console.log('gui', gui);

// 渲染函数
function render() {
  renderer.render(scene, camera);
}
// 执行方法
// const settings = {
//   clear() {
//     // 重置所有物体的位置，颜色等
//     cube.position.set(0, 0, 0);
//     sphere.position.set(0, 0, 0);
//     cone.position.set(0, 0, 0);
//     cube.material.color.setHex(0xffffff);
//     sphere.material.color.setHex(0xffffff);
//     cone.material.color.setHex(0xffffff);
//     cube.material.opacity = 1;
//     sphere.material.opacity = 1;
//     cone.material.opacity = 1;
//     render();
//   },
//   setDefault() {
//     // 设置 cube 默认位置为 (0, 0, 0)
//     cube.position.set(0, 0, 0);
//     cube.material.color.setHex(0xFFC0CB);
//     render();
//   },
//   resetLight() {
//     ambientLight.intensity = 1;  // 恢复环境光的强度
//     render();
//   },
//   x: 0,
//     // 添加颜色控制
//     cubeColor: `#${cube.material.color.getHexString()}`,  // 使用立方体的当前颜色
//     // 立方体的位置控制
//   cubePosition: {
//     x: cube.position.x,
//     y: cube.position.y,
//     z: cube.position.z,
//   },
//     // 立方体透明度控制
//     cubeOpacity: cube.material.opacity,  // 初始透明度为立方体的当前透明度
//     // 环境光控制
//   ambientLightIntensity: ambientLight.intensity,  // 环境光强度
//   ambientLightColor: `#${ambientLight.color.getHexString()}`,  // 环境光颜色
// };

// gui.add(settings, 'clear').name('重置所有物体'); //0
// gui.add(settings, 'setDefault').name('设置默认位置'); // 重置到默认值
// gui.add(settings, 'resetLight').name('恢复环境光强度'); // 重置环境光强度
// gui.add(settings, 'x', -100, 100).name('X轴位置'); // 重置环境光强度

// // 颜色选择器
// gui.addColor(settings, 'cubeColor').name('立方体颜色').onChange((value) => {
//   cube.material.color.set(value); // 修改立方体颜色
//   render();
// });

// // 立方体位置控制
// const cubePositionFolder = gui.addFolder("立方体位置");
// cubePositionFolder.add(settings.cubePosition, 'x', -100, 100).onChange((value) => {
//   cube.position.x = value;
//   render();
// });
// cubePositionFolder.add(settings.cubePosition, 'y', -100, 100).onChange((value) => {
//   cube.position.y = value;
//   render();
// });
// cubePositionFolder.add(settings.cubePosition, 'z', -100, 100).onChange((value) => {
//   cube.position.z = value;
//   render();
// });
// cubePositionFolder.open(); // 展开位置控制文件夹
// // 立方体透明度控制
// gui.add(settings, 'cubeOpacity', 0, 1).step(0.01).name('立方体透明度').onChange((value) => {
//   cube.material.opacity = value;
//   cube.material.transparent = value < 1;  // 如果透明度小于1，则启用透明
//   render(); // 调用渲染函数
// });
// // 创建环境光控制文件夹
// const ambientLightFolder = gui.addFolder('环境光');

// // 环境光强度控制
// ambientLightFolder.add(settings, 'ambientLightIntensity', 0, 2).step(0.01).name('强度').onChange((value) => {
//   ambientLight.intensity = value;  // 更新环境光强度
//   render();
// });

// // 环境光颜色控制
// ambientLightFolder.addColor(settings, 'ambientLightColor').name('颜色').onChange((value) => {
//   ambientLight.color.set(value);  // 更新环境光颜色
//   render();
// });

// ambientLightFolder.open(); // 展开环境光控制文件夹
