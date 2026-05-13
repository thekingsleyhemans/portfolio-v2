import { useEffect, useRef } from "react";
import styles from "./ProjectGrid.module.css";
import ProjectCard from "../ui/ProjectCard";
import { gsap } from "gsap";

export default function ProjectGrid({ projects }) {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  const loopedProjects = [...projects, ...projects];

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;

    let speed = 100;
    let tween;

    const measureWidth = () => {
      return track.scrollWidth / 2;
    };

    const create = () => {
      const width = measureWidth();

      // kill old tween if exists
      if (tween) tween.kill();

      // IMPORTANT: single continuous tween (no ticker)
      tween = gsap.to(track, {
        x: `-=${width}`,
        duration: width / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            // wrap prevents jump
            const mod = parseFloat(x) % width;
            return mod;
          }),
        },
      });
    };

    const slow = () => tween && tween.timeScale(0.3);
    const normal = () => tween && tween.timeScale(1);

    wrapper.addEventListener("mouseenter", slow);
    wrapper.addEventListener("mouseleave", normal);

    // wait for layout stability (critical)
    requestAnimationFrame(() => {
      requestAnimationFrame(create);
    });

    return () => {
      if (tween) tween.kill();
      wrapper.removeEventListener("mouseenter", slow);
      wrapper.removeEventListener("mouseleave", normal);
    };
  }, []);

  return (
    <div className={styles.marquee} ref={wrapperRef}>
      <div className={styles.track} ref={trackRef}>
        {loopedProjects.map((project, index) => (
          <ProjectCard key={`${project.id}-${index}`} project={project} />
        ))}
      </div>
    </div>
  );
}