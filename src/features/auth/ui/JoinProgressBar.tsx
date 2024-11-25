import cn from 'classnames';
import React from 'react';

import styles from './JoinProgressBar.module.scss';
import type { JoinProgressStage } from '../progress.type';

interface ProgressBarProps {
  currentStage: number;
  prevStage: number;
}

interface JoinProgressBarProps {
  currentStage: number;
  joinStages: JoinProgressStage[];
}

const ProgressDot = ({
  currentStage,
  stage,
  name,
}: JoinProgressStage & { currentStage: number }) => {
  return (
    <div
      className={cn(styles.progressDot, {
        [styles.active]: currentStage > stage,
        [styles.doing]: stage === currentStage,
      })}
    >
      <i>{stage}</i>
      <span>{name}</span>
    </div>
  );
};

const ProgressBar = ({ currentStage, prevStage }: ProgressBarProps) => {
  const isProgressed = currentStage > prevStage;

  return (
    <div className={styles.progressBar}>
      <div className={cn({ [styles.activeBar]: isProgressed })} />
    </div>
  );
};

export const JoinProgressbar = ({ currentStage, joinStages }: JoinProgressBarProps) => {
  return (
    <div className={styles.progressWrapper}>
      {joinStages.map((stage, idx) => (
        <React.Fragment key={stage.name}>
          <ProgressDot currentStage={currentStage} name={stage.name} stage={stage.stage} />
          {idx !== joinStages.length - 1 && (
            <ProgressBar currentStage={currentStage} prevStage={stage.stage} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
