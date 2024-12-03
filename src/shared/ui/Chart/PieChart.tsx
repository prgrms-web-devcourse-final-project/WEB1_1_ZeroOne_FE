import { ResponsivePie } from '@nivo/pie';
import { useState, useEffect } from 'react';

import styles from './PieChart.module.scss';

interface dataType {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: dataType[];
}

export const PieChart = ({ data /* see data tab */ }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <ResponsivePie
        activeOuterRadiusOffset={8}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2.5]],
        }}
        arcLinkLabelsColor={{ from: 'color' }}
        colors={({ data }) => data.color}
        cornerRadius={3}
        data={data}
        enableArcLinkLabels={false}
        innerRadius={0.5}
        legends={
          !isMobile
            ? [
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#333533',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                },
              ]
            : []
        }
        margin={
          isMobile
            ? { top: 20, right: 40, bottom: 20, left: 40 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        padAngle={0.7}
        theme={{
          tooltip: {
            container: {
              color: '#333533',
            },
          },
        }}
      />
    </div>
  );
};
