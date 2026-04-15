const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 启动CIS系统简化后端...');

// 检查必要的文件
const requiredFiles = [
  'src/main.ts',
  'src/app.module.ts',
  'package.json',
  'tsconfig.json'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(__dirname, file))) {
    console.error(`❌ 缺少必要文件: ${file}`);
    process.exit(1);
  }
}

console.log('✅ 所有必要文件存在');

// 启动开发服务器
const command = 'npx nest start --watch';
console.log(`📝 执行命令: ${command}`);

const child = exec(command, { cwd: __dirname });

child.stdout.on('data', (data) => {
  console.log(data.toString());
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});

// 处理退出信号
process.on('SIGINT', () => {
  console.log('\n🛑 收到中断信号，正在关闭...');
  child.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 收到终止信号，正在关闭...');
  child.kill('SIGTERM');
  process.exit(0);
});
