import type { PropsWithChildren } from 'react';
import { useShallow } from 'zustand/shallow';

import { useModalStore } from '@/shared/model/modalStore';
import { LoginModal } from '@/widgets/LoginModal/ui/LoginModal';

const MODAL_COMPONENTS = {
  login: LoginModal,
};

const ModalProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, modalKey, close } = useModalStore(
    useShallow(state => ({
      modalKey: state.modalKey,
      isOpen: state.isOpen,
      close: state.actions.close,
    })),
  );

  const ModalComponent = modalKey ? MODAL_COMPONENTS[modalKey] : null;

  return (
    <>
      {children}
      {isOpen && ModalComponent && <ModalComponent isOpen={isOpen} onClose={close} />}
    </>
  );
};

export default ModalProvider;
