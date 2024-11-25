import styles from './JobTag.module.scss';

interface JobTagProps {
  job: string;
}
export const JobTag = ({ job }: JobTagProps) => {
  return <div className={styles.jobTag}>{job}</div>;
};