import styles from './PortFolioGrid.module.scss';

import { PortfolioCard } from '@/features';
import type { Portfolio } from '@/features';

export const PortFolioGrid = () => {
  const portfolios: Portfolio[] = [
    {
      portFolioId: 28,
      portFolioUrl: 'https://example.com/portfolio/28',
      username: '리성원',
      introduction: '안녕하세요',
      majorJobGroup: '개발',
      minorJobGroup: '서버/백엔드 개발자',
      memberImageUrl: 'fdsf',
    },
    {
      portFolioId: 28,
      portFolioUrl: 'https://example.com/portfolio/28',
      username: '리성원',
      introduction: '안녕하세요',
      majorJobGroup: '개발',
      minorJobGroup: '서버/백엔드 개발자',
      memberImageUrl: 'fdsf',
    },
    {
      portFolioId: 28,
      portFolioUrl: 'https://example.com/portfolio/28',
      username: '리성원',
      introduction: '안녕하세요',
      majorJobGroup: '개발',
      minorJobGroup: '서버/백엔드 개발자',
      memberImageUrl: 'fdsf',
    },
    {
      portFolioId: 28,
      portFolioUrl: 'https://example.com/portfolio/28',
      username: '리성원',
      introduction: '안녕하세요',
      majorJobGroup: '개발',
      minorJobGroup: '서버/백엔드 개발자',
      memberImageUrl: 'fdsf',
    },
    {
      portFolioId: 28,
      portFolioUrl: 'https://example.com/portfolio/28',
      username: '리성원',
      introduction: '안녕하세요',
      majorJobGroup: '개발',
      minorJobGroup: '서버/백엔드 개발자',
      memberImageUrl: 'fdsf',
    },
    {
      portFolioId: 28,
      portFolioUrl: 'https://example.com/portfolio/28',
      username: '리성원',
      introduction: '안녕하세요',
      majorJobGroup: '개발',
      minorJobGroup: '서버/백엔드 개발자',
      memberImageUrl: 'fdsf',
    },
    {
      portFolioId: 28,
      portFolioUrl: 'https://example.com/portfolio/28',
      username: '리성원',
      introduction: '안녕하세요',
      majorJobGroup: '개발',
      minorJobGroup: '서버/백엔드 개발자',
      memberImageUrl: 'fdsf',
    },
  ];

  return (
    <div className={styles.container}>
      {portfolios.map(portfolio => (
        <PortfolioCard key={portfolio.portFolioId} {...portfolio} />
      ))}
    </div>
  );
};
