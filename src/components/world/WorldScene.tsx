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
    interactionStart: 0,
  });
  const jump = useRef({
    x: 0,
    z: 0,
    reveal: 1,
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
  const interaction = useRef({ lean: 0, approach: 0, look: 0, energy: 0 });
  const interactionTimeline = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(
      interaction.current,
      { look: -0.42, duration: 0.7, ease: "sine.inOut" },
      4,
    )
      .to(
        interaction.current,
        { approach: -0.32, lean: 0.13, duration: 0.8, ease: "power2.inOut" },
        4.7,
      )
      .to(
        interaction.current,
        { energy: 1, duration: 0.18, ease: "power2.out" },
        5.4,
      )
      .to(
        interaction.current,
        { lean: -0.04, approach: -0.1, duration: 0.5, ease: "back.out(1.4)" },
        5.55,
      )
      .to(
        interaction.current,
        { energy: 0, duration: 2, ease: "power2.out" },
        5.65,
      )
      .to(
        interaction.current,
        { look: 0, lean: 0, approach: 0, duration: 0.7, ease: "sine.inOut" },
        6.4,
      )
      .set(
        interaction.current,
        { look: 0, lean: 0, approach: 0, energy: 0 },
        12,
      );
    interactionTimeline.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

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
            x: 0,
            z: -8,
            y: -0.7,
            turn: 0,
            reveal: 0,
            walking: true,
          });
          state.current.interactionStart = Infinity;
          greeting.current = gsap
            .timeline({
              onUpdate: invalidate,
              onComplete: () => {
                state.current.interactionStart = state.current.time;
                invalidate();
              },
            })
            .addLabel("approach", 0)
            .to(
              jump.current,
              { z: 0, y: 0, duration: 2.8, ease: "power1.inOut" },
              "approach",
            )
            .addLabel("arrive", 2.8)
            .set(jump.current, { walking: false }, "arrive")
            .to(
              jump.current,
              { squash: 0.94, duration: 0.12, ease: "sine.out" },
              "arrive",
            )
            .to(jump.current, {
              squash: 1,
              duration: 0.35,
              ease: "back.out(1.4)",
            })
            .addLabel("reveal", 3.35)
            .to(
              jump.current,
              { reveal: 1, duration: 0.85, ease: "power2.out" },
              "reveal",
            );
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
    state.current.interactionStart = state.current.time;
    Object.assign(jump.current, {
      x: 0,
      z: 0,
      reveal: 1,
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
    const chapterPhase = s.exact * 1.6;
    interactionTimeline.current?.time(
      reduced || jump.current.reveal < 1 || !Number.isFinite(s.interactionStart)
        ? 0
        : Math.max(0, s.time - s.interactionStart + chapterPhase) % 12,
    );
    const play = interaction.current;
    const mood = [...expressionBeats]
      .reverse()
      .find((beat) => s.exact >= beat.progress)!.mood;
    if ((jump.current.walking || jump.current.reveal < 1) && s.exact > 0.08) {
      greeting.current?.kill();
      s.interactionStart = s.time;
      Object.assign(jump.current, {
        x: 0,
        z: 0,
        reveal: 1,
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
      jump.current.walking
        ? "walk"
        : play.energy > 0.1
          ? "happy"
          : play.look < -0.1
            ? "idle"
            : mood,
      s.time - moodClock.current.start,
      dt,
      reduced,
      s.pointerX + play.look,
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
    world.root.rotation.y = 0;
    world.orbit.rotation.y = s.smooth * 0.45;
    world.panels.visible = jump.current.reveal > 0.001;
    world.panels.scale.setScalar(0.9);
    world.panels.position.y = -0.2 * (1 - jump.current.reveal);
    world.update(
      reduced ? 0 : s.time,
      dt,
      play.energy,
      reduced,
      jump.current.reveal,
    );
    if (companion.current) {
      companion.current.position.x = jump.current.x + play.approach;
      companion.current.position.z = jump.current.z;
      companion.current.rotation.y =
        p.turn + jump.current.turn + play.look + (reduced ? 0 : s.pointerX);
      companion.current.position.y = reduced
        ? 0
        : Math.sin(s.time * 1.6) * 0.055 + jump.current.y + p.lift;
      companion.current.rotation.z = reduced
        ? 0
        : Math.sin(s.time) * 0.025 + jump.current.tilt + p.tilt + play.lean;
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
        entryZ: jump.current.z.toFixed(2),
        earthReveal: jump.current.reveal.toFixed(2),
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
