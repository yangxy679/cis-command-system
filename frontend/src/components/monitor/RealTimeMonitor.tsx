import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

interface MonitorData {
  time: string;
  cpu: number;
  memory: number;
  network: number;
  activeUsers: number;
}

interface RealTimeMonitorProps {
  performanceMetrics?: Array<{
    time: string;
    cpu: number;
    memory: number;
    network: number;
    activeUsers: number;
  }>;
}

const RealTimeMonitor: React.FC<RealTimeMonitorProps> = ({ performanceMetrics }) => {
  const [data, setData] = useState<MonitorData[]>([]);

  useEffect(() => {
    if (performanceMetrics && performanceMetrics.length > 0) {
      // 使用传入的性能指标数据
      setData(performanceMetrics.map(metric => ({
        time: metric.time,
        cpu: metric.cpu,
        memory: metric.memory,
        network: metric.network,
        activeUsers: metric.activeUsers,
      })));
    } else {
      // 如果没有传入数据，使用模拟数据
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
    }
  }, [performanceMetrics]);

  const config = {
    data: data.flatMap(item => [
      { time: item.time, value: item.cpu, category: 'CPU使用率 (%)' },
      { time: item.time, value: item.memory, category: '内存使用率 (%)' },
      { time: item.time, value: item.network, category: '网络流量 (Mbps)' },
      { time: item.time, value: item.activeUsers, category: '活跃用户 (人)' },
    ]),
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
    legend: {
      position: 'top',
    },
    tooltip: {
      showMarkers: true,
      formatter: (datum: any) => {
        return { name: datum.category, value: `${datum.value.toFixed(1)}` };
      },
    },
    interactions: [
      {
        type: 'brush',
      },
    ],
  };

  const currentData = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div>
      <Line {...config} />
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-sm text-gray-600">当前CPU使用率</div>
          <div className="text-xl font-bold text-blue-600">
            {currentData ? `${currentData.cpu.toFixed(1)}%` : '--'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {currentData && currentData.cpu > 70 ? '⚠️ 使用率较高' : '✅ 使用率正常'}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="text-sm text-gray-600">当前内存使用率</div>
          <div className="text-xl font-bold text-green-600">
            {currentData ? `${currentData.memory.toFixed(1)}%` : '--'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {currentData && currentData.memory > 80 ? '⚠️ 使用率较高' : '✅ 使用率正常'}
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <div className="text-sm text-gray-600">当前网络流量</div>
          <div className="text-xl font-bold text-orange-600">
            {currentData ? `${currentData.network.toFixed(1)} Mbps` : '--'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {currentData && currentData.network > 40 ? '⚠️ 流量较高' : '✅ 流量正常'}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="text-sm text-gray-600">当前活跃用户</div>
          <div className="text-xl font-bold text-purple-600">
            {currentData ? `${currentData.activeUsers} 人` : '--'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            在线指挥人员
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        数据更新时间: {new Date().toLocaleTimeString('zh-CN')} | 
        数据源: {performanceMetrics ? '后端API' : '前端模拟'}
      </div>
    </div>
  );
};

export default RealTimeMonitor;
