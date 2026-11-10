import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cloud, Radio, Activity, Globe, ShieldCheck, Zap } from 'lucide-react';

interface CloudRegion {
  id: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  status: string;
  latency: string;
  role: string;
  isPrimary?: boolean;
}

const GCP_REGIONS: CloudRegion[] = [
  {
    id: 'jakarta',
    name: 'Jakarta (Indonesia)',
    code: 'asia-southeast2',
    lat: -6.2088,
    lon: 106.8456,
    status: 'ONLINE (Primary)',
    latency: '8 ms',
    role: 'Core Backend, Cloud Run & VPC Networks',
    isPrimary: true,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'asia-southeast1',
    lat: 1.3521,
    lon: 103.8198,
    status: 'ACTIVE',
    latency: '18 ms',
    role: 'Multi-Region High Availability & Edge Caching',
  },
  {
    id: 'tokyo',
    name: 'Tokyo (Japan)',
    code: 'asia-northeast1',
    lat: 35.6762,
    lon: 139.6503,
    status: 'ACTIVE',
    latency: '68 ms',
    role: 'Vertex AI & Distributed Inference Nodes',
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt (Germany)',
    code: 'europe-west3',
    lat: 50.1109,
    lon: 8.6821,
    status: 'ACTIVE',
    latency: '142 ms',
    role: 'Global Backup, DR & Enterprise Routing',
  },
  {
    id: 'iowa',
    name: 'Iowa (US Central)',
    code: 'us-central1',
    lat: 41.2619,
    lon: -95.8608,
    status: 'ACTIVE',
    latency: '185 ms',
    role: 'Cloud Storage Buckets & BigQuery Datasets',
  },
];

// Helper to convert lat/lon to 3D Cartesian coordinates
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Helper to create an arc curve between two 3D points above the sphere
function createArc(v1: THREE.Vector3, v2: THREE.Vector3, globeRadius: number): THREE.CubicBezierCurve3 {
  const distance = v1.distanceTo(v2);
  const altitude = globeRadius + Math.max(0.3, distance * 0.28);

  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
  const midNormal = mid.clone().normalize();
  const controlPoint1 = new THREE.Vector3().addVectors(
    v1.clone().multiplyScalar(0.7),
    midNormal.clone().multiplyScalar(altitude * 0.7)
  );
  const controlPoint2 = new THREE.Vector3().addVectors(
    v2.clone().multiplyScalar(0.7),
    midNormal.clone().multiplyScalar(altitude * 0.7)
  );

  return new THREE.CubicBezierCurve3(v1, controlPoint1, controlPoint2, v2);
}

