import type React from 'react';

export interface ButtonProps {
  /**
   * 버튼 내용
   */
  children: React.ReactNode;
  /**
   * 버튼 변형
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * 버튼 크기
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 클릭 핸들러
   */
  onClick?: () => void;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'rounded font-medium transition-colors';

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ');

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
