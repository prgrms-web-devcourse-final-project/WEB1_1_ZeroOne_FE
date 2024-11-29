import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { FormConfigType } from './form.types';
import { JOB_CATEGORIES, type FormValues } from './form.types';

interface useProfileFormProps {
  formConfig: FormConfigType<FormValues>;
}

export const useProfileForm = ({ formConfig }: useProfileFormProps) => {
  const [formStructure, setFormStructure] = useState([...formConfig.structure]);
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
      url: [],
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

  return {
    formStructure,
    method,
  };
};

export const usePortfolioInput = () => {
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioUrl(e.target.value);
    validate(e.target.value);
  };

  const validate = (value: string) => {
    if (value.trim() === '') {
      setError('포트폴리오 URL을 입력해주세요.');
      return false;
    }

    if (!(value.startsWith('https://') || value.startsWith('http://'))) {
      setError('URL 형식이 잘못됬습니다.');
      return false;
    }

    setError('');
    return true;
  };
  return { portfolioUrl, error, handleInputChange, validate };
};
