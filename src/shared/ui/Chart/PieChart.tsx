import { ResponsivePie } from '@nivo/pie';

interface dataType {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: dataType[];
}

export const PieChart = ({ data /* see data tab */ }: Props) => (
  <div style={{ width: '100%', height: '400px' }}>
    <ResponsivePie
      activeOuterRadiusOffset={8}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2.5]],
      }}
      arcLinkLabelsColor={{ from: 'color' }}
      colors={({ data }) => data.color as string}
      cornerRadius={3}
      data={data}
      enableArcLinkLabels={false}
      innerRadius={0.5}
      legends={[
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
      ]}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
