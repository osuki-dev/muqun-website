import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as T from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { chapters, expressionBeats } from "./chapters";
import { createMascotMotion, type Mood } from "./mascot-motion";
import { createEnvironment } from "./environment";

function disposeTree(object: T.Object3D) {
  const geometries = new Set<T.BufferGeometry>(),
    materials = new Set<T.Material>(),
    textures = new Set<T.Texture>();
  object.traverse((o) => {
    if (!(o instanceof T.Mesh || o instanceof T.Points || o instanceof T.Line))
      return;
    geometries.add(o.geometry);
    for (const material of Array.isArray(o.material)
      ? o.material
      : [o.material]) {
      materials.add(material);
      Object.values(material).forEach((value) => {
        if (value instanceof T.Texture) textures.add(value);
      });
    }
  });
  geometries.forEach((g) => g.dispose());
  textures.forEach((t) => t.dispose());
  materials.forEach((m) => m.dispose());
}
export default function WorldScene({
  host,
  reduced,
}: {
  host: HTMLElement;
  reduced: boolean;
}) {
  const { camera, gl, size, invalidate, setDpr } = useThree();
  const world = useMemo(createEnvironment, []);
  const companion = useRef<T.Group>(null);
  const animate = useRef<ReturnType<typeof createMascotMotion> | null>(null);
  const moodClock = useRef<{ mood: Mood; start: number }>({
    mood: "success",
    start: 0,
  });
  const model = useRef<T.Group | null>(null);
  const state = useRef({
    exact: 0,
    smooth: 0,
    time: 0,
    slow: 0,
    pointerX: 0,
    pointerY: 0,
    last: 0,
  });
  const jump = useRef({
    x: 0,
    y: 0,
    turn: 0,
    tilt: 0,
    squash: 1,
    walking: false,
  });
  const greeting = useRef<gsap.core.Timeline | null>(null);
  const target = useMemo(() => new T.Vector3(), []);
  const pose = useRef({
    cx: 0,
    cy: 3.4,
    cz: 10,
    tx: 0,
    ty: 1.3,
    tz: 0,
    turn: -0.18,
    orbit: 0.18,
    lift: 0,
    scale: 1,
    tilt: 0,
  });
  const choreography = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });
    chapters.forEach((chapter, index) => {
      const value = {
        cx: chapter.camera[0],
        cy: chapter.camera[1],
        cz: chapter.camera[2],
        tx: chapter.target[0],
        ty: chapter.target[1],
        tz: chapter.target[2],
        turn: chapter.turn,
        orbit: chapter.orbit,
        lift: chapter.lift,
        scale: chapter.scale,
        tilt: chapter.tilt,
      };
      if (index === 0) timeline.set(pose.current, value, 0);
      else
        timeline.to(
          pose.current,
          { ...value, duration: 1, ease: "sine.inOut" },
          index - 1,
        );
    });
    choreography.current = timeline;
    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    new GLTFLoader().load(
      "/models/pocket-muqun.glb",
      (gltf) => {
        if (cancelled) {
          disposeTree(gltf.scene);
          return;
        }
        model.current = gltf.scene;
        animate.current = createMascotMotion(gltf.scene);
        companion.current?.add(gltf.scene);
        host.dataset.ready = "true";
        if (
          !matchMedia("(prefers-reduced-motion: reduce)").matches &&
          window.scrollY < 100
        ) {
          Object.assign(jump.current, {
            x: 6,
            turn: -Math.PI / 2,
            walking: true,
          });
          greeting.current = gsap
            .timeline({
              onUpdate: invalidate,
              onComplete: () => {
                jump.current.walking = false;
                invalidate();
              },
            })
            .to(
              jump.current,
              { x: 0, duration: 2.4, ease: "power1.inOut" },
              0.15,
            )
            .to(
              jump.current,
              { turn: 0, duration: 0.55, ease: "sine.inOut" },
              2.2,
            )
            .to(
              jump.current,
              { squash: 0.94, duration: 0.12, ease: "sine.out" },
              2.55,
            )
            .to(jump.current, {
              squash: 1,
              duration: 0.35,
              ease: "back.out(1.5)",
            });
        }
        invalidate();
      },
      undefined,
      () => {
        host.dataset.ready = "false";
      },
    );
    return () => {
      cancelled = true;
      greeting.current?.kill();
      if (model.current) {
        disposeTree(model.current);
        model.current = null;
      }
    };
  }, [host, invalidate]);

  useEffect(() => {
    let anchors: number[] = [];
    const scroll = () => {
      let i = 0;
      while (i < anchors.length - 2 && scrollY >= anchors[i + 1]) i++;
      state.current.exact = T.MathUtils.clamp(
        i + (scrollY - anchors[i]) / Math.max(1, anchors[i + 1] - anchors[i]),
        0,
        3,
      );
      invalidate();
    };
    const measure = () => {
      anchors = chapters.map(
        (c) =>
          (document.getElementById(c.id)?.getBoundingClientRect().top ?? 0) +
          scrollY,
      );
      scroll();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced) return;
      state.current.pointerX = (event.clientX / innerWidth - 0.5) * 0.2;
      state.current.pointerY = (event.clientY / innerHeight - 0.5) * 0.08;
    };
    const observer = new ResizeObserver(measure);
    const story = document.getElementById("world-story");
    if (story) observer.observe(story);
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    measure();
    state.current.smooth = state.current.exact;
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", move);
    };
  }, [invalidate, reduced]);

  useEffect(() => {
    greeting.current?.kill();
    Object.assign(jump.current, {
      x: 0,
      y: 0,
      turn: 0,
      tilt: 0,
      squash: 1,
      walking: false,
    });
    if (camera instanceof T.PerspectiveCamera) {
      camera.fov = size.width < 1000 ? 46 : 38;
      camera.updateProjectionMatrix();
    }
    invalidate();
  }, [reduced, camera, size, invalidate]);
  useEffect(() => () => disposeTree(world.root), [world]);

  useFrame((_frame, delta) => {
    const s = state.current,
      dt = Math.min(delta, 1 / 30),
      mobile = size.width < 700;
    if (!reduced) s.time += dt;
    const mood = [...expressionBeats]
      .reverse()
      .find((beat) => s.exact >= beat.progress)!.mood;
    if (jump.current.walking && s.exact > 0.08) {
      greeting.current?.kill();
      Object.assign(jump.current, {
        x: 0,
        y: 0,
        turn: 0,
        tilt: 0,
        squash: 1,
        walking: false,
      });
    }
    if (moodClock.current.mood !== mood)
      moodClock.current = { mood, start: s.time };
    animate.current?.(
      jump.current.walking ? "walk" : mood,
      s.time - moodClock.current.start,
      dt,
      reduced,
      s.pointerX,
    );
    s.smooth = reduced
      ? Math.round(s.exact)
      : T.MathUtils.damp(s.smooth, s.exact, 5.2, dt);
    choreography.current?.time(s.smooth);
    const p = pose.current;
    camera.position.set(p.cx, p.cy, p.cz);
    target.set(p.tx, p.ty, p.tz);
    if (mobile) {
      camera.position.multiplyScalar(1.15);
      target.y -= 0.8;
    } else if (size.width < 1000) {
      camera.position.multiplyScalar(1.5);
      target.x -= 1.6;
      camera.position.x -= 1.6;
    } else {
      target.x -= 2.45;
      camera.position.x -= 2.45;
    }
    camera.lookAt(target);
    world.root.rotation.y = p.turn * 0.2;
    world.orbit.rotation.y = s.smooth * 0.45;
    world.panels.scale.setScalar(0.85 + p.orbit * 0.15);
    world.update(reduced ? 0 : s.time);
    if (companion.current) {
      companion.current.position.x = jump.current.x;
      companion.current.rotation.y =
        p.turn + jump.current.turn + (reduced ? 0 : s.pointerX);
      companion.current.position.y = reduced
        ? 0
        : Math.sin(s.time * 1.6) * 0.055 + jump.current.y + p.lift;
      companion.current.rotation.z = reduced
        ? 0
        : Math.sin(s.time) * 0.025 + jump.current.tilt + p.tilt;
      const squash = reduced ? 1 : jump.current.squash;
      companion.current.scale.set(
        p.scale / Math.sqrt(squash),
        p.scale * squash,
        p.scale / Math.sqrt(squash),
      );
    }
    if (delta > 0.026 && delta < 0.2) {
      if (++s.slow === 150) setDpr(1);
    } else s.slow = Math.max(0, s.slow - 1);
    if (import.meta.env.DEV)
      Object.assign(host.dataset, {
        calls: String(gl.info.render.calls),
        triangles: String(gl.info.render.triangles),
        frameMs: (delta * 1000).toFixed(1),
        progress: s.exact.toFixed(3),
        mood,
        textures: String(gl.info.memory.textures),
      });
  });
  return (
    <>
      <fogExp2 attach="fog" args={["#090b14", 0.016]} />
      <primitive object={world.root} dispose={null} />
      <group ref={companion} dispose={null} />
    </>
  );
}
