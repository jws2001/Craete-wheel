<script>
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls";
  import Stats from "three/addons/libs/stats.module";
  import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

  // 实例化一个gui对象
  const gui = new GUI();
  //改变交互界面style属性
  gui.domElement.style.right = "0px";
  gui.domElement.style.width = "300px";

  // 创建3D场景
  const scene = new THREE.Scene();

  //BoxGeometry：长方体
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  // SphereGeometry：球体
  // const geometry = new THREE.SphereGeometry(50);
  // CylinderGeometry：圆柱
  // const geometry = new THREE.CylinderGeometry(50, 50, 100);
  // PlaneGeometry：矩形平面
  // const geometry = new THREE.PlaneGeometry(100, 50);
  // CircleGeometry：圆形平面
  // const geometry = new THREE.CircleGeometry(50);

  // 创建一个材质对象
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000 * Math.random(),
    shininess: 20,
    specular: 0x444444, //高光部分的颜色
  });
  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material); // 模型
  scene.add(mesh);

  // // 设置模型位置
  // // @ts-ignore
  // mesh.position.set(100, 0, 0);
  // scene.add(mesh); // 将模型添加到场景中

  // for (let i = 0; i < 10; i++) {
  //   for (let j = 0; j < 10; j++) {
  //     const mesh = new THREE.Mesh(geometry, material);
  //     mesh.position.set(i * 200, 0, j * 200);
  //     scene.add(mesh);
  //   }
  // }

  gui.add(mesh.position, "x", 0, 180);
  gui.add(mesh.position, "y", 0, 180);
  gui.add(mesh.position, "z", 0, 180);

  // 辅助观察坐标系
  const axesHelper = new THREE.AxesHelper(250);
  scene.add(axesHelper);

  // 实例化一个透视投影相机
  const width = window.innerWidth;
  const height = window.innerHeight;
  // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 8000);

  // 设置相机的位置
  // @ts-ignore
  camera.position.set(1000, 1000, 1000);
  // 相机观察目标点
  // @ts-ignore
  camera.lookAt(0, 0, 0);

  // // 光源
  // const pointLight = new THREE.PointLight(0xffffff, 1);
  // // @ts-ignore
  // pointLight.position.set(-400, -200, -300);
  // scene.add(pointLight);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // @ts-ignore
  directionalLight.position.set(200, 200, 200);
  directionalLight.target = mesh;
  scene.add(directionalLight);

  // 光源辅助观察
  const pointLightHelper = new THREE.PointLightHelper(
    directionalLight,
    5,
    0xff0000,
  );
  scene.add(pointLightHelper);

  gui.add(directionalLight, "intensity", 0, 2.0);

  // 创建渲染对象
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x444444, 1); //设置背景颜色

  // 渲染器渲染到页面
  document.body.appendChild(renderer.domElement);

  // 设置相机控件轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => {
    // controls.target.set(1000, 0, 1000);
    // controls.update();
    // renderer.render(scene, camera);
  });

  // 帧率查看器
  const stats = new Stats();
  document.body.appendChild(stats.domElement);

  const render = () => {
    stats.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();

  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
</script>

<main></main>
