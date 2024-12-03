import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

import styles from './Breadcrumb.module.scss';

interface PathNameMapping {
  [key: string]: string;
}

const PATH_NAMES: PathNameMapping = {
  gathering: '게더링',
  projects: '프로젝트',
};

interface BreadcrumbItem {
  path: string;
  label: string;
}

// interface BreadcrumbProps {
//   gathering?: string;
//   archive?: string;
// }

export const Breadcrumb = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    return {
      path,
      label: PATH_NAMES[segment] || segment,
    };
  });

  if (!breadcrumbs.length) return null;

  return (
    <div className={styles.container}>
      <nav>
        <Link to='/'>
          <FontAwesomeIcon icon={faHome} />
        </Link>

        {breadcrumbs
          .map(breadcrumb => [
            <span key={`separator-${breadcrumb.path}`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>,
            <Link key={breadcrumb.path} to={breadcrumb.path}>
              {breadcrumb.label}
            </Link>,
          ])
          .flat()}
      </nav>
    </div>
  );
};

export default Breadcrumb;
