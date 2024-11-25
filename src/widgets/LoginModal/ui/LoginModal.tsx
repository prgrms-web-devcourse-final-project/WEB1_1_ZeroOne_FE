import styles from './LoginModal.module.scss';

import { GoogleLogin } from '@/features/auth';
import Logo from '@/shared/assets/paletteLogo.svg?react';
import { Modal } from '@/shared/ui';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal classNames={styles.modalDialogLayout} isOpen={isOpen} onClose={onClose}>
      <div className={styles.dialogWrapper}>
        <div className={styles.dialogHeader}>
          <Logo height={130} width={112} />
          <span>PALETTE</span>
        </div>
        <div className={styles.dialogContent}>
          <h2>나만의 색 보여주기</h2>
          <p>
            팔레트에서 여러분의 커리어를 공유하고 <br />
            자신만의 특색을 보여주세요
          </p>
          <GoogleLogin />
        </div>
        <div className={styles.dialogFooter}>
          <p>
            로그인은 <a>개인 정보 보호 정책</a> 및 <a>서비스 약관</a>에 동의하는 것을 의미하며,
            <br /> 서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};
