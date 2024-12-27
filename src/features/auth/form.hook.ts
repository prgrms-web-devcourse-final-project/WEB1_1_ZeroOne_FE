import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { FormConfigType } from './form.types';
import { JOB_CATEGORIES, type FormValues } from './form.types';

interface useProfileFormProps<T extends FormValues> {
  formConfig: FormConfigType<T>;
}

export const useProfileForm = <T extends FormValues>({ formConfig }: useProfileFormProps<T>) => {
  const [formStructure, setFormStructure] = useState([...formConfig.structure]);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const method = useForm({
    resolver: yupResolver(formConfig.validation),
    mode: 'onChange',
    defaultValues: formConfig.defaultValues,
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

    if (isResetting) {
      setIsResetting(false);
      return;
    }

    method.setValue('minorJobGroup', null, {
      shouldValidate: true,
    });
  }, [majorJobGroup, method]);

  const handleReset = (data: Partial<T>) => {
    setIsResetting(true);
    method.reset(data);
  };

  return {
    formStructure,
    method,
    handleReset,
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

    if (
      !value.match(
        /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
      )
    ) {
      setError('URL 형식이 잘못됬습니다.');
      return false;
    }

    setError('');
    return true;
  };
  return { portfolioUrl, error, handleInputChange, validate };
};
