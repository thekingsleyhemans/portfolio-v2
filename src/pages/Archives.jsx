import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import archiveData from "../data/archives.json";
import styles from "./Archives.module.css";

const ITEM_WIDTH = 350;
const ITEM_HEIGHT = 400;
const GAP_X = 30;
const GAP_Y = 30;
const CELL_WIDTH = ITEM_WIDTH + GAP_X;
const CELL_HEIGHT = ITEM_HEIGHT + GAP_Y;

export default function Archives() {
  const containerRef = useRef(null);
  const detailOverlayRef = useRef(null);
  const detailContentRef = useRef(null);

  const [items, setItems] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const itemsRef = useRef([]);
  const domMapRef = useRef(new Map());
  const rafRef = useRef(null);

  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false,
    wasDragged: false,
    startX: 0,
    startY: 0,
    dragStartX: 0,
    dragStartY: 0,
    isDetailView: false,
    activeIndex: null,
  });

  const gridRef = useRef({
    cols: 0,
    rows: 0,
    gridWidth: 0,
    gridHeight: 0,
    wrapBoundX: 0,
    wrapBoundY: 0,
  });

  const lerp = (a, b, t) => a + (b - a) * t;

  // ---------------- GRID ----------------
  useLayoutEffect(() => {
    const cols = Math.max(5, Math.ceil(window.innerWidth / CELL_WIDTH) + 3);
    const rows = Math.max(4, Math.ceil(window.innerHeight / CELL_HEIGHT) + 3);

    const gridWidth = cols * CELL_WIDTH;
    const gridHeight = rows * CELL_HEIGHT;

    gridRef.current = {
      cols,
      rows,
      gridWidth,
      gridHeight,
      wrapBoundX: gridWidth / 2,
      wrapBoundY: gridHeight / 2,
    };

    const newItems = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = (r * cols + c) % archiveData.length;

        newItems.push({
          index,
          baseX: c * CELL_WIDTH - gridWidth / 2,
          baseY: r * CELL_HEIGHT - gridHeight / 2,
          selected: false,
          blurred: false,
          locked: false,
          lockScale: 1,
        });
      }
    }

    itemsRef.current = newItems;

    // defer state commit safely (prevents ESLint + rerender loop warning)
    requestAnimationFrame(() => {
      setItems([...newItems]);
    });
  }, []);

  // ---------------- OPEN ----------------
  const openDetailView = useCallback((idx) => {
    const s = stateRef.current;
    if (s.isDetailView) return;

    s.isDetailView = true;
    s.activeIndex = idx;

    const updated = itemsRef.current.map((it, i) => ({
      ...it,
      selected: i === idx,
      blurred: i !== idx,
      locked: i === idx,
      lockScale: i === idx ? 1.5 : 1,
    }));

    itemsRef.current = updated;
    setItems(updated);

    const el = domMapRef.current.get(idx);
    if (!el) return;

    // Store original position
    s.originalX = gsap.getProperty(el, "x");
    s.originalY = gsap.getProperty(el, "y");

    const rect = el.getBoundingClientRect();
    const scaleValue = 1.5;

    // final dimensions after scaling
    const finalWidth = rect.width * scaleValue;
    const finalHeight = rect.height * scaleValue;

    // distance needed from current viewport position
    const targetX = (window.innerWidth - finalWidth) / 2 - rect.left;
    const targetY = (window.innerHeight - finalHeight) / 2 - rect.top;

    const detailsY = window.innerHeight * 0.8;

    gsap.killTweensOf(el);

    gsap.to(el, {
      x: `+=${targetX}`,
      y: `+=${targetY}`,
      scale: scaleValue,
      transformOrigin: "center center",
      duration: 0.7,
      ease: "power3.out",
    });
    setSelectedProject(archiveData[updated[idx].index]);

    document.body.style.overflow = "hidden";

    // Position the details below the card
    gsap.set(detailContentRef.current, { top: detailsY });
    gsap.to(detailOverlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
      pointerEvents: "auto",
    });
  }, []);

  // ---------------- CLOSE (FIXED + GUARANTEED RESET) ----------------
  const closeDetailView = useCallback(() => {
    const s = stateRef.current;
    if (!s.isDetailView) return;

    const idx = s.activeIndex;
    const el = domMapRef.current.get(idx);

    s.isDetailView = false;
    s.activeIndex = null;

    // stop RAF interference during transition
    if (el) {
      gsap.killTweensOf(el);

      gsap.to(el, {
        x: s.originalX,
        y: s.originalY,
        scale: 1,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          // only reset AFTER animation completes
          const reset = itemsRef.current.map((it) => ({
            ...it,
            selected: false,
            blurred: false,
            locked: false,
            lockScale: 1,
          }));

          itemsRef.current = reset;
          setItems(reset);
        },
      });
    } else {
      // fallback reset if no element found
      const reset = itemsRef.current.map((it) => ({
        ...it,
        selected: false,
        blurred: false,
        locked: false,
        lockScale: 1,
      }));

      itemsRef.current = reset;
      setItems(reset);
    }

    setSelectedProject(null);

    document.body.style.overflow = "";

    gsap.to(detailOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
      pointerEvents: "none",
    });
  }, []);

  // ---------------- INPUT ----------------
  const startDrag = (x, y) => {
    const s = stateRef.current;
    s.isDragging = true;
    s.startX = x;
    s.startY = y;
    s.dragStartX = s.targetX;
    s.dragStartY = s.targetY;
  };

  const moveDrag = (x, y) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    const dx = x - s.startX;
    const dy = y - s.startY;

    s.targetX = s.dragStartX + dx * 1.5;
    s.targetY = s.dragStartY + dy * 1.5;

    s.wasDragged = Math.abs(dx) > 5 || Math.abs(dy) > 5;
  };

  const stopDrag = () => {
    stateRef.current.isDragging = false;
    stateRef.current.wasDragged = false;
  };

  // ---------------- EVENTS ----------------
  useEffect(() => {
    const wheel = (e) => {
      const s = stateRef.current;
      if (s.isDetailView) return;

      s.targetX -= e.deltaX * 1.5;
      s.targetY -= e.deltaY * 1.5;
    };

    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("mousedown", (e) =>
      startDrag(e.clientX, e.clientY),
    );
    window.addEventListener("mousemove", (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener("mouseup", stopDrag);

    return () => window.removeEventListener("wheel", wheel);
  }, []);

  // ---------------- RENDER LOOP (FIXED CORE ISSUE) ----------------
  useEffect(() => {
    const render = () => {
      const s = stateRef.current;
      const g = gridRef.current;

      const isDetail = s.isDetailView;

      s.currentX = lerp(s.currentX, s.targetX, 0.08);
      s.currentY = lerp(s.currentY, s.targetY, 0.08);

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      const list = itemsRef.current;

      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const el = domMapRef.current.get(i);
        if (!el) continue;

        // 🔥 IMPORTANT: freeze background when detail is open
        if (isDetail && !item.locked) continue;

        if (item.locked) continue;

        let dx = (item.baseX + s.currentX) % g.gridWidth;
        let dy = (item.baseY + s.currentY) % g.gridHeight;

        if (dx > g.wrapBoundX) dx -= g.gridWidth;
        if (dx < -g.wrapBoundX) dx += g.gridWidth;

        if (dy > g.wrapBoundY) dy -= g.gridHeight;
        if (dy < -g.wrapBoundY) dy += g.gridHeight;

        gsap.set(el, {
          x: cx + dx - ITEM_WIDTH / 2,
          y: cy + dy - ITEM_HEIGHT / 2,
          scale: item.selected ? item.lockScale : item.blurred ? 0.95 : 1,
        });
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ---------------- UI ----------------
  return (
    <>
      <div className={styles.grainOverlay} />

      <div ref={containerRef} className={styles.galleryContainer}>
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) domMapRef.current.set(i, el);
            }}
            className={`${styles.galleryItem} ${
              item.selected ? styles.selected : ""
            } ${item.blurred ? styles.blurred : ""}`}
            onClick={() => {
              if (!stateRef.current.wasDragged) openDetailView(i);
            }}
          >
            <img
              src={archiveData[item.index].image}
              alt={archiveData[item.index].title}
            />
          </div>
        ))}
      </div>

      <div
        ref={detailOverlayRef}
        className={styles.detailOverlay}
        onClick={closeDetailView}
      >
        <div
          ref={detailContentRef}
          className={styles.detailContent}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedProject && (
            <>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
