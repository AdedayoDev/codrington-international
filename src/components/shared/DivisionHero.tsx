import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type DivisionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
  theme?: "corporate" | "apparel" | "editorial";
};

export function DivisionHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  theme = "corporate",
}: DivisionHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={`division-hero division-hero--${theme}`}>
      <div className='site-container division-hero__grid'>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='division-hero__copy'
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className='eyebrow'>{eyebrow}</p>
          <h1 className='division-hero__title'>{title}</h1>
          <p className='division-hero__description'>{description}</p>
          <div className='division-hero__actions'>{children}</div>
        </motion.div>
        <div className='division-hero__image-wrap'>
          <img
            className='division-hero__image'
            src={image}
            alt={imageAlt}
            fetchPriority='high'
          />
        </div>
      </div>
    </section>
  );
}
