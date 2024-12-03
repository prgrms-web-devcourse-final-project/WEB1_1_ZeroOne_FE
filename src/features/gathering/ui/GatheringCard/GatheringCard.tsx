import { faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './GatheringCard.module.scss';
import { JobTag } from './JobTag';

export interface GatheringCardProps {
  title: string;
  className?: string; // 외부에서 추가 클래스 전달 가능
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
  return (
    <Link
      className={cn(
        styles.card,
        {
          //조건부 클래스 추가
        },
        className, // 외부 클래스 추가
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
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faPhone} />
          </div>
        </section>
      </li>
    </Link>
  );
};
