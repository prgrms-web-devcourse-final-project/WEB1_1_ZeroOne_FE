import { useNavigate } from 'react-router-dom';

import styles from './GatheringDetailBtnCon.module.scss';

import { useDeleteGathering, useCompleteGathering } from '@/features';
import { useUserStore } from '@/features/user/model/user.store';
import { Button } from '@/shared/ui';
import { customConfirm, customToast, errorAlert } from '@/shared/ui/SweetAlert/alerts';

interface GatheringDetailBtnConProps {
  gatheringId?: string;
  userId?: number;
}

export const GatheringDetailBtnCon = ({ gatheringId, userId }: GatheringDetailBtnConProps) => {
  const userData = useUserStore(state => state.userData);
  const currentUser = userData?.userId;
  const navigate = useNavigate();

  const { mutate: completeGathering } = useCompleteGathering({
    onSuccess: () => {
      void customToast({
        title: '모집완료',
        text: '게더링 모집이 완료되었습니다.',
        icon: 'success',
      });
    },
    onError: () => {
      void errorAlert({
        title: '모집완료 실패',
        text: '게더링 모집완료 처리에 실패했습니다.',
        icon: 'error',
      });
    },
  });
  const { mutate: deleteGathering, isPending } = useDeleteGathering({
    onSuccess: () => {
      void customToast({
        title: '게더링 삭제',
        text: '게더링이 삭제되었습니다.',
        icon: 'success',
      });
    },
    onError: () => {
      void errorAlert({
        title: '게더링 삭제 실패',
        text: '게더링을 삭제하는데 실패했습니다.',
        icon: 'error',
      });
    },
  });

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleEdit = () => {
    handleNavigate(`/gathering/edit/${gatheringId}`);
  };

  const handleDelete = async () => {
    const result = await customConfirm({
      title: '게더링 삭제',
      text: '게더링을 삭제하시겠습니까?',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    });

    if (result && gatheringId) {
      deleteGathering(gatheringId);
    }
  };

  const handleContact = () => {
    // 연락하기 로직
  };

  const handleComplete = async () => {
    const result = await customConfirm({
      title: '모집완료',
      text: '게더링 모집을 완료하시겠습니까?',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    });

    if (result && gatheringId) {
      completeGathering(gatheringId);
    }
  };

  return (
    <div className={styles.container}>
      {currentUser === userId && (
        <div className={styles.mine}>
          <Button onClick={handleComplete}>모집 완료</Button>
          <Button onClick={handleEdit}>수정하기</Button>
          <Button disabled={isPending} onClick={handleDelete}>
            {isPending ? '삭제 중...' : '삭제하기'}
          </Button>
        </div>
      )}

      <Button onClick={handleContact}>연락하기</Button>
    </div>
  );
};
