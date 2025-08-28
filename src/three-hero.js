/* Minimal Three.js animated gradient + particles for hero */
(() => {
  const canvas = document.getElementById('heroWebGL');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(0, 0, 1.4);

  const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#7c8cff') },
      uColorB: { value: new THREE.Color('#5ce1e6') }
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main(){
        vUv = uv;
        vec3 pos = position;
        pos.z += sin((pos.x + uTime*0.4)*2.0) * 0.06 + cos((pos.y + uTime*0.3)*2.0) * 0.06;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      void main(){
        vec2 uv = vUv;
        float g = smoothstep(0.2, 0.8, uv.y);
        vec3 col = mix(uColorA, uColorB, g);
        gl_FragColor = vec4(col, 0.6);
      }
    `,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Particle field
  const particlesCount = 800;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  const speeds = new Float32Array(particlesCount);
  for(let i=0;i<particlesCount;i++){
    positions[i*3+0] = (Math.random()*2-1) * 1.5;
    positions[i*3+1] = (Math.random()*2-1) * 1.0;
    positions[i*3+2] = -0.2 - Math.random()*0.8;
    speeds[i] = 0.2 + Math.random()*0.6;
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#9fb0ff') } },
    vertexShader: `
      attribute float aSpeed;
      uniform float uTime;
      varying float vAlpha;
      void main(){
        vec3 p = position;
        float t = fract(uTime * 0.1 * aSpeed + p.x * 0.5 + p.y * 0.5);
        p.y += (t - 0.5) * 0.4;
        vAlpha = smoothstep(0.0, 0.5, t) * smoothstep(1.0, 0.5, t);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = 2.0 + 2.0 * aSpeed;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      void main(){
        float d = length(gl_PointCoord - vec2(0.5));
        float alpha = smoothstep(0.5, 0.0, d) * vAlpha * 0.8;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false
  });
  const points = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(points);

  function resize(){
    const w = canvas.clientWidth || canvas.offsetWidth || window.innerWidth;
    const h = canvas.clientHeight || canvas.offsetHeight || window.innerHeight * 0.88;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  let t = 0;
  const clock = new THREE.Clock();
  function tick(){
    t += clock.getDelta();
    material.uniforms.uTime.value = t;
    particleMaterial.uniforms.uTime.value = t;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();


