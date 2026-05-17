// ============================================
// 3D Graduation Cap — Three.js
// ============================================

export async function initGraduation3D() {
  const container = document.getElementById('graduation-3d');
  if (!container) return;

  container.style.display = 'block';

  try {
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

    const w = container.offsetWidth || container.clientWidth || 400;
    const h = container.offsetHeight || container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x0db9d7, 0.8);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    camera.position.set(0, 1.5, 4.0);
    camera.lookAt(0, 0.5, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0.5, 0);
    controls.update();

    // Load model
    const loader = new GLTFLoader();
    loader.load('Aset/graduation_hat.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 4.5 / maxDim;
      model.scale.setScalar(scale);
      model.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );
      scene.add(model);

      let autoRotate = true;
      function animate() {
        requestAnimationFrame(animate);
        if (autoRotate) model.rotation.y += 0.003;
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      controls.addEventListener('start', () => autoRotate = false);
      controls.addEventListener('end', () => setTimeout(() => autoRotate = true, 3000));
    }, undefined, (err) => console.error('3D model load error:', err));

    // Responsive resize
    const ro = new ResizeObserver(() => {
      const nw = container.offsetWidth || 400;
      const nh = container.offsetHeight || 400;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(container);

  } catch (err) {
    console.error('Three.js init error:', err);
  }
}
