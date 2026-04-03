import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

interface MonitorData {
  time: string;
  cpu: number;
  memory: number;
  network: number;
  activeUsers: number;
}

const RealTimeMonitor: React.FC = () => {
  const [data, setData] = useState<MonitorData[]>([]);

  useEffect(() => {
    // 模拟实时数据
    const generateData = () => {
      const now = new Date();
      const newData: MonitorData[] = [];
      
      for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        newData.push({
          time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
          cpu: 20 + Math.random() * 40,
          memory: 40 + Math.random() * 30,
          network: 10 + Math.random() * 50,
          activeUsers: 30 + Math.floor(Math.random() * 20),
        });
      }
      
      setData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 10000);
    return () => clearInterval(interval);
  }, []);

  const config = {
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
    color: ['#1976D2', '#4CAF50', '#FF9800', '#9C27B0'],
  };

  const transformedData = data.flatMap(item => [
    { time: item.time, value: item.cpu, category: 'CPU使用率 (%)' },
    { time: item.time, value: item.memory, category: '内存使用率 (%)' },
    { time: item.time, value: item.network, category: '网络流量 (Mbps)' },
    { time: item.time, value: item.activeUsers, category: '活跃用户 (人)' },
  ]);

  return (
    <div>
      <Line {...config} data={transformedData} />
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600">当前CPU</div>
          <div className="text-xl font-bold text-blue-600">
            {data.length > 0 ? `${data[data.length - 1].cpu.toFixed(1)}%` : '--'}
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded">
          <div className="text-sm text-gray-600">当前内存</div>
          <div className="text-xl font-bold text-green-600">
            {data.length > 0 ? `${data[data.length - 1].memory.toFixed(1)}%` : '--'}
          </div>
        </div>
        <div className="bg-orange-50 p-3 rounded">
          <div className="text-sm text-gray-600">网络流量</div>
          <div className="text-xl font-bold text-orange-600">
            {data.length > 0 ? `${data[data.length - 1].network.toFixed(1)} Mbps` : '--'}
          </div>
        </div>
        <div className="bg-purple-50 p-3 rounded">
          <div className="text-sm text-gray-600">活跃用户</div>
          <div className="text-xl font-bold text-purple-600">
            {data.length > 0 ? data[data.length - 1].activeUsers : '--'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;
