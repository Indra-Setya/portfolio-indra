import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Interactive3DCoreProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const Interactive3DCore: React.FC<Interactive3DCoreProps> = ({ className = '', theme = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color definitions based on theme
    const isDark = theme === 'dark';
    const primaryColor = isDark ? 0x5b6cff : 0x4150dd;
    const secondaryColor = isDark ? 0x38bdf8 : 0x0284c7;
    const pointColor = isDark ? 0xa5b4fc : 0x312e81;

    // 1. Group to hold rotating geometries
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. Core Geometry: Torus Knot (representing computational pipelines / algorithms)
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.05, 0.28, 120, 24, 2, 3);
    const wireframeMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: isDark ? 0x1e1b4b : 0x000000,
    });
    const torusMesh = new THREE.Mesh(torusKnotGeo, wireframeMat);
    mainGroup.add(torusMesh);

    // 3. Inner Solid Core with subtle glow
    const innerGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 4. Surrounding Orbital Cloud Particles (representing distributed data nodes)
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: pointColor,
      size: 0.045,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particlePoints);

    // 5. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryColor, isDark ? 3.5 : 2.5, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(secondaryColor, isDark ? 2.5 : 2.0, 10);
    pointLight2.position.set(-3, -2, -2);
    scene.add(pointLight2);

    // Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let isVisible = true;

    // Mouse Move on window / container
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Continuous ambient rotation
      torusMesh.rotation.x += 0.004;
      torusMesh.rotation.y += 0.007;

      innerMesh.rotation.x -= 0.008;
      innerMesh.rotation.y -= 0.005;

      particlePoints.rotation.y += 0.002;
      particlePoints.rotation.z -= 0.001;

      // Mouse tracking interpolation
      if (!isDragging) {
        targetRotationY += (mouseX * 0.4 - targetRotationY) * 0.03;
        targetRotationX += (mouseY * 0.4 - targetRotationX) * 0.03;
      }

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;

      // Subtle breathing float scale
      const pulse = 1 + Math.sin(elapsedTime * 1.8) * 0.025;
      torusMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      observer.disconnect();

      // Dispose geometries and materials
      torusKnotGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
