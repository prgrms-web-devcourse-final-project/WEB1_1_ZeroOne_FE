import * as yup from 'yup';

import type { FormConfigType, FormValues, PortfolioFormValues } from './form.types';
import { JOB_CATEGORIES, JOB_DIVISION } from './form.types';

export const formValidation = yup.object({
  name: yup.string().required('이름을 입력해주세요.'),
  briefIntro: yup.string().defined().max(100, '100글자 이하로 소개 글을 작성해주세요.'),
  majorJobGroup: yup
    .object()
    .shape({
      value: yup.string().defined(),
      label: yup.string().defined(),
    })
    .required('직군을 선택해주세요.'),
  minorJobGroup: yup
    .object()
    .shape({
      value: yup.string().defined(),
      label: yup.string().defined(),
    })
    .defined()
    .required('직무를 선택해주세요.'),
  jobTitle: yup.string().defined(),
  division: yup.string().default('student'),
  url: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .defined()
          .required('URL을 입력해주세요.')
          .url('URL 형식에 맞게 입력해주세요.'),
      }),
    )
    .max(5, 'URL은 최대 5개 까지 작성 가능합니다.')
    .defined(),
  imageUrl: yup.string().defined(), //.required('프로필 이미지를 등록해주세요.'),
});

export const formConfig: FormConfigType<FormValues> = {
  structure: [
    {
      title: '기본 정보',
      inputs: [
        {
          label: '프로필 사진',
          type: 'image',
          name: 'imageUrl',
        },
        {
          label: '이름',
          type: 'default',
          name: 'name',
          required: true,
          placeholder: '이름을 입력해주세요.',
        },
        {
          label: '한 줄 소개',
          type: 'textarea',
          name: 'briefIntro',
          maxLength: 100,
          placeholder: '한 줄 소개를 입력해주세요.',
        },
      ],
    },
    {
      title: '커리어 정보',
      inputs: [
        {
          label: '분야',
          type: 'select',
          name: 'majorJobGroup',
          options: JOB_CATEGORIES.map(category => ({
            value: category.value,
            label: category.label,
          })),
          placeholder: '분야를 골라주세요.',
        },
        {
          label: '직무',
          type: 'select',
          name: 'minorJobGroup',
          placeholder: '분야를 먼저 선택해 주세요.',
        },
        {
          label: '소속',
          type: 'radio',
          name: 'division',
          options: JOB_DIVISION,
        },
        {
          label: '소속명',
          type: 'default',
          name: 'jobTitle',
          placeholder: '소속명을 입력해주세요.',
        },
      ],
    },
    {
      title: 'URL',
      inputs: [
        {
          label: 'URL',
          name: 'url',
          placeholder: 'https://',
        },
      ],
    },
  ],
  validation: formValidation,
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
};

export const profileFormValidation = formValidation.shape({
  portfolioUrl: yup.string().defined().url('URL 형식이 아닙니다.'),
});

export const profileFormConfig: FormConfigType<PortfolioFormValues> = {
  structure: [
    ...formConfig.structure.slice(0, 2),
    {
      title: 'URL',
      inputs: [
        {
          label: 'URL',
          name: 'url',
          placeholder: 'https://',
        },
        {
          label: '포트폴리오 URL',
          type: 'default',
          name: 'portfolioUrl',
          placeholder: 'https://',
        },
      ],
    },
  ],
  validation: profileFormValidation,
  defaultValues: {
    name: '',
    briefIntro: '',
    majorJobGroup: null,
    minorJobGroup: null,
    jobTitle: '',
    division: 'student',
    url: [],
    imageUrl: '',
    portfolioUrl: '',
  },
};
