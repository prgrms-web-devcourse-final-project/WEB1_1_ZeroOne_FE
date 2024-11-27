import { useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Color } from '@/features';
import { WriteArchiveContainer, ColorChoiceStep, WriteStep } from '@/widgets';

type StepState = 'selectColor' | 'writeForm' | 'editForm';

type StepAction = { type: 'SELECT_COLOR' } | { type: 'WRITE_FORM' } | { type: 'EDIT_FORM' };

const stepReducer = (state: StepState, action: StepAction): StepState => {
  switch (action.type) {
    case 'SELECT_COLOR':
      return 'writeForm';
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

  const [currentStep, dispatch] = useReducer(stepReducer, isEdit ? 'editForm' : 'selectColor');
  const [color, setColor] = useState<Color | null>(null);

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
