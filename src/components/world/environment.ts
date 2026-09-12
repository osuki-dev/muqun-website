import * as T from "three";
import { createRemoteEarth } from "./remote-earth";
export function createEnvironment() {
  const root = new T.Group();
  root.add(new T.HemisphereLight("#d5d4ff", "#30202b", 2));
  const key = new T.DirectionalLight("#ffe0c3", 4);
  key.position.set(-3, 6, 5);
  root.add(key);
  const rim = new T.DirectionalLight("#9a8dff", 3);
  rim.position.set(4, 3, -3);
  root.add(rim);
  const stone = new T.MeshStandardMaterial({
    color: "#24283c",
    roughness: 0.92,
  });
  const stage = new T.Mesh(new T.CylinderGeometry(2.25, 1.75, 0.55, 64), stone);
  stage.position.y = -0.28;
  root.add(stage);
  const lip = new T.Mesh(
    new T.TorusGeometry(2.18, 0.018, 8, 120),
    new T.MeshBasicMaterial({ color: "#8a81bd" }),
  );
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.01;
  root.add(lip);
  // A radial contact texture grounds the original model without a shadow pass.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 64;
  const context = shadowCanvas.getContext("2d")!;
  const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 32);
  gradient.addColorStop(0, "rgba(0,0,0,.75)");
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
  root.add(shadow);
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
  return { root, orbit, panels, update: remote.update };
}
