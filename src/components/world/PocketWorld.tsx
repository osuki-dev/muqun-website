import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const WorldScene = lazy(() => import("./WorldScene"));
gsap.registerPlugin(ScrollTrigger);

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function PocketWorld() {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false),
    [active, setActive] = useState(true);
  const fail = useCallback(() => {
    if (host.current) host.current.dataset.ready = "false";
  }, []);
  useEffect(() => {
    setMounted(true);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    motion();
    media.addEventListener("change", motion);
    let inView = true;
    const visibility = () => setActive(!document.hidden && inView);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      visibility();
    });
    observer.observe(document.getElementById("world-story")!);
    const brand = document.querySelector<HTMLAnchorElement>(".mq-page-header .mq-wordmark");
    const homeHref = brand?.getAttribute("href") ?? "/";
    const setBrandLink = (enabled: boolean) => {
      if (!brand) return;
      brand.dataset.linkActive = String(enabled);
      if (enabled) {
        brand.setAttribute("href", homeHref);
        brand.removeAttribute("tabindex");
      } else {
        brand.removeAttribute("href");
        brand.setAttribute("tabindex", "-1");
      }
    };
    setBrandLink(false);
    const ctx = gsap.context(() => {
      gsap.to(".mq-page-header", {
        "--brand-scale": 1,
        "--brand-offset": "0px",
        "--brand-color": "#f2f0f6",
        ease: "none",
        onUpdate() { setBrandLink(this.progress() > 0.995); },
        scrollTrigger: {
          trigger: "#pocket",
          start: "top top",
          end: "+=240",
          scrub: media.matches ? true : 0.35,
          invalidateOnRefresh: true,
        },
      });
      if (media.matches) return;
      gsap.timeline({ defaults: { ease: "power3.out" } }).from(
        ".mq-page-header .mq-wordmark__mark",
        { y: 14, opacity: 0, duration: 1.1, delay: 0.08 },
      );
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(
          ".hero-copy .world-eyebrow",
          { y: 12, opacity: 0, duration: 0.55 },
          0.1,
        )
        .from(
          ".hero-title-lead",
          { y: 36, opacity: 0, rotate: -2, duration: 0.85 },
          0.2,
        )
        .from(
          ".hero-title-accent",
          { y: 42, opacity: 0, rotate: 2, duration: 0.95 },
          0.32,
        )
        .from(
          ".hero-copy .world-intro",
          { y: 16, opacity: 0, duration: 0.65 },
          0.6,
        )
        .from(
          ".hero-copy .world-button",
          {
            y: 15,
            scale: 0.93,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          0.75,
        );
      gsap.utils.toArray<HTMLElement>(".chapter-copy").forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          })
          .from(el.querySelectorAll(".world-eyebrow,h2"), {
            x: -22,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          })
          .from(
            el.querySelectorAll(
              ":scope > p:not(.world-eyebrow),:scope > .world-actions",
            ),
            { y: 18, opacity: 0, stagger: 0.1, duration: 0.6 },
            "-=.4",
          )
          .from(
            el.querySelectorAll(".session-preview"),
            {
              rotate: -7,
              y: 45,
              scale: 0.93,
              opacity: 0,
              duration: 0.9,
              ease: "back.out(1.2)",
            },
            "-=.4",
          );
      });
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((el, index) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          })
          .from(el, {
            y: 35,
            opacity: 0,
            duration: 0.65,
            delay: (index % 3) * 0.07,
            ease: "power3.out",
          })
          .from(
            el.querySelectorAll(".feature-demo"),
            {
              y: 16,
              scale: 0.9,
              rotate: index % 2 ? 3 : -3,
              duration: 0.8,
              ease: "back.out(1.5)",
            },
            "-=.45",
          );
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".world-steps",
            start: "top 88%",
            once: true,
          },
        })
        .from(".world-steps li", {
          x: -18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.16,
          ease: "power2.out",
        });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".privacy-strip",
            start: "top 85%",
            once: true,
          },
        })
        .from(".privacy-strip h2", { y: 25, opacity: 0, duration: 0.7 })
        .from(
          ".privacy-strip li",
          { x: 18, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=.35",
        );
    });
    const helpPanel = document.querySelector(".gateway-help");
    const refreshLayout = () => ScrollTrigger.refresh();
    helpPanel?.addEventListener("toggle", refreshLayout);
    const resetMotion = () => {
      if (media.matches) ctx.revert();
    };
    media.addEventListener("change", resetMotion);
    return () => {
      setBrandLink(true);
      helpPanel?.removeEventListener("toggle", refreshLayout);
      media.removeEventListener("change", motion);
      media.removeEventListener("change", resetMotion);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      ctx.revert();
    };
  }, []);
  return (
    <div className="pocket-world" ref={host}>
      {mounted && host.current && (
        <SceneBoundary onError={fail}>
          <Canvas
            aria-hidden="true"
            dpr={[1, innerWidth < 700 ? 1.25 : 1.5]}
            frameloop={!active ? "never" : reduced ? "demand" : "always"}
            camera={{ position: [0, 3.4, 10], fov: 38, near: 0.1, far: 140 }}
            gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
            fallback={null}
            onCreated={({ gl }) => {
              gl.toneMappingExposure = 1.1;
              gl.domElement.addEventListener("webglcontextlost", fail, {
                once: true,
              });
            }}
          >
            <Suspense fallback={null}>
              <WorldScene host={host.current} reduced={reduced} />
            </Suspense>
          </Canvas>
        </SceneBoundary>
      )}
    </div>
  );
}
