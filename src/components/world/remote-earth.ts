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
  const earth = new T.Group();
  earth.position.set(-2.45, 1.05, 0.2);
  earth.rotation.y = -0.45;
  group.add(earth);
  earth.add(
    new T.Mesh(
      new T.SphereGeometry(0.94, 48, 32),
      new T.MeshStandardMaterial({
        color: "#112b42",
        roughness: 0.65,
        metalness: 0.2,
      }),
    ),
  );
  const land: number[] = [];
  for (let lat = -55; lat < 82; lat += 3)
    for (let lon = -180; lon < 180; lon += 3) {
      if (continents.some((poly) => inside(lon, lat, poly)))
        land.push(...point(lon, lat, 0.954).toArray());
    }
  const geo = new T.BufferGeometry();
  geo.setAttribute("position", new T.Float32BufferAttribute(land, 3));
  earth.add(
    new T.Points(
      geo,
      new T.PointsMaterial({
        color: "#94d9c9",
        size: 0.025,
        sizeAttenuation: true,
      }),
    ),
  );
  const gridMaterial = new T.LineBasicMaterial({
    color: "#6d9db5",
    transparent: true,
    opacity: 0.18,
  });
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts = Array.from({ length: 97 }, (_, i) =>
      point((i / 96) * 360, lat, 0.947),
    );
    earth.add(
      new T.Line(new T.BufferGeometry().setFromPoints(pts), gridMaterial),
    );
  }
  for (let lon = 0; lon < 180; lon += 30) {
    const pts = Array.from({ length: 97 }, (_, i) =>
      point(lon, (i / 96) * 360, 0.947),
    );
    earth.add(
      new T.Line(new T.BufferGeometry().setFromPoints(pts), gridMaterial),
    );
  }
  const phone = new T.Group();
  phone.position.set(-1.65, 3.2, -0.65);
  phone.rotation.set(-0.08, -0.25, 0.08);
  group.add(phone);
  phone.add(
    new T.Mesh(
      new T.BoxGeometry(0.68, 1.26, 0.09),
      new T.MeshStandardMaterial({
        color: "#9c91c5",
        metalness: 0.65,
        roughness: 0.35,
      }),
    ),
  );
  const screen = new T.Mesh(
    new T.PlaneGeometry(0.57, 1.12),
    new T.MeshBasicMaterial({ color: "#111a2c" }),
  );
  screen.position.z = 0.05;
  phone.add(screen);
  for (let i = 0; i < 3; i++) {
    const line = new T.Mesh(
      new T.PlaneGeometry(0.36 - i * 0.06, 0.024),
      new T.MeshBasicMaterial({ color: i === 0 ? "#ff947b" : "#a3d9ce" }),
    );
    line.position.set(-0.04, 0.15 - i * 0.14, 0.06);
    phone.add(line);
  }
  const pulses: T.Mesh[] = [];
  const routes: T.CatmullRomCurve3[] = [];
  for (const [lon, lat] of [
    [-74, 41],
    [2, 49],
    [104, 1],
  ]) {
    const local = point(lon, lat, 0.99);
    const pin = new T.Mesh(
      new T.SphereGeometry(0.045, 10, 8),
      new T.MeshBasicMaterial({ color: "#ffab86" }),
    );
    pin.position.copy(local);
    earth.add(pin);
    const start = local.clone().applyEuler(earth.rotation).add(earth.position);
    const end = phone.position.clone();
    const mid = start.clone().lerp(end, 0.5);
    mid.y += 1.1;
    mid.z -= 0.65;
    const curve = new T.CatmullRomCurve3([start, mid, end]);
    routes.push(curve);
    group.add(
      new T.Mesh(
        new T.TubeGeometry(curve, 48, 0.009, 4, false),
        new T.MeshBasicMaterial({
          color: "#a8b5d9",
          transparent: true,
          opacity: 0.4,
        }),
      ),
    );
    const pulse = new T.Mesh(
      new T.SphereGeometry(0.035, 8, 6),
      new T.MeshBasicMaterial({ color: "#ffac91" }),
    );
    group.add(pulse);
    pulses.push(pulse);
  }
  return {
    group,
    update(time: number) {
      pulses.forEach((pulse, i) =>
        pulse.position.copy(routes[i].getPoint((time * 0.16 + i / 3) % 1)),
      );
    },
  };
}
