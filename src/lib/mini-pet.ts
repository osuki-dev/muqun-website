import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'gsap';

/** A separate tiny, on-demand scene: no continuous render loop or homepage world. */
export async function mountMiniPet(button: HTMLButtonElement): Promise<() => void> {
  const host = button.querySelector<HTMLElement>('.mini-pet__scene')!;
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(86, 86, false);
  renderer.outputColorSpace = T.SRGBColorSpace;
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(34, 1, 0.1, 20);
  camera.position.set(0, 0.2, 5.1);
  camera.lookAt(0, 0, 0);
  const fill = new T.HemisphereLight('#fff6e6', '#a18a84', 2);
  const key = new T.DirectionalLight('#fff0dc', 3.5);
  key.position.set(-3, 4, 5);
  const rim = new T.DirectionalLight('#bedfff', 1.6);
  rim.position.set(3, 2, -2);
  scene.add(fill, key, rim);
  let model: T.Group;
  try { model = (await new GLTFLoader().loadAsync('/models/pocket-muqun.glb')).scene; }
  catch (error) { renderer.dispose(); throw error; }
  const bounds = new T.Box3().setFromObject(model);
  const center = bounds.getCenter(new T.Vector3());
  const size = bounds.getSize(new T.Vector3());
  const scale = 2.55 / Math.max(size.x, size.y, size.z);
  model.position.copy(center).multiplyScalar(-scale);
  model.scale.setScalar(scale);
  const pivot = new T.Group();
  pivot.add(model);
  scene.add(pivot);
  const render = () => { if (!document.hidden) renderer.render(scene, camera); };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const theme = () => {
    const light = document.documentElement.dataset.theme === 'light';
    fill.intensity = light ? 2.2 : 1.7;
    rim.intensity = light ? 0.9 : 1.6;
    render();
  };
  host.replaceChildren(renderer.domElement);
  const observer = new MutationObserver(theme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  theme();
  const aim = (event: PointerEvent) => {
    if (reduced.matches || event.pointerType !== 'mouse') return;
    const rect = button.getBoundingClientRect();
    gsap.to(pivot.rotation, { y: ((event.clientX - rect.left) / rect.width - 0.5) * 0.7, x: ((event.clientY - rect.top) / rect.height - 0.5) * 0.18, duration: 0.35, overwrite: true, onUpdate: render });
  };
  const rest = () => gsap.to(pivot.rotation, { x: 0, y: 0, duration: reduced.matches ? 0 : 0.45, overwrite: true, onUpdate: render });
  const hop = () => {
    if (reduced.matches) return;
    gsap.killTweensOf(pivot.position);
    gsap.timeline({ onUpdate: render }).to(pivot.position, { y: 0.18, duration: 0.14, ease: 'power2.out' }).to(pivot.position, { y: 0, duration: 0.25, ease: 'power2.inOut' });
  };
  const visibility = () => { if (!document.hidden) render(); };
  button.addEventListener('pointermove', aim);
  button.addEventListener('pointerleave', rest);
  button.addEventListener('click', hop);
  document.addEventListener('visibilitychange', visibility);
  return () => {
    observer.disconnect();
    button.removeEventListener('pointermove', aim);
    button.removeEventListener('pointerleave', rest);
    button.removeEventListener('click', hop);
    document.removeEventListener('visibilitychange', visibility);
    gsap.killTweensOf(pivot.rotation);
    gsap.killTweensOf(pivot.position);
    model.traverse((object) => {
      if (!(object instanceof T.Mesh)) return;
      object.geometry.dispose();
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        for (const value of Object.values(material)) if (value instanceof T.Texture) value.dispose();
        material.dispose();
      }
    });
    renderer.dispose();
  };
}
