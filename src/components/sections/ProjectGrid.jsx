import { useEffect, useRef } from "react";
import styles from "./ProjectGrid.module.css";
import ProjectCard from "../ui/ProjectCard";

export default function ProjectGrid({ projects }) {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;

    let x = 0;
    let speed = 1;

    const getWidth = () => track.scrollWidth / 2;
    let width = getWidth();

    const animate = () => {
      x -= speed;

      if (Math.abs(x) >= width) {
        x = 0;
      }

      track.style.transform = `translate3d(${x}px, 0, 0)`;
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = getWidth();
    };

    const onEnter = () => (speed = 0.3);
    const onLeave = () => (speed = 1);

    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", handleResize);

    requestAnimationFrame(animate);

    return () => {
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loopedProjects = [...projects, ...projects];

  return (
    <div className={styles.marquee} ref={wrapperRef}>
      <div className={styles.track} ref={trackRef}>
        {loopedProjects.map((project, index) => (
          <div key={`${project.id}-${index}`} className={styles.slide}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}