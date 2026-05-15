import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © 2026 Kingsley Hemans. All rights reserved.
      </p>
        <ul>
          <li>
            <a href="https://www.awwwards.com/hemansjr/" target="_blank" rel="noopener noreferrer">
              Awwwards
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/hemansjr/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.behance.net/kingsleyhemans" target="_blank" rel="noopener noreferrer">
              Behance
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/kingsley-hemans/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      <p>Designed & Developed by Kingsley Hemans.</p>
    </footer>
  );
}
