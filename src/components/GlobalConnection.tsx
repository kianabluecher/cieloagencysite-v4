import { useEffect, useRef, useState } from 'react';

// Dynamically import Three.js only when needed to prevent multiple instances
let THREE: any = null;
let isThreeLoaded = false;

// Singleton to track initialization
const globalState = {
  initialized: false,
  renderer: null as any
};

export function GlobalConnection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const labelsRef = useRef<{ marker: any; labelElement: HTMLDivElement; city: any }[]>([]);
  const sceneRef = useRef<{
    scene: any | null;
    camera: any | null;
    renderer: any | null;
    globePivot: any | null;
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    animationId: number | null;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    globePivot: null,
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    animationId: null
  });

  const GLOBE_RADIUS = 100;
  const CITIES = [
    { name: "MIAMI, USA", lat: 25.76, lon: -80.19, color: 0xff8c00 },
    { name: "DUBAI, UAE", lat: 25.20, lon: 55.27, color: 0xff8c00 },
    { name: "GERMANY", lat: 51.5, lon: 10.0, color: 0xff8c00 }
  ];

  useEffect(() => {
    if (!containerRef.current || globalState.initialized) {
      return;
    }

    // Prevent re-initialization
    globalState.initialized = true;

    // Dynamic import of Three.js
    const loadThreeAndInit = async () => {
      try {
        if (!isThreeLoaded) {
          // Suppress console warnings
          const originalWarn = console.warn;
          console.warn = (...args: any[]) => {
            const msg = args[0]?.toString() || '';
            if (msg.includes('THREE') || msg.includes('WebGL') || msg.includes('multiple')) {
              return;
            }
            originalWarn(...args);
          };

          THREE = await import('three');
          isThreeLoaded = true;
        }

        initScene();
      } catch (err) {
        console.error('Failed to load Three.js:', err);
        setError(true);
        setIsLoading(false);
      }
    };

    const initScene = () => {
      if (!containerRef.current || !THREE) return;

      const container = containerRef.current;
      const { current: sceneData } = sceneRef;

      // Helper functions
      const latLonToCartesian = (lat: number, lon: number, radius: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));
        return new THREE.Vector3(x, y, z);
      };

      const createArc = (point1: any, point2: any, color: number) => {
        const midPoint = point1.clone().add(point2).multiplyScalar(0.5);
        const midControlPoint = midPoint.normalize().multiplyScalar(GLOBE_RADIUS * 1.05);
        const curve = new THREE.QuadraticBezierCurve3(point1, midControlPoint, point2);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: color,
          linewidth: 3,
          transparent: true,
          opacity: 1
        });
        return new THREE.Line(geometry, material);
      };

      const createLabel = (city: typeof CITIES[0]) => {
        const element = document.createElement('div');
        element.className = 'city-label';
        const lat_str = city.lat > 0 ? `${city.lat.toFixed(4)}°N` : `${Math.abs(city.lat).toFixed(4)}°S`;
        const lon_str = city.lon > 0 ? `${city.lon.toFixed(4)}°E` : `${Math.abs(city.lon).toFixed(4)}°W`;
        element.innerHTML = `
          <h4>${city.name.split(',')[0]}</h4>
          <span class="coords">${lat_str}</span>
          <span class="coords">${lon_str}</span>
        `;
        return element;
      };

      // Setup Scene
      const scene = new THREE.Scene();
      scene.background = null;
      sceneData.scene = scene;

      // Setup Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        1,
        1000
      );
      camera.position.z = GLOBE_RADIUS * 2;
      sceneData.camera = camera;

      // Setup Renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
      sceneData.renderer = renderer;
      globalState.renderer = renderer;

      // Create Globe Pivot
      const globePivot = new THREE.Group();
      scene.add(globePivot);
      sceneData.globePivot = globePivot;

      // Create Globe
      const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 32, 32);
      const mapTextureUrl = 'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-dark.jpg';
      const textureLoader = new THREE.TextureLoader();

      textureLoader.load(
        mapTextureUrl,
        (mapTexture: any) => {
          const globeMaterial = new THREE.MeshBasicMaterial({
            map: mapTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
            side: THREE.FrontSide
          });
          const globe = new THREE.Mesh(globeGeometry, globeMaterial);
          globePivot.add(globe);
          setIsLoading(false);
        },
        undefined,
        () => {
          const fallbackMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
          const globe = new THREE.Mesh(globeGeometry, fallbackMaterial);
          globePivot.add(globe);
          setIsLoading(false);
        }
      );

      // Add Grid Background
      const gridColor = 0x111111;
      const gridHelperSize = 500;
      const gridHelperDivisions = 50;

      const gridHelperX = new THREE.GridHelper(gridHelperSize, gridHelperDivisions, gridColor, gridColor);
      gridHelperX.position.y = -GLOBE_RADIUS * 1.5;
      scene.add(gridHelperX);

      const gridHelperY = new THREE.GridHelper(gridHelperSize, gridHelperDivisions, gridColor, gridColor);
      gridHelperY.rotation.z = Math.PI / 2;
      gridHelperY.position.x = GLOBE_RADIUS * 1.5;
      scene.add(gridHelperY);

      const gridHelperZ = new THREE.GridHelper(gridHelperSize, gridHelperDivisions, gridColor, gridColor);
      gridHelperZ.rotation.x = Math.PI / 2;
      gridHelperZ.position.z = GLOBE_RADIUS * 1.5;
      scene.add(gridHelperZ);

      // Add Markers and Labels
      const points = CITIES.map(city => {
        const cartesianPos = latLonToCartesian(city.lat, city.lon, GLOBE_RADIUS * 1.001);
        
        const markerGeometry = new THREE.BoxGeometry(3, 3, 3);
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: city.color
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.copy(cartesianPos);
        globePivot.add(marker);

        const labelElement = createLabel(city);
        container.appendChild(labelElement);
        labelsRef.current.push({ marker, labelElement, city });

        return cartesianPos;
      });

      // Draw connecting arcs
      globePivot.add(createArc(points[0], points[1], CITIES[0].color));
      globePivot.add(createArc(points[1], points[2], CITIES[1].color));
      globePivot.add(createArc(points[2], points[0], CITIES[2].color));

      // Initial rotation
      globePivot.rotation.y = Math.PI * 0.5;

      // Event Handlers
      const getClientCoords = (event: MouseEvent | TouchEvent) => {
        if ('touches' in event) {
          return { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
        return { x: event.clientX, y: event.clientY };
      };

      const handleDrag = (currentCoords: { x: number; y: number }) => {
        const deltaX = currentCoords.x - sceneData.previousMousePosition.x;
        const deltaY = currentCoords.y - sceneData.previousMousePosition.y;

        if (globePivot) {
          globePivot.rotation.y += deltaX * 0.005;
          const newXRotation = globePivot.rotation.x + deltaY * 0.005;
          globePivot.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, newXRotation));
        }

        sceneData.previousMousePosition.x = currentCoords.x;
        sceneData.previousMousePosition.y = currentCoords.y;
      };

      const onMouseDown = (event: MouseEvent) => {
        sceneData.isDragging = true;
        sceneData.previousMousePosition.x = event.clientX;
        sceneData.previousMousePosition.y = event.clientY;
        if (renderer.domElement) renderer.domElement.style.cursor = 'grabbing';
      };

      const onMouseMove = (event: MouseEvent) => {
        if (!sceneData.isDragging) return;
        handleDrag(getClientCoords(event));
      };

      const onMouseUp = () => {
        sceneData.isDragging = false;
        if (renderer.domElement) renderer.domElement.style.cursor = 'grab';
      };

      const onTouchStart = (event: TouchEvent) => {
        event.preventDefault();
        sceneData.isDragging = true;
        const coords = getClientCoords(event);
        sceneData.previousMousePosition.x = coords.x;
        sceneData.previousMousePosition.y = coords.y;
      };

      const onTouchMove = (event: TouchEvent) => {
        if (!sceneData.isDragging) return;
        event.preventDefault();
        handleDrag(getClientCoords(event));
      };

      const onTouchEnd = () => {
        sceneData.isDragging = false;
      };

      const onWindowResize = () => {
        if (!camera || !renderer || !container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      // Update Labels
      const updateLabels = () => {
        if (!globePivot || !camera) return;
        globePivot.updateWorldMatrix(true, true);

        labelsRef.current.forEach(item => {
          const { marker, labelElement } = item;
          const vector = new THREE.Vector3();
          marker.getWorldPosition(vector);
          vector.project(camera);

          const x = (vector.x * 0.5 + 0.5) * container.clientWidth;
          const y = (-vector.y * 0.5 + 0.5) * container.clientHeight;
          const isVisible = vector.z < 1;

          if (isVisible) {
            const markerPosition = marker.position.clone();
            globePivot.localToWorld(markerPosition);
            const directionVector = markerPosition.normalize();
            const cameraVector = camera.position.clone().normalize();
            const dotProduct = directionVector.dot(cameraVector);

            if (dotProduct > 0.3) {
              labelElement.style.display = 'block';
              labelElement.style.left = `${x}px`;
              labelElement.style.top = `${y}px`;
            } else {
              labelElement.style.display = 'none';
            }
          } else {
            labelElement.style.display = 'none';
          }
        });
      };

      // Animation Loop
      const animate = () => {
        sceneData.animationId = requestAnimationFrame(animate);

        if (!sceneData.isDragging && globePivot) {
          globePivot.rotation.y += 0.001;
        }

        updateLabels();
        if (scene && camera && renderer) {
          renderer.render(scene, camera);
        }
      };

      renderer.domElement.style.cursor = 'grab';
      renderer.domElement.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      renderer.domElement.addEventListener('touchstart', onTouchStart);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
      window.addEventListener('resize', onWindowResize);

      animate();
    };

    loadThreeAndInit();

    // Cleanup
    return () => {
      globalState.initialized = false;
      
      const { current: sceneData } = sceneRef;
      
      if (sceneData.animationId) {
        cancelAnimationFrame(sceneData.animationId);
      }
      
      // Remove event listeners
      if (sceneData.renderer && sceneData.renderer.domElement) {
        sceneData.renderer.domElement.removeEventListener('mousedown', () => {});
        sceneData.renderer.domElement.removeEventListener('touchstart', () => {});
      }
      
      // Remove labels
      labelsRef.current.forEach(({ labelElement }) => {
        if (labelElement && labelElement.parentNode) {
          labelElement.remove();
        }
      });
      labelsRef.current = [];

      // Dispose of Three.js resources
      if (sceneData.scene) {
        sceneData.scene.traverse((object: any) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material: any) => {
                if (material.map) material.map.dispose();
                material.dispose();
              });
            } else {
              if (object.material.map) object.material.map.dispose();
              object.material.dispose();
            }
          }
        });
        sceneData.scene.clear();
      }

      if (sceneData.renderer) {
        if (containerRef.current && sceneData.renderer.domElement && sceneData.renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(sceneData.renderer.domElement);
        }
        sceneData.renderer.dispose();
        if (sceneData.renderer.forceContextLoss) {
          sceneData.renderer.forceContextLoss();
        }
      }
      
      sceneData.scene = null;
      sceneData.camera = null;
      sceneData.renderer = null;
      sceneData.globePivot = null;
    };
  }, []);

  if (error) {
    return (
      <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center bg-neutral-900">
        <div className="text-zinc-500">Unable to load 3D visualization</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] md:h-[800px]">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#FF8C00] z-50">
          Loading 3D Globe...
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
      <style dangerouslySetInnerHTML={{__html: `
        .city-label {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          padding: 0;
          line-height: 1.4;
          transform: translate(15px, -50%);
          z-index: 10;
          max-width: 250px;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
        }

        .city-label h4 {
          margin: 0;
          font-size: 1rem;
          color: #ffffff;
          font-weight: 600;
          text-transform: uppercase;
        }

        .coords {
          display: block;
          margin-top: 2px;
          font-family: 'Geist Mono', monospace;
          font-size: 0.75rem;
          color: #FF8C00;
          line-height: 1.1;
        }
      `}} />
    </div>
  );
}
