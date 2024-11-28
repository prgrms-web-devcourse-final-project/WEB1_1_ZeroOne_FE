import { useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useArchiveStore } from '@/features';
import { WriteArchiveContainer, ColorChoiceStep, WriteStep } from '@/widgets';

type StepState = 'selectColor' | 'writeForm' | 'editForm';

type StepAction = { type: 'SELECT_COLOR' } | { type: 'WRITE_FORM' } | { type: 'EDIT_FORM' };

const stepReducer = (state: StepState, action: StepAction, isEdit: boolean): StepState => {
  switch (action.type) {
    case 'SELECT_COLOR':
      return isEdit ? 'editForm' : 'writeForm';
    case 'WRITE_FORM':
      return 'selectColor';
    case 'EDIT_FORM':
      return 'selectColor';
    default:
      return state;
  }
};

export const WriteArchivePage = () => {
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const { color, setColor } = useArchiveStore();

  const [currentStep, dispatch] = useReducer(
    (state: StepState, action: StepAction) => stepReducer(state, action, isEdit),
    isEdit ? 'editForm' : 'selectColor',
  );

  const getGuideAndChildren = () => {
    if (currentStep === 'selectColor') {
      return {
        guide: '어떤 색상의 아카이브를 작성할지 골라주세요',
        children: (
          <ColorChoiceStep
            onClick={() => {
              dispatch({ type: 'SELECT_COLOR' });
            }}
            onSelectColor={setColor}
            selectedColor={color}
          />
        ),
      };
    }
    if (currentStep === 'writeForm') {
      return {
        guide: '스토리를 작성해주세요',
        children: (
          <WriteStep
            onClick={() => {
              dispatch({ type: 'WRITE_FORM' });
            }}
            selectedColor={color || 'red'}
          />
        ),
      };
    }
    if (currentStep === 'editForm') {
      return {
        guide: '스토리를 수정해주세요',
        children: (
          <WriteStep
            isEdit
            onClick={() => {
              dispatch({ type: 'EDIT_FORM' });
            }}
            selectedColor={color || 'red'}
          />
        ),
      };
    }
    return { guide: '', children: null };
  };

  const { guide, children } = getGuideAndChildren();

  return <WriteArchiveContainer children={children} guide={guide} />;
};
