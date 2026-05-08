import styles from "./ProjectGrid.module.css";
import ProjectCard from "../ui/ProjectCard";

export default function ProjectGrid({projects}) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
