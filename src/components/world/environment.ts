import * as T from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { createRemoteEarth } from "./remote-earth";
export function createEnvironment() {
  const root = new T.Group();
  RectAreaLightUniformsLib.init();
  root.add(new T.HemisphereLight("#e7edff", "#958078", 1.35));
  const key = new T.RectAreaLight("#ffe6d2", 5, 4, 5);
  key.position.set(-3.5, 5, 5);
  key.lookAt(0, 1.3, 0);
  root.add(key);
  const fill = new T.DirectionalLight("#e5eeff", 1.65);
  fill.position.set(2, 1, 5);
  root.add(fill);
  const rim = new T.DirectionalLight("#a8dfff", 2.4);
  rim.position.set(3, 4, -3);
  root.add(rim);
  const platform = new T.Group();
  root.add(platform);
  const stone = new T.MeshStandardMaterial({
    color: "#273342", metalness: 0.35, roughness: 0.38, transparent: true,
  });
  // A rounded profile replaces the heavy tapered drum; the top stays at y=0.
  const profile = [
    [0, -0.18], [2.04, -0.18], [2.13, -0.15], [2.17, -0.1],
    [2.17, -0.055], [2.14, -0.018], [2.08, 0], [0, 0],
  ].map(([r, y]) => new T.Vector2(r, y));
  const stage = new T.Mesh(new T.LatheGeometry(profile, 96), stone);
  platform.add(stage);
  const lip = new T.Mesh(
    new T.TorusGeometry(2.153, 0.009, 8, 128),
    new T.MeshBasicMaterial({ color: "#91e6ee", transparent: true }),
  );
  lip.rotation.x = Math.PI / 2;
  lip.position.y = -0.035;
  platform.add(lip);
  const inset = new T.Mesh(
    new T.RingGeometry(1.96, 1.965, 128),
    new T.MeshBasicMaterial({ color: "#647e8f", transparent: true, opacity: 0.35 }),
  );
  inset.rotation.x = -Math.PI / 2;
  inset.position.y = 0.006;
  platform.add(inset);
  const halo = new T.Mesh(
    new T.RingGeometry(2.06, 2.32, 128),
    new T.ShaderMaterial({
      transparent: true, depthWrite: false, side: T.DoubleSide,
      blending: T.AdditiveBlending,
      uniforms: { reveal: { value: 0 } },
      vertexShader: `varying vec3 local; void main(){local=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec3 local; uniform float reveal; void main(){float r=length(local.xy);float glow=exp(-pow((r-2.15)*17.,2.));gl_FragColor=vec4(.23,.75,.86,glow*.16*reveal);}`,
    }),
  );
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = -0.12;
  platform.add(halo);
  // A radial contact texture grounds the original model without a shadow pass.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 64;
  const context = shadowCanvas.getContext("2d")!;
  const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 32);
  gradient.addColorStop(0, "rgba(5,9,16,.48)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const shadow = new T.Mesh(
    new T.PlaneGeometry(3.5, 2.6),
    new T.MeshBasicMaterial({
      map: new T.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.025;
  platform.add(shadow);
  const orbit = new T.Group();
  const remote = createRemoteEarth();
  const panels = remote.group;
  root.add(panels);
  // Polar terrain: radial resolution follows the lens; shared analytic height.
  const height = (x: number, z: number) =>
    -1.4 + Math.sin(x * 0.35 + Math.sin(z * 0.21)) * Math.cos(z * 0.28) * 0.55;
  const positions: number[] = [],
    indices: number[] = [],
    colors: number[] = [];
  const AN = 96,
    RN = 24;
  for (let r = 0; r <= RN; r++)
    for (let a = 0; a <= AN; a++) {
      const rad = 0.1 + Math.pow(r / RN, 2.4) * 52,
        angle = (a / AN) * Math.PI * 2;
      const x = Math.cos(angle) * rad,
        z = Math.sin(angle) * rad,
        y = height(x, z);
      positions.push(x, y, z);
      const slope = Math.abs(height(x + 0.1, z) - y) / 0.1;
      const c = new T.Color("#080a11").lerp(
        new T.Color("#151521"),
        Math.min(1, slope + y * 0.1 + 0.3),
      );
      colors.push(c.r, c.g, c.b);
    }
  for (let r = 0; r < RN; r++)
    for (let a = 0; a < AN; a++) {
      const a0 = r * (AN + 1) + a,
        b0 = (r + 1) * (AN + 1) + a;
      indices.push(a0, b0 + 1, b0, a0, a0 + 1, b0 + 1);
    }
  const terrainGeo = new T.BufferGeometry();
  terrainGeo.setAttribute(
    "position",
    new T.Float32BufferAttribute(positions, 3),
  );
  terrainGeo.setAttribute("color", new T.Float32BufferAttribute(colors, 3));
  terrainGeo.setIndex(indices);
  terrainGeo.computeVertexNormals();
  const terrain = new T.Mesh(
    terrainGeo,
    new T.MeshStandardMaterial({ vertexColors: true, roughness: 1 }),
  );
  root.add(terrain);
  const stars: number[] = [];
  let seed = 19;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < 250; i++)
    stars.push((random() - 0.5) * 65, random() * 22 + 1, -random() * 45 - 5);
  const starGeo = new T.BufferGeometry();
  starGeo.setAttribute("position", new T.Float32BufferAttribute(stars, 3));
  root.add(
    new T.Points(
      starGeo,
      new T.PointsMaterial({
        color: "#c2b6ea",
        size: 1.4,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    ),
  );
  return {
    root,
    orbit,
    panels,
    update: remote.update,
    revealPlatform(progress: number, contact: number) {
      platform.visible = progress > 0.001;
      platform.position.y = -0.45 * (1 - progress);
      stone.opacity = progress;
      lip.material.opacity = progress * 0.8;
      inset.material.opacity = progress * 0.35;
      halo.material.uniforms.reveal.value = progress;
      shadow.material.opacity = progress * contact;
    },
  };
}
