import * as T from "three";
export const moods = [
  "idle",
  "thinking",
  "working",
  "waiting",
  "success",
  "error",
  "walk",
  "turn",
] as const;
export type Mood = (typeof moods)[number] | "happy";

/** The studio exports visible geometry only. Restore its alternate eyes and mouth
 * on the original named pivots, keeping its measured face dimensions and timing. */
export function createMascotMotion(model: T.Group) {
  const head = model.getObjectByName("Body_Pivot")!;
  const tuft = model.getObjectByName("Crest_Pivot")!;
  const mouth = model.getObjectByName("Mouth_Pivot")!;
  const smile = model.getObjectByName("Mouth_Smile")!;
  const eyes = ["L", "R"].map((side) =>
    model.getObjectByName(`Eye_${side}_Pivot`)!,
  );
  const happyEyes = ["L", "R"].map((side) =>
    model.getObjectByName(`Smile_Eye_${side}`)!,
  );
  const feet = ["L", "R"].map((side) => model.getObjectByName(`Foot_${side}`)!);
  const ink = (happyEyes[0] as T.Mesh).material as T.Material;
  const mouthMat = (smile as T.Mesh).material as T.Material;
  const cream = new T.MeshBasicMaterial({ color: "#fff7e8" });
  const sphere = new T.SphereGeometry(1, 20, 16);
  const bean = (
    parent: T.Object3D,
    material: T.Material,
    scale: number[],
    position: number[],
  ) => {
    const mesh = new T.Mesh(sphere, material);
    mesh.scale.fromArray(scale);
    mesh.position.fromArray(position);
    parent.add(mesh);
    return mesh;
  };
  const pupils = eyes.map((eye) => {
    const pupil = bean(eye, ink, [0.135, 0.2, 0.085], [0, 0, 0]);
    const glint = bean(
      eye,
      cream,
      [0.038, 0.045, 0.017],
      [-0.027, 0.07, 0.078],
    );
    return [pupil, glint];
  });
  const surprise = bean(mouth, mouthMat, [0.075, 0.105, 0.015], [0, 0, 0.006]);
  const brows = [-0.48, 0.48].map((x) =>
    bean(head, ink, [0.14, 0.025, 0.02], [x, 0.48, 0.73]),
  );
  const effectMaterial = new T.MeshBasicMaterial({ color: "#d6c2ff" });
  const effects = new T.Group();
  model.add(effects);
  const dots = [0, 1, 2].map((i) =>
    bean(
      effects,
      effectMaterial,
      [0.055, 0.055, 0.055],
      [1.55, 2.5 + i * 0.17, 0],
    ),
  );
  const ring = new T.Mesh(
    new T.TorusGeometry(0.18, 0.025, 12, 40),
    effectMaterial,
  );
  ring.position.set(1.55, 2.45, 0);
  effects.add(ring);
  return (
    mood: Mood,
    time: number,
    dt: number,
    reduced: boolean,
    gaze: number,
  ) => {
    const t = reduced ? 0 : time;
    const joyful = mood === "success" || mood === "happy";
    const walking = mood === "walk" || mood === "turn";
    const blink = reduced ? 0 : Math.pow(Math.max(0, Math.sin(t * 1.1)), 70);
    head.position.y = 1.35;
    head.rotation.set(0, 0, 0);
    head.scale.set(1, 1, 1);
    mouth.scale.set(1, 1, 1);
    smile.visible = mood !== "waiting" && mood !== "error";
    surprise.visible = !smile.visible;
    surprise.scale.set(0.075, mood === "waiting" ? 0.07 : 0.045, 0.015);
    brows.forEach((b, i) => {
      b.visible = mood === "error";
      b.rotation.z = i ? 0.3 : -0.3;
    });
    eyes.forEach((eye, i) => {
      eye.position.y = mood === "thinking" ? 0.24 : 0.2;
      eye.position.x = (i ? 0.56 : -0.4) + (reduced ? 0 : gaze * 0.2);
      eye.scale.y = joyful
        ? 1
        : (1 - blink * 0.92) *
          (mood === "working" ? 0.72 : mood === "error" ? 0.8 : 1);
      happyEyes[i].visible = joyful;
      pupils[i].forEach((p) => (p.visible = !joyful));
    });
    effects.visible = ["thinking", "working", "waiting"].includes(mood);
    dots.forEach((dot, i) => {
      dot.visible = mood === "thinking";
      dot.scale.setScalar(0.055 + (reduced ? 0 : Math.sin(t * 3 - i) * 0.014));
    });
    ring.visible = mood === "working";
    ring.rotation.set(0, t * 2, t);
    feet.forEach((foot, i) => {
      foot.position.set(i ? 0.7 : -0.7, 0.19, 0.08);
      foot.rotation.set(0, 0, 0);
    });
    let crestZ = Math.sin(t * 1.9 - 0.7) * 0.025,
      crestX = Math.sin(t * 1.9 - 1.2) * 0.018;
    if (mood === "thinking") {
      head.rotation.z = 0.075 + Math.sin(t) * 0.025;
      crestZ = -0.06 + Math.sin(t - 0.7) * 0.04;
    }
    if (mood === "working") {
      head.rotation.x = Math.sin(t * 4) * 0.035;
      feet[0].rotation.z = Math.sin(t * 5) * 0.08;
    }
    if (mood === "waiting") head.rotation.z = -0.12;
    if (joyful) {
      head.position.y += Math.max(0, Math.sin(t * 3)) * 0.06;
      head.rotation.z = Math.sin(t * 3) * 0.055;
      mouth.scale.set(1.1, 1.2, 1);
      crestZ = Math.sin(t * 3 - 0.7) * 0.14;
      crestX = Math.sin(t * 3 - 1) * 0.07;
    }
    if (mood === "error") head.rotation.z = Math.sin(t * 4) * 0.025;
    if (walking) {
      const phase = t * 7;
      head.rotation.z = Math.sin(phase) * 0.035;
      head.position.y += Math.abs(Math.sin(phase)) * 0.025;
      feet.forEach((foot, i) => {
        const step = Math.sin(phase + i * Math.PI);
        foot.position.y += Math.max(0, step) * 0.12;
        foot.position.z += Math.cos(phase + i * Math.PI) * 0.13;
      });
      crestZ = Math.sin(phase - 0.85) * 0.11;
    }
    const turn =
      mood === "turn" && !reduced
        ? T.MathUtils.smoothstep(t % 6, 0, 4.5) * Math.PI * 2
        : 0;
    model.rotation.y = turn;
    const blend = reduced ? 1 : 1 - Math.exp(-dt * 8);
    tuft.rotation.z = T.MathUtils.lerp(tuft.rotation.z, crestZ, blend);
    tuft.rotation.x = T.MathUtils.lerp(tuft.rotation.x, crestX, blend);
  };
}
