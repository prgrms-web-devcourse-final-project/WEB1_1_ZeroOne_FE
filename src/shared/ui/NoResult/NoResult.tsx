import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NoResult = () => (
  <span style={{ color: '#333533', fontSize: '1.125rem' }}>
    앗, 찾으시는 결과가 없어요!{' '}
    <FontAwesomeIcon bounce icon={faFaceSadTear} style={{ color: '#3b3b3b' }} />
  </span>
);
