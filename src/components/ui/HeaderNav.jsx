import { useRef } from "react";
import styles from "./HeaderNav.module.css";
import { Link } from "react-router-dom";

export default function HeaderNav() {
  const ref = useRef();



  return (
    <div ref={ref} className={styles.headerNav}>
      <Link to="/" className={styles.logo}>
        KINGSLEY HEMANS - TEMPORARY PORTFOLIO
      </Link>

      <h2 className={styles.intro}>
        Designer and Creative Developer creating thoughtful <br />
        interactions and experiences for humans
      </h2>

      <nav>
        <ul className={styles.navLinks}>
          <li><Link to="Info">Info,</Link></li>
          <li><Link to="Archives">Archives</Link></li>
        </ul>
      </nav>

      <a href="mailto:kingsleyhemans@gmail.com" className={styles.cta}>
        kingsleyhemans@gmail.com
      </a>
    </div>
  );
}