export const CloudGlobe3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<CloudRegion>(GCP_REGIONS[0]);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeRadius = 1.6;
    const globeGroup = new THREE.Group();
    // Tilt globe slightly on X to show Northern & Southern hemisphere clearly
    globeGroup.rotation.x = 0.35;
    // Initial Y rotation so Indonesia / Asia faces forward
    globeGroup.rotation.y = -1.8;
    scene.add(globeGroup);

    // 1. Dotted / Wireframe Sphere Matrix
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 36, 24);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(wireframeSphere);

    // 2. Earth Point Cloud (Continental sampling)
    const dotCount = 1200;
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = globeRadius;
      dotPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dotPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.022,
      transparent: true,
      opacity: 0.45,
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // 3. Glowing Atmosphere Halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.025, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x5b6cff,
      wireframe: false,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 4. Region Markers & Arcs
    const primaryRegion = GCP_REGIONS.find((r) => r.isPrimary)!;
    const primaryVec = latLongToVector3(primaryRegion.lat, primaryRegion.lon, globeRadius);

    // Marker Meshes group
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);

    // Arcs group & packet animation particles
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    const arcCurves: THREE.CubicBezierCurve3[] = [];
    const packetMeshes: THREE.Mesh[] = [];

    GCP_REGIONS.forEach((region) => {
      const vec = latLongToVector3(region.lat, region.lon, globeRadius);

      // Marker sphere
      const isPrimary = !!region.isPrimary;
      const markerSize = isPrimary ? 0.065 : 0.042;
      const markerGeo = new THREE.SphereGeometry(markerSize, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: isPrimary ? 0x10b981 : 0x5b6cff,
      });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.copy(vec);
      markersGroup.add(markerMesh);

      // Ring pulse around primary hub
      if (isPrimary) {
        const ringGeo = new THREE.RingGeometry(0.08, 0.11, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(vec.clone().multiplyScalar(1.02));
        ringMesh.lookAt(vec.clone().multiplyScalar(2));
        markersGroup.add(ringMesh);
      }

      // Create Arcs from Jakarta to other regions
      if (!isPrimary) {
        const curve = createArc(primaryVec, vec, globeRadius);
        arcCurves.push(curve);

        const curvePoints = curve.getPoints(50);
        const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const curveMat = new THREE.LineBasicMaterial({
          color: 0x5b6cff,
          transparent: true,
          opacity: 0.65,
        });
        const arcLine = new THREE.Line(curveGeo, curveMat);
        arcsGroup.add(arcLine);

        // Packet particle traveling along the arc
        const packetGeo = new THREE.SphereGeometry(0.024, 8, 8);
        const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const packetMesh = new THREE.Mesh(packetGeo, packetMat);
        arcsGroup.add(packetMesh);
        packetMeshes.push(packetMesh);
      }
    });

    // Interaction (Drag rotation)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;
    let isVisible = true;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      rotationVelocityY = deltaX * 0.005;
      rotationVelocityX = deltaY * 0.003;

      globeGroup.rotation.y += rotationVelocityY;
      globeGroup.rotation.x += rotationVelocityX;

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
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

    // IntersectionObserver to pause when off-screen
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
    let progress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Auto-rotation when user is not dragging
      if (!isDragging) {
        globeGroup.rotation.y += 0.0018;
      } else {
        // Apply smooth inertia damping
        globeGroup.rotation.y += rotationVelocityY * 0.85;
        globeGroup.rotation.x += rotationVelocityX * 0.85;
        rotationVelocityY *= 0.85;
        rotationVelocityX *= 0.85;
      }

      // Animate packet pulses along Bezier arcs
      progress = (progress + 0.006) % 1;
      packetMeshes.forEach((mesh, index) => {
        const curve = arcCurves[index];
        if (curve) {
          const offset = (progress + index * 0.25) % 1;
          const pos = curve.getPointAt(offset);
          mesh.position.copy(pos);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerdown', handlePointerDown);
      observer.disconnect();

      sphereGeo.dispose();
      wireframeMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative rounded-3xl bg-[#090B10] border border-white/[0.08] overflow-hidden p-6 sm:p-8 ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#5B6CFF]">
              GCP Global Cloud Infrastructure
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-white uppercase mt-1">
            Arsitektur Jaringan Cloud 3D
          </h3>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-zinc-300 flex items-center gap-2">
            <Radio size={12} className="text-emerald-400 animate-ping" />
            <span>Region Aktif: {selectedRegion.code}</span>
          </div>
        </div>
      </div>

      {/* Main 3D Display + Region Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        {/* Left Interactive 3D Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div
            ref={containerRef}
            className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'none' }}
          />

          {/* Floating Drag Hint Pill */}
          <div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5 ${
              isInteracting ? 'opacity-0' : 'opacity-80'
            }`}
          >
            <Globe size={11} className="text-[#5B6CFF]" />
            <span>Geser / Drag untuk memutar Globe 3D</span>
          </div>
        </div>

        {/* Right Region Telemetry Details & Region List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 relative z-10">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Daftar Region &amp; Titik Distribusi GCP:
          </div>

          {/* Region Tabs / Cards */}
          <div className="space-y-2">
            {GCP_REGIONS.map((region) => {
              const isSelected = selectedRegion.id === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#5B6CFF] text-white shadow-lg'
                      : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          region.isPrimary ? 'bg-emerald-400' : 'bg-[#5B6CFF]'
                        }`}
                      />
                      <span className="font-mono text-xs font-bold">{region.name}</span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 pl-4">{region.code}</div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs text-emerald-400 font-medium block">
                      {region.latency}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">
                      {region.status.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Telemetry Card for Active Region */}
          <div className="p-4 rounded-2xl bg-[#0F121A] border border-white/[0.08] space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 uppercase">Fungsi Arsitektur</span>
              <span className="text-[#5B6CFF] flex items-center gap-1">
                <ShieldCheck size={13} />
                <span>Google Cloud VPC</span>
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {selectedRegion.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
