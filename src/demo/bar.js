import * as THREE from 'three';

const group = new THREE.Group();

function createLine(type){
    const points=[
            new THREE.Vector3(0,0,0),
            type === 'y' ? new THREE.Vector3(0,100,0)
            : new THREE.Vector3(100,0,0)
    ]
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(points)
    const material = new THREE.LineBasicMaterial({color:0xffffff});
    const line=new THREE.Line(geometry,material);
    return line
}

function createScaleLine(type){
    const points = [];
    for(let i = 0;i<100;i=i+10){
        if(type === 'y'){
            points.push(new THREE.Vector3(0,i,0));
            points.push(new THREE.Vector3(-5,i,0));
        }else{
            points.push(new THREE.Vector3(i,0,0));
            points.push(new THREE.Vector3(i,-5,0));
        }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(points)
    const material = new THREE.LineBasicMaterial({color:0xffffff});
    const line=new THREE.LineSegments(geometry,material);
    return line
}

function createBar(dataArr) {
    const bars = new THREE.Group();

    dataArr.forEach((data, index) => {
        const geometry = new THREE.PlaneGeometry(10, data);
        
        // 顶点颜色数组
        const colors = [];

        const bottomColor = new THREE.Color('#ffffff'); // 白色底部
        const topColor = new THREE.Color('#ff0000');    // 红色顶部（也可以根据 data 动态生成）

        // 四个顶点颜色设置：[左下, 右下, 左上, 右上]
colors.push(topColor.r, topColor.g, topColor.b);     // 左下 -> 白
colors.push(topColor.r, topColor.g, topColor.b);     // 右下 -> 白
colors.push(bottomColor.r, bottomColor.g, bottomColor.b); // 左上 -> 红
colors.push(bottomColor.r, bottomColor.g, bottomColor.b); // 右上 -> 红


        // 应用顶点颜色属性
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            side: THREE.DoubleSide
        });

        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = index * 20 + 10 + 5;
        bar.position.y = data / 2;

        // 添加柱体顶部的数值标签
        const valueLabel = createTextSprite(`${data}`, new THREE.Vector3(bar.position.x, data + 5, 0));
        bars.add(bar, valueLabel);
    });

    return bars;
}


function createTextSprite(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 48;
    context.font = `${fontSize}px Arial`;

    // 自动设置 canvas 大小匹配文字长度
    const textWidth = context.measureText(text).width;
    canvas.width = textWidth;
    canvas.height = fontSize + 10;

    // 重新设置字体后再绘制
    context.font = `${fontSize}px Arial`;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);

    // 根据文字长度自动设置 sprite 缩放比例（你也可以手动设置）
    const scaleFactor = 0.2; // 控制文字大小
    sprite.scale.set(canvas.width * scaleFactor, canvas.height * scaleFactor, 1);
    sprite.position.copy(position);
    return sprite;
}


//
function createYLabels(){
    const labels = new THREE.Group();
    const step = 20;
    const max = 100;
    for(let i = 0; i <= max; i += step){
        const label = createTextSprite(`${i}`, new THREE.Vector3(-10, i, 0));
        labels.add(label);
    }
    return labels;
}

const xLine=createLine('x')
const yLine=createLine('y')
const xScaleLine=createScaleLine('x')
const yScaleLine=createScaleLine('y')
const yLabels = createYLabels();

const bar=createBar([10,20,30,70,50])
group.add(xLine,yLine,xScaleLine,yScaleLine,bar, yLabels)

export default group;