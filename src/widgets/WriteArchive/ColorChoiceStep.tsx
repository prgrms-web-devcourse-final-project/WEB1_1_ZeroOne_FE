import { ColorChips } from './ColorChips';

import { Button } from '@/shared/ui';

export const ColorChoiceStep = ({
  onClick,
  selectedColor,
  onSelectColor,
}: {
  onClick: () => void;
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
}) => {
  return (
    <>
      <ColorChips onSelectColor={onSelectColor} selectedColor={selectedColor} />
      <Button onClick={onClick}>선택 완료</Button>
    </>
  );
};
