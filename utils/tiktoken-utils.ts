import { encoding_for_model, TiktokenModel } from 'tiktoken';

/**
 * 异步加载 tiktoken 编码器
 * 这有助于处理 WebAssembly 加载问题
 */
export async function getTokenCount(
  text: string,
  model: TiktokenModel
): Promise<number> {
  try {
    // 使用 dynamic import 来确保 WebAssembly 正确加载
    const encoder = encoding_for_model(model);
    const tokens = encoder.encode(text);
    const count = tokens.length;

    // 释放编码器以防内存泄漏
    encoder.free();

    return count;
  } catch (error) {
    console.error('Failed to count tokens:', error);
    return 0;
  }
}

/**
 * 检查 tiktoken 是否可用
 */
export async function isTiktokenAvailable(): Promise<boolean> {
  try {
    const encoder = encoding_for_model('gpt-3.5-turbo');
    encoder.free();
    return true;
  } catch (error) {
    console.error('Tiktoken is not available:', error);
    return false;
  }
}
