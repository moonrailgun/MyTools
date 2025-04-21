/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 启用 WebAssembly 支持
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // 为 WebAssembly 文件配置规则
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    // 确保 WebAssembly 文件被正确处理
    if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm';
    } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
    }

    return config;
  },
};

module.exports = nextConfig;
