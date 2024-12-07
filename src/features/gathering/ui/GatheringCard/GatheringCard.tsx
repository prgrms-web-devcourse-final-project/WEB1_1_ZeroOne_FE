import { faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './GatheringCard.module.scss';
import { JobTag } from './JobTag';

import { ContactBtn } from '@/features/portfolio/ui/ContactBtn';

export interface GatheringCardProps {
  title: string;
  className?: string;
  name?: string;
  introduction?: string;
  tag?: string[];
  deadline?: string;
  gatheringId: number;
}

export const GatheringCard = ({
  title,
  className,
  name,
  introduction,
  tag,
  deadline,
  gatheringId,
}: GatheringCardProps) => {
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
  };

  return (
    <Link
      className={cn(
        styles.card,
        {
          //조건부 클래스 추가
        },
        className,
      )}
      to={`/gathering/${gatheringId}`}
    >
      <li>
        <h2 className={cn(styles.card__title)}>{title}</h2>
        <h3 className={styles.card__name}>{name}</h3>
        <article className={styles.card__introduction}>{introduction}</article>
        <ul className={styles.card__tagCon}>{tag?.map((e, i) => <JobTag job={e} key={i} />)}</ul>
        <section className={styles.card__deadlineCon}>
          <div>마감일 {deadline}</div>
          <div className={styles.buttons}>
            <button 
              className={styles.actionBtn} 
              onClick={handleButtonClick}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button 
              className={styles.actionBtn}
              onClick={handleButtonClick}
            >
              <FontAwesomeIcon icon={faPhone} />
            </button>
            <div onClick={handleButtonClick}>
              <ContactBtn userName='' />
            </div>
          </div>
        </section>
      </li>
    </Link>
  );
};