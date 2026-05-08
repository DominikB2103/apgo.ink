'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function SceneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    const geometry = new THREE.IcosahedronGeometry(2.2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x7af7d5, wireframe: true, transparent: true, opacity: 0.26 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);
    let frame = 0;
    const animate = () => {
      mesh.rotation.x += 0.0025;
      mesh.rotation.y += 0.0035;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); renderer.dispose(); geometry.dispose(); material.dispose(); };
  }, []);
  return <canvas className="scene-canvas" ref={ref} aria-hidden="true" />;
}
