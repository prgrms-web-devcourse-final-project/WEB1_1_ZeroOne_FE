import * as yup from 'yup';

import { postImages } from '../../image/image.api';
import type {
  FormConfigType,
  FormValues,
  ImageField,
  PortfolioFormValues,
} from '../model/form.types';
import { JOB_CATEGORIES, JOB_DIVISION } from '../model/form.types';

export const formValidation = yup.object({
  name: yup.string().required('이름을 입력해주세요.'),
  briefIntro: yup
    .string()
    .required('자기소개를 입력해주세요.')
    .max(100, '100글자 이하로 소개 글을 작성해주세요.'),
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
          .required('URL을 입력해주세요.')
          .matches(
            /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
            'URL 형식에 맞게 입력해주세요.',
          ),
      }),
    )
    .test('unique-urls', 'URL이 중복되었습니다.', urls => {
      if (!urls) return true; // 비어있으면 유효
      const uniqueUrls = new Set(urls.map(item => item.value));
      return uniqueUrls.size === urls.length; // 중복 없으면 유효
    })
    .defined(),
  imageUrl: yup
    .object()
    .shape({
      url: yup.string().defined(),
      file: yup.mixed().nullable(),
    })
    .defined(), //.required('프로필 이미지를 등록해주세요.'),
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
    imageUrl: {
      url: '',
      file: null,
    },
  },
};

export const profileFormValidation = formValidation.shape({
  email: yup.string().defined(),
  portfolioLink: yup
    .string()
    .defined()
    .matches(
      /^\s*$|^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
      'URL 형식에 맞게 입력해주세요.',
    ),
});

export const profileFormConfig: FormConfigType<PortfolioFormValues> = {
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
          label: '이메일',
          type: 'default',
          name: 'email',
          disabled: true,
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
    ...formConfig.structure.slice(1, 2),
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
          name: 'portfolioLink',
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
    imageUrl: {
      url: '',
      file: null,
    },
    portfolioLink: '',
    email: 'csk9908@naver.com',
  },
};

export const handleImageUpload = async (imageUrl: ImageField) => {
  let profileImageUrl = imageUrl.url;

  //이미지 업로드 처리
  if (imageUrl.file) {
    try {
      const imageData = new FormData();
      imageData.append('files', imageUrl.file);
      const image = await postImages(imageData).then(res => res.data);
      if (image && image.imgUrls[0]) {
        profileImageUrl = image.imgUrls[0].imgUrl;
      }
    } catch {
      console.error('Failed to upload image');
    }

    return profileImageUrl;
  }
};
