// sweetalert.ts
import type { SweetAlertOptions } from 'sweetalert2';

type SwalIconType = 'warning' | 'error' | 'success' | 'info' | 'question';
type SwalPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'center-start'
  | 'center-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export type SwalAlertOptions = Omit<SweetAlertOptions, 'inputValidator'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputValidator?: (value: any) => Promise<string | null> | string | null;
};

export const SWAL_OPTIONS = {
  confirm: {
    icon: 'question' as SwalIconType,
    showCancelButton: true,
    confirmButtonColor: '#0b0b0b',
    cancelButtonColor: '#999a99',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    backdrop: `rgba(51, 53, 51, 0.5)`,
    padding: '2rem',
    customClass: {
      container: 'swal2-container',
      popup: 'swal2-popup custom-swal-font',
      title: 'swal2-title custom-swal-font',
      confirmButton: 'swal2-confirm custom-swal-font',
      cancelButton: 'swal2-cancel custom-swal-font',
    },
  },

  toast: {
    icon: 'success' as SwalIconType,
    toast: true,
    position: 'top-end' as SwalPosition,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: 'rgba(255, 255, 255, 0.95)',
    customClass: {
      popup: 'swal2-popup swal2-toast custom-swal-font',
      title: 'swal2-title custom-swal-font',
    },
  },

  error: {
    icon: 'error' as SwalIconType,
    confirmButtonColor: 'gray',
    confirmButtonText: '확인',
    backdrop: `rgba(51, 53, 51, 0.5)`,
    padding: '2rem',
    customClass: {
      container: 'swal2-container',
      popup: 'swal2-popup custom-swal-font',
      title: 'swal2-title custom-swal-font',
      confirmButton: 'swal2-confirm custom-swal-font',
    },
  },

  warning: {
    icon: 'warning' as SwalIconType,
    showCancelButton: true,
    confirmButtonColor: '#0b0b0b',
    cancelButtonColor: '#999a99',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    backdrop: `rgba(51, 53, 51, 0.5)`,
    padding: '2rem',
    customClass: {
      container: 'swal2-container',
      popup: 'swal2-popup custom-swal-font',
      title: 'swal2-title custom-swal-font',
      confirmButton: 'swal2-confirm custom-swal-font',
      cancelButton: 'swal2-cancel custom-swal-font',
    },
  },

  success: {
    icon: 'success' as SwalIconType,
    confirmButtonText: '확인',
    backdrop: `rgba(51, 53, 51, 0.5)`,
    padding: '2rem',
    customClass: {
      container: 'swal2-container',
      popup: 'swal2-popup custom-swal-font',
      title: 'swal2-title custom-swal-font',
      confirmButton: 'swal2-confirm custom-swal-font',
    },
  },

  prompt: {
    icon: 'question' as SwalIconType,
    input: 'textarea' as const,
    inputPlaceholder: '',
    showCancelButton: true,
    confirmButtonColor: '#0b0b0b',
    cancelButtonColor: '#999a99',
    confirmButtonText: '신고 하기',
    cancelButtonText: '취소',
    backdrop: `rgba(51, 53, 51, 0.5)`,
    padding: '2rem',
    customClass: {
      container: 'swal2-container',
      popup: 'swal2-popup custom-swal-font',
      title: 'swal2-title custom-swal-font',
      confirmButton: 'swal2-confirm custom-swal-font',
      cancelButton: 'swal2-cancel custom-swal-font',
      input: 'swal2-input custom-swal-font',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputValidator: (value: any) => {
      if (!value?.trim()) {
        return '내용을 입력해주세요';
      }
      return null;
    },
  },
} as const;
