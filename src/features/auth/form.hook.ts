import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { FormConfigType } from './form.types';
import { JOB_CATEGORIES, type FormValues } from './form.types';

interface useProfileFormProps {
  formConfig: FormConfigType;
}

export const useProfileForm = ({ formConfig }: useProfileFormProps) => {
  const [formStructure, setFormStructure] = useState(formConfig.structure);
  const method = useForm<FormValues>({
    resolver: yupResolver(formConfig.validation),
    mode: 'onChange',
    defaultValues: {
      name: '',
      briefIntro: '',
      majorJobGroup: null,
      minorJobGroup: null,
      jobTitle: '',
      division: 'student',
      url: [{ value: '' }],
      imageUrl: '',
    },
  });
  const majorJobGroup = method.watch('majorJobGroup');

  /**
   * 직군 선택 시 직무 불러오기
   * majorJobGroup = Option ({value, label}), 직군
   * formConfig의 minorJobGroup input option에 직무 그룹
   */
  useEffect(() => {
    if (!majorJobGroup) return;

    setFormStructure(prev => {
      const updatedStructure = [...prev];

      for (let i = 0; i < updatedStructure.length; i++) {
        let findIdx;
        const { inputs } = updatedStructure[i];
        if ((findIdx = inputs.findIndex(input => input.name === 'minorJobGroup')) !== -1) {
          const minorJobGroup = [...JOB_CATEGORIES].find(
            category => category.value === majorJobGroup.value,
          )?.children;
          inputs[findIdx].options = minorJobGroup;
          inputs[findIdx].placeholder = '직무를 선택해 주세요.';
          break;
        }
      }

      return updatedStructure;
    });

    method.setValue('minorJobGroup', null, { shouldValidate: true });
  }, [majorJobGroup, method]);

  const onSubmit = (data: FormValues) => {
    console.log('폼 데이터:', data);
  };

  return {
    formStructure,
    method,
    onSubmit,
  };
};
