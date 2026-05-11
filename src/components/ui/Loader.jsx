import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Loader.module.css";

export default function Loader() {
  const containerRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray(`.${styles.counter}`);

      const tl = gsap.timeline({
        onComplete: () => {
          setShowLoader(false);
        },
      });

      tl.from(`.${styles.lineInner}`, {
        y: "120%",
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      })

        .to(counters[3], {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })

        .to(
          { val: 0 },
          {
            val: 10,
            duration: 1,
            onUpdate() {
              counters[3].textContent = Math.floor(
                this.targets()[0].val
              )
                .toString()
                .padStart(3, "0");
            },
          },
          "<"
        )

        .to(counters[3], {
          y: "-100%",
          duration: 0.5,
          ease: "power2.in",
        })

        .to(counters[2], {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })

        .to(
          { val: 10 },
          {
            val: 25,
            duration: 1,
            onUpdate() {
              counters[2].textContent = Math.floor(
                this.targets()[0].val
              )
                .toString()
                .padStart(3, "0");
            },
          },
          "<"
        )

        .to(counters[2], {
          y: "-100%",
          duration: 0.5,
          ease: "power2.in",
        })

        .to(counters[1], {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })

        .to(
          { val: 25 },
          {
            val: 50,
            duration: 1,
            onUpdate() {
              counters[1].textContent = Math.floor(
                this.targets()[0].val
              )
                .toString()
                .padStart(3, "0");
            },
          },
          "<"
        )

        .to(counters[1], {
          y: "-100%",
          duration: 0.5,
          ease: "power2.in",
        })

        .to(counters[0], {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })

        .to(
          { val: 50 },
          {
            val: 100,
            duration: 1,
            onUpdate() {
              counters[0].textContent = Math.floor(
                this.targets()[0].val
              )
                .toString()
                .padStart(3, "0");
            },
          },
          "<"
        )

        .to(counters[0], {
          y: "-100%",
          duration: 0.5,
          ease: "power2.in",
        })

        .to(
          `.${styles.lineInner}`,
          {
            y: "100%",
            duration: 0.5,
            ease: "power2.in",
          },
          "<"
        )

        .to(
          `.${styles.wrapper}`,
          {
            y: "-100%",
            duration: .6,
            ease: "power3.inOut",
          },
          "+=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!showLoader) return null;

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.abt}>
          <h2 className={styles.intro}>
            <span className={styles.line}>
              <span className={styles.lineInner}>
                Designer and Creative Developer
              </span>
            </span>

            <span className={styles.line}>
              <span className={styles.lineInner}>
                creating thoughtful interactions
              </span>
            </span>

            <span className={styles.line}>
              <span className={styles.lineInner}>
                and experiences for humans.
              </span>
            </span>
          </h2>
        </div>

        <div className={styles.loaderCounterWrap}>
          <div><p className={styles.counter}>100</p></div>
          <div><p className={styles.counter}>050</p></div>
          <div><p className={styles.counter}>025</p></div>
          <div><p className={styles.counter}>000</p></div>
        </div>
      </div>
    </section>
  );
}