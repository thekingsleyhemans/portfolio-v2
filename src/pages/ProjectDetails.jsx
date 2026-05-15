import styles from "./ProjectDetails.module.css";
import projectData from "../data/projects.json";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { slug } = useParams();

  const project = projectData.find((p) => p.slug === slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className={styles.projectDetailsSec}>
      {/* LEFT / STICKY SIDE */}
      <div className="sticky-side">
        <h1 className={styles.title}>{project.title}</h1>

        <div className="project-description">
          <div>
            <span>Year</span>
            2026
          </div>

          <div>
            <span>Credit(s)</span>
            Kelvin Wilson
          </div>

          <div>
            <span>Services</span>
            {project.services.map((service, i) => (
              <p key={i}>{service}</p>
            ))}
          </div>

          <div>
            <span>Description</span>
            <p>{project.description}</p>
          </div>

          <div>
            <span>Live Site</span>
            <a href="#">thelink.com</a>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div className={styles.gallery}>
        {project.gallery.map((img, i) => (
          <img key={i} src={img} alt={`${project.title} ${i}`} />
        ))}
      </div>
    </div>
  );
}