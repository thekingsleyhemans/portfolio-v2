import ProjectGrid from "../components/sections/ProjectGrid";
import Hero from "../components/sections/Hero";
import projects from "../data/projects.json";


export default function Home() {
  return (
    <div>
      <Hero/>
      <ProjectGrid projects={projects} />
    </div>
  );
}