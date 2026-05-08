import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/project/${project.slug}`} className={styles.link}>
      <div className={styles.project__card}>
        <img src={project.heroImage} alt={project.title} />

        <div className={styles.project_deets}>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;