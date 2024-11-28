import type { SweetAlertResult } from 'sweetalert2';
import Swal from 'sweetalert2';

import type { SwalAlertOptions } from './config';
import { SWAL_OPTIONS } from './config';

// 기본 확인 다이얼로그
export const customConfirm = (options: SwalAlertOptions = {}) => {
  return Swal.fire({
    ...SWAL_OPTIONS.confirm,
    ...options,
  });
};

// 토스트 메시지
export const customToast = (options: SwalAlertOptions = {}) => {
  return Swal.fire({
    ...SWAL_OPTIONS.toast,
    ...options,
  });
};

// 에러 알림
export const errorAlert = (options: SwalAlertOptions = {}) => {
  return Swal.fire({
    ...SWAL_OPTIONS.error,
    ...options,
  });
};

// 삭제 확인
export const deleteConfirm = (message = '삭제하시겠습니까?') => {
  return Swal.fire({
    ...SWAL_OPTIONS.warning,
    title: message,
    text: '이 작업은 되돌릴 수 없습니다!',
  });
};

// 성공 알림
export const successAlert = (options: SwalAlertOptions = {}) => {
  return Swal.fire({
    ...SWAL_OPTIONS.success,
    ...options,
  });
};

type PromptResult = SweetAlertResult<string>;

// 프롬프트
export const customPrompt = (options: SwalAlertOptions = {}): Promise<PromptResult> => {
  return Swal.fire<string>({
    ...SWAL_OPTIONS.prompt,
    ...options,
  });
};
