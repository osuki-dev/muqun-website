import * as T from "three";

// Stylised geographic outlines, in longitude/latitude. No remote texture request.
const continents = [
  [
    [-168, 65],
    [-140, 70],
    [-124, 55],
    [-125, 40],
    [-110, 25],
    [-98, 18],
    [-82, 9],
    [-80, 26],
    [-60, 48],
    [-80, 58],
    [-100, 75],
  ],
  [
    [-80, 10],
    [-64, 10],
    [-48, -4],
    [-35, -8],
    [-43, -24],
    [-65, -55],
    [-75, -40],
    [-81, -5],
  ],
  [
    [-17, 35],
    [10, 37],
    [35, 30],
    [50, 12],
    [43, -12],
    [30, -34],
    [18, -35],
    [10, -8],
    [-10, 5],
  ],
  [
    [-10, 36],
    [-10, 58],
    [15, 71],
    [40, 62],
    [70, 73],
    [130, 65],
    [175, 60],
    [145, 40],
    [120, 20],
    [105, 1],
    [80, 8],
    [65, 25],
    [40, 30],
    [30, 42],
  ],
  [
    [112, -12],
    [135, -11],
    [153, -25],
    [145, -39],
    [116, -34],
  ],
  [
    [-52, 60],
    [-25, 70],
    [-40, 83],
    [-62, 79],
  ],
];
const point = (lon: number, lat: number, radius: number) => {
  const a = T.MathUtils.degToRad(lon),
    b = T.MathUtils.degToRad(lat);
  return new T.Vector3(
    radius * Math.cos(b) * Math.sin(a),
    radius * Math.sin(b),
    radius * Math.cos(b) * Math.cos(a),
  );
};
const inside = (x: number, y: number, poly: number[][]) => {
  let yes = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i],
      [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      yes = !yes;
  }
  return yes;
};
export function createRemoteEarth() {
  const group = new T.Group();
  const globe = new T.Group();
  globe.position.set(-2.3, 1.25, 0.12);
  group.add(globe);
  const earth = new T.Group();
  globe.add(earth);
  const radius = 0.86;
  earth.add(
    new T.Mesh(
      new T.SphereGeometry(radius, 48, 32),
      new T.MeshBasicMaterial({ color: "#061825" }),
    ),
  );
  const glow = new T.ShaderMaterial({
    uniforms: { strength: { value: 0.65 } },
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending,
    vertexShader: `varying vec3 vNormal; varying vec3 vView; void main(){ vec4 p=modelViewMatrix*vec4(position,1.); vNormal=normalize(normalMatrix*normal); vView=normalize(-p.xyz); gl_Position=projectionMatrix*p; }`,
    fragmentShader: `varying vec3 vNormal; varying vec3 vView; uniform float strength; void main(){float rim=pow(1.-max(0.,dot(normalize(vNormal),normalize(vView))),3.); gl_FragColor=vec4(.18,.75,1.,rim*strength);}`,
  });
  globe.add(new T.Mesh(new T.SphereGeometry(radius * 1.035, 48, 32), glow));
  const land: number[] = [];
  for (let lat = -55; lat < 82; lat += 2.4)
    for (let lon = -180; lon < 180; lon += 2.4)
      if (continents.some((poly) => inside(lon, lat, poly)))
        land.push(...point(lon, lat, radius + 0.008).toArray());
  const geo = new T.BufferGeometry();
  geo.setAttribute("position", new T.Float32BufferAttribute(land, 3));
  const landMaterial = new T.ShaderMaterial({
    uniforms: { tint: { value: new T.Color("#57d9ff") }, brightness: { value: 1 }, reveal: { value: 1 } },
    transparent: true,
    depthWrite: false,
    vertexShader: `void main(){vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(20./-p.z,1.5,4.);}`,
    fragmentShader: `uniform vec3 tint;uniform float brightness;uniform float reveal;void main(){float a=1.-smoothstep(.25,.5,length(gl_PointCoord-.5));if(a<.01)discard;gl_FragColor=vec4(tint*brightness,a*reveal);}`,
  });
  const landDots = new T.Points(geo, landMaterial);
  earth.add(landDots);
  // Filled geographic patches give the daylight globe a readable silhouette.
  const tiles: number[] = [];
  for (let lat = -56; lat < 84; lat += 2)
    for (let lon = -180; lon < 180; lon += 2)
      if (continents.some((poly) => inside(lon + 1, lat + 1, poly))) {
        const a = point(lon, lat, radius + 0.012), b = point(lon + 2, lat, radius + 0.012);
        const c = point(lon + 2, lat + 2, radius + 0.012), d = point(lon, lat + 2, radius + 0.012);
        tiles.push(...a.toArray(), ...b.toArray(), ...c.toArray(), ...a.toArray(), ...c.toArray(), ...d.toArray());
      }
  const patchGeometry = new T.BufferGeometry();
  patchGeometry.setAttribute("position", new T.Float32BufferAttribute(tiles, 3));
  patchGeometry.setAttribute("normal", new T.Float32BufferAttribute(tiles.map((v, i) => v / Math.hypot(...tiles.slice(i - i % 3, i - i % 3 + 3))), 3));
  const patches = new T.Mesh(patchGeometry, new T.MeshStandardMaterial({color: "#548f89", roughness: 0.8, side: T.DoubleSide}));
  const daylightOcean = new T.Mesh(new T.SphereGeometry(radius, 64, 40), new T.MeshStandardMaterial({color: "#edf2e8", roughness: 0.65, metalness: 0.04}));
  daylightOcean.renderOrder = -1;
  earth.add(daylightOcean, patches);
  const grid = new T.LineBasicMaterial({
    color: "#38afd3",
    transparent: true,
    opacity: 0.13,
  });
  // One shared line buffer keeps the geographic grid inexpensive.
  const lines: number[] = [];
  for (let lat = -60; lat <= 60; lat += 30)
    for (let i = 0; i < 96; i++)
      lines.push(
        ...point(i * 3.75, lat, radius + 0.003).toArray(),
        ...point((i + 1) * 3.75, lat, radius + 0.003).toArray(),
      );
  for (let lon = 0; lon < 180; lon += 30)
    for (let i = 0; i < 96; i++)
      lines.push(
        ...point(lon, i * 3.75, radius + 0.003).toArray(),
        ...point(lon, (i + 1) * 3.75, radius + 0.003).toArray(),
      );
  const gridGeo = new T.BufferGeometry();
  gridGeo.setAttribute("position", new T.Float32BufferAttribute(lines, 3));
  earth.add(new T.LineSegments(gridGeo, grid));
  const orbit = new T.Group();
  globe.add(orbit);
  const orbitMaterial = new T.MeshBasicMaterial({
    color: "#5fdcff",
    transparent: true,
    opacity: 0.52,
  });
  for (let i = 0; i < 3; i++) {
    const ring = new T.Mesh(
      new T.TorusGeometry(
        1.04 + i * 0.06,
        0.005,
        4,
        96,
        Math.PI * (1.2 + i * 0.15),
      ),
      orbitMaterial,
    );
    ring.rotation.set(Math.PI / 2 + i * 0.5, 0.2 + i * 0.55, i * 2.1);
    orbit.add(ring);
  }
  const pedestal = new T.Group();
  pedestal.position.set(-2.3, 0.08, 0.12);
  group.add(pedestal);
  for (let i = 0; i < 2; i++) {
    const ring = new T.Mesh(
      new T.TorusGeometry(0.6 + i * 0.18, 0.007, 4, 80),
      new T.MeshBasicMaterial({
        color: "#43cce9",
        transparent: true,
        opacity: 0.35,
      }),
    );
    ring.rotation.x = Math.PI / 2;
    pedestal.add(ring);
  }
  const phone = new T.Group();
  phone.position.set(-1.65, 3.15, -0.65);
  phone.rotation.set(-0.08, -0.2, 0.06);
  group.add(phone);
  const rounded = (w: number, h: number, r: number) => {
    const s = new T.Shape();
    s.moveTo(-w / 2 + r, -h / 2);
    s.lineTo(w / 2 - r, -h / 2);
    s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    s.lineTo(w / 2, h / 2 - r);
    s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    s.lineTo(-w / 2 + r, h / 2);
    s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    s.lineTo(-w / 2, -h / 2 + r);
    s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return s;
  };
  phone.add(
    new T.Mesh(
      new T.ExtrudeGeometry(rounded(0.58, 1.12, 0.075), {
        depth: 0.045,
        bevelEnabled: true,
        bevelSize: 0.012,
        bevelThickness: 0.012,
        bevelSegments: 2,
        steps: 1,
      }),
      new T.MeshStandardMaterial({
        color: "#183747",
        metalness: 0.8,
        roughness: 0.26,
      }),
    ),
  );
  const screenTexture = new T.TextureLoader().load(
    "/images/terminal-screen.webp",
  );
  screenTexture.colorSpace = T.SRGBColorSpace;
  screenTexture.anisotropy = 2;
  const lightScreenTexture = new T.TextureLoader().load("/images/terminal-screen-light.png");
  lightScreenTexture.colorSpace = T.SRGBColorSpace;
  lightScreenTexture.anisotropy = 2;
  const screenGeometry = new T.ShapeGeometry(rounded(0.52, 1.055, 0.06));
  const positions = screenGeometry.attributes.position;
  const uv = screenGeometry.attributes.uv as T.BufferAttribute;
  for (let i = 0; i < positions.count; i++) {
    uv.setXY(
      i,
      positions.getX(i) / 0.52 + 0.5,
      positions.getY(i) / 1.055 + 0.5,
    );
  }
  const screen = new T.Mesh(
    screenGeometry,
    new T.MeshBasicMaterial({ map: screenTexture, toneMapped: false }),
  );
  screen.position.z = 0.06;
  phone.add(screen);
  const border = new T.LineLoop(
    new T.BufferGeometry().setFromPoints(
      rounded(0.55, 1.09, 0.07).getPoints(8),
    ),
    new T.LineBasicMaterial({
      color: "#6bc8e5",
      transparent: true,
      opacity: 0.7,
    }),
  );
  border.position.z = 0.065;
  phone.add(border);
  const screenGlow = border.material;
  const notch = new T.Mesh(
    new T.ShapeGeometry(rounded(0.14, 0.025, 0.012)),
    new T.MeshBasicMaterial({ color: "#030a13" }),
  );
  notch.position.set(0, 0.5, 0.07);
  phone.add(notch);
  const routeMaterial = new T.LineBasicMaterial({
    color: "#4fc5e8",
    transparent: true,
    opacity: 0.32,
  });
  const markerMaterial = new T.MeshBasicMaterial({ color: "#ffad86" });
  const markerGeo = new T.SphereGeometry(0.028, 8, 6);
  const routes = [
    [-74, 41],
    [2, 49],
    [104, 1],
  ].map(([lon, lat], i) => {
    const local = point(lon, lat, radius + 0.018);
    const pin = new T.Mesh(markerGeo, markerMaterial);
    pin.position.copy(local);
    earth.add(pin);
    const routeGeo = new T.BufferGeometry();
    routeGeo.setAttribute(
      "position",
      new T.BufferAttribute(new Float32Array(49 * 3), 3),
    );
    const line = new T.Line(routeGeo, routeMaterial);
    line.frustumCulled = false;
    group.add(line);
    const pulse = new T.Mesh(markerGeo, markerMaterial);
    group.add(pulse);
    return {
      local,
      pin,
      pulse,
      geo: routeGeo,
      start: new T.Vector3(),
      mid: new T.Vector3(),
      phase: i / 3,
    };
  });
  const fades = new Map<T.Material, number>();
  group.traverse((object) => {
    if (!(
      object instanceof T.Mesh ||
      object instanceof T.Line ||
      object instanceof T.Points
    ))
      return;
    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    for (const material of materials)
      if (!(material instanceof T.ShaderMaterial) && !fades.has(material)) {
        fades.set(material, material.opacity);
        material.transparent = true;
      }
  });
  let rotation = -0.45;
  let lightTheme = false;
  const scratch = new T.Vector3();
  const sample = (
    start: T.Vector3,
    mid: T.Vector3,
    end: T.Vector3,
    t: number,
    out: T.Vector3,
  ) =>
    out
      .copy(start)
      .multiplyScalar((1 - t) * (1 - t))
      .addScaledVector(mid, 2 * (1 - t) * t)
      .addScaledVector(end, t * t);
  return {
    group,
    dispose() {
      screenTexture.dispose();
      lightScreenTexture.dispose();
    },
    setTheme(light: boolean) {
      screen.material.map = light ? lightScreenTexture : screenTexture;
      screen.material.needsUpdate = true;
      const shell = phone.children[0] as T.Mesh<T.ExtrudeGeometry, T.MeshStandardMaterial>;
      shell.material.color.set(light ? "#d7dedb" : "#183747");
      shell.material.metalness = light ? 0.45 : 0.8;
      (earth.children[0] as T.Mesh<T.SphereGeometry, T.MeshBasicMaterial>).material.color.set(light ? "#d8e7e8" : "#061825");
      lightTheme = light;
      earth.children[0].visible = !light;
      daylightOcean.visible = patches.visible = light;
      landDots.visible = !light;

      if (light) landMaterial.uniforms.tint.value.set("#287789");
      else landMaterial.uniforms.tint.value.setRGB(0.34, 0.85, 1);
      orbit.children.forEach((ring, index) => { ring.visible = !light || index === 0; });
      grid.opacity = light ? 0.06 : 0.13;
      orbitMaterial.color.set(light ? "#367b8a" : "#5fdcff");
      routeMaterial.color.set(light ? "#367b8a" : "#4fc5e8");
      markerMaterial.color.set(light ? "#bc563a" : "#ffad86");
      pedestal.children.forEach((object) => {
        (object as T.Mesh<T.TorusGeometry, T.MeshBasicMaterial>).material.color.set(light ? "#367b8a" : "#43cce9");
      });
      fades.set(grid, light ? 0.06 : 0.13);
      grid.color.set(light ? "#1c6979" : "#38afd3");
    },
    update(time: number, delta = 0, energy = 0, reduced = false, reveal = 1) {
      for (const [material, opacity] of fades)
        material.opacity = opacity * reveal;
      landMaterial.uniforms.reveal.value = reveal;
      if (!reduced) rotation += delta * (0.12 + energy * 1.7);
      earth.rotation.y = rotation;
      globe.position.x = -2.3 - energy * 0.12;
      globe.position.y =
        1.25 + (reduced ? 0 : Math.sin(time * 0.8) * 0.055) + energy * 0.08;
      globe.rotation.z = reduced ? 0 : Math.sin(time) * 0.018 - energy * 0.1;
      orbit.rotation.y = reduced ? 0 : time * 0.09;
      orbitMaterial.opacity = (0.42 + energy * 0.4) * reveal;
      glow.uniforms.strength.value = (lightTheme ? 0.09 + energy * 0.12 : 0.6 + energy * 0.6) * reveal;
      landMaterial.uniforms.brightness.value = 1 + energy * 0.6;
      screenGlow.color.set(energy > 0.15 ? (lightTheme ? "#c06b4d" : "#ffad86") : (lightTheme ? "#6a8c8e" : "#67e2e0"));
      phone.position.y =
        3.15 + (reduced ? 0 : Math.sin(time * 0.8 - 0.4) * 0.04);
      earth.updateMatrix();
      globe.updateMatrix();
      for (const r of routes) {
        r.start
          .copy(r.local)
          .applyMatrix4(earth.matrix)
          .applyMatrix4(globe.matrix);
        r.mid.copy(r.start).lerp(phone.position, 0.5);
        r.mid.x -= 0.22;
        r.mid.z += 0.25;
        const attr = r.geo.attributes.position as T.BufferAttribute;
        for (let j = 0; j <= 48; j++) {
          sample(r.start, r.mid, phone.position, j / 48, scratch);
          attr.setXYZ(j, scratch.x, scratch.y, scratch.z);
        }
        attr.needsUpdate = true;
        sample(
          r.start,
          r.mid,
          phone.position,
          (time * 0.18 + r.phase) % 1,
          r.pulse.position,
        );
        r.pin.scale.setScalar(1 + energy * 0.8);
      }
    },
  };
}
