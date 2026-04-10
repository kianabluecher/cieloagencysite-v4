import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface City {
  name: string;
  lat: number;
  lon: number;
}

export function GlobalConnection3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuration ---
    const GLOBE_RADIUS = 120;
    const CITIES: City[] = [
      { name: "MIAMI", lat: 25.7617, lon: -80.1918 },
      { name: "DUBAI", lat: 25.2048, lon: 55.2708 },
      { name: "GERMANY", lat: 51.1657, lon: 10.4515 }
    ];

    // --- Variables ---
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let globePivot: THREE.Group;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const labels: Array<{ element: HTMLDivElement; vector: THREE.Vector3; marker: THREE.Mesh }> = [];
    const container = containerRef.current;

    // --- Lat/Lon to 3D Cartesian ---
    function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = (radius * Math.sin(phi) * Math.sin(theta));
      const y = (radius * Math.cos(phi));
      return new THREE.Vector3(x, y, z);
    }

    // --- Init Scene ---
    async function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 320;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      globePivot = new THREE.Group();
      scene.add(globePivot);

      // 1. Solid Black Base Sphere
      const baseGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
      const baseMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
      const baseSphere = new THREE.Mesh(baseGeo, baseMat);
      globePivot.add(baseSphere);

      // 2. Fetch and Draw Continent Outlines
      try {
        const response = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_coastline.geojson');
        const data = await response.json();
        
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x666666, 
          transparent: true, 
          opacity: 0.8 
        });

        data.features.forEach((feature: any) => {
          if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
            const coords = feature.geometry.type === 'LineString' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
            
            coords.forEach((path: number[][]) => {
              const points = path.map((pt: number[]) => latLonToVector3(pt[1], pt[0], GLOBE_RADIUS + 0.2));
              const geometry = new THREE.BufferGeometry().setFromPoints(points);
              const line = new THREE.Line(geometry, lineMaterial);
              globePivot.add(line);
            });
          }
        });
        if (loadingRef.current) {
          loadingRef.current.style.display = 'none';
        }
      } catch (e) {
        console.error("Failed to load map data", e);
        if (loadingRef.current) {
          loadingRef.current.innerText = "ERROR LOADING MAP DATA";
        }
      }

      // 3. Add Orange Markers
      const cityVectors = CITIES.map(city => {
        const vec = latLonToVector3(city.lat, city.lon, GLOBE_RADIUS + 0.5);
        
        // Marker (Orange Square)
        const markerGeo = new THREE.PlaneGeometry(3.5, 3.5);
        const markerMat = new THREE.MeshBasicMaterial({ color: 0xFF8C00, side: THREE.DoubleSide });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(vec);
        marker.lookAt(new THREE.Vector3(0, 0, 0));
        globePivot.add(marker);

        // Create Label Element
        const labelDiv = document.createElement('div');
        labelDiv.className = 'city-label';
        const latDir = city.lat >= 0 ? 'N' : 'S';
        const lonDir = city.lon >= 0 ? 'E' : 'W';
        labelDiv.innerHTML = `
          <span class="city-name">${city.name}</span>
          <span class="city-coords">${Math.abs(city.lat).toFixed(4)}°${latDir}, ${Math.abs(city.lon).toFixed(4)}°${lonDir}</span>
        `;
        container.appendChild(labelDiv);
        labels.push({ element: labelDiv, vector: vec, marker: marker });

        return vec;
      });

      // 4. Draw Arcs
      function createArc(v1: THREE.Vector3, v2: THREE.Vector3) {
        const mid = v1.clone().add(v2).multiplyScalar(0.5);
        const factor = 1 + (v1.distanceTo(v2) / 200);
        const control = mid.clone().normalize().multiplyScalar(GLOBE_RADIUS * factor);

        const curve = new THREE.QuadraticBezierCurve3(v1, control, v2);
        const arcPoints = curve.getPoints(64);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
        const arcMat = new THREE.LineBasicMaterial({ color: 0xFF8C00, transparent: true, opacity: 0.6 });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        globePivot.add(arcLine);
      }

      createArc(cityVectors[0], cityVectors[1]); // Miami -> Dubai
      createArc(cityVectors[1], cityVectors[2]); // Dubai -> Germany
      createArc(cityVectors[2], cityVectors[0]); // Germany -> Miami

      // Interaction
      const handleMouseDown = () => {
        isDragging = true;
        container.style.cursor = 'grabbing';
      };
      
      const handleMouseUp = () => {
        isDragging = false;
        container.style.cursor = 'grab';
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const deltaX = e.clientX - previousMousePosition.x;
          const deltaY = e.clientY - previousMousePosition.y;
          globePivot.rotation.y += deltaX * 0.005;
          globePivot.rotation.x += deltaY * 0.005;
        }
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);

      animate();

      // Cleanup
      return () => {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    function updateLabels() {
      labels.forEach(l => {
        const vec = l.vector.clone();
        vec.applyMatrix4(globePivot.matrixWorld);
        vec.project(camera);

        const x = (vec.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-(vec.y * 0.5) + 0.5) * container.clientHeight;

        const worldPos = l.vector.clone().applyMatrix4(globePivot.matrixWorld);
        const dot = worldPos.normalize().dot(camera.position.clone().normalize());

        if (dot > 0.3) {
          l.element.style.display = 'flex';
          l.element.style.left = `${x}px`;
          l.element.style.top = `${y}px`;
        } else {
          l.element.style.display = 'none';
        }
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!isDragging) {
        globePivot.rotation.y += 0.0015;
      }
      updateLabels();
      renderer.render(scene, camera);
    }

    const cleanup = init();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (cleanup) cleanup.then(fn => fn && fn());
      labels.forEach(l => l.element.remove());
      if (renderer) {
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative bg-neutral-950 overflow-hidden border-b border-[#1f2228]">
      <style>{`
        .city-label {
          position: absolute;
          pointer-events: none;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transform: translate(12px, -50%);
        }

        .city-name {
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .city-coords {
          color: #FF8C00;
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          opacity: 0.9;
        }
      `}</style>
      
      <div className="px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full mb-8">
              <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                [ WE ARE GLOBAL ]
              </p>
            </div>
          </div>

          <div 
            ref={containerRef} 
            className="relative w-full h-[600px] rounded-2xl overflow-hidden cursor-grab"
            style={{ background: '#0A0A0B' }}
          >
            <div 
              ref={loadingRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#FF8C00] text-sm font-['Geist_Mono'] tracking-[2px] uppercase"
            >
              Initializing Map Data...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
