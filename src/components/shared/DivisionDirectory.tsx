import { Link } from "react-router-dom";
import { divisions } from "../../data/divisions";

type DivisionDirectoryProps = {
  compact?: boolean;
};

export function DivisionDirectory({ compact = false }: DivisionDirectoryProps) {
  return (
    <div
      className={`division-directory${compact ? " division-directory--compact" : ""}`}
    >
      {divisions.map((division) => (
        <article className='division-directory__item' key={division.to}>
          <p className='division-directory__eyebrow'>Business division</p>
          <h3 className='division-directory__title'>{division.title}</h3>
          <p className='division-directory__description'>
            {division.description}
          </p>
          <Link className='text-link' to={division.to}>
            {division.action}
          </Link>
        </article>
      ))}
    </div>
  );
}
