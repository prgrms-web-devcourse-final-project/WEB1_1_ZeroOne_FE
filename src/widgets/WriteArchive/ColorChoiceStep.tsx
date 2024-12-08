import { ColorChips } from './ColorChips';

import type { Color } from '@/features';
import { Button } from '@/shared/ui';

export const ColorChoiceStep = ({
  onClick,
  selectedColor,
  onSelectColor,
}: {
  onClick: () => void;
  selectedColor: Color;
  onSelectColor: (color: Color) => void;
}) => {
  return (
    <>
      <ColorChips onSelectColor={onSelectColor} selectedColor={selectedColor} />
      <Button onClick={onClick}>선택 완료</Button>
    </>
  );
};
