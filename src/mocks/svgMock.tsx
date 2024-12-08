import type { HTMLAttributes } from 'react';

const SvgMock = (props: HTMLAttributes<SVGSVGElement>) => {
  return (
    <svg {...props}>
      <title>Mock SVG</title>
    </svg>
  );
};

export default SvgMock;
