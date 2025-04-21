import React, { useState, useEffect } from 'react';
import {
  Input,
  Card,
  Select,
  Typography,
  Row,
  Col,
  Statistic,
  Alert,
  Button,
  Spin,
} from 'antd';
import { TiktokenModel } from 'tiktoken';
import { ClearOutlined } from '@ant-design/icons';
import { getTokenCount } from '../../utils/tiktoken-utils';
import BaseLayout from '../../components/Layout';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const TokenizerTool: React.FC = () => {
  const [text, setText] = useState('');
  const [model, setModel] = useState<TiktokenModel>('gpt-4o');
  const [tokenCount, setTokenCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 可用的模型
  const models: TiktokenModel[] = [
    'gpt-4o',
    'gpt-4',
    'gpt-4o-mini',
    'o1',
    'gpt-3.5-turbo',
    'text-embedding-ada-002',
    'text-davinci-003',
    'gpt-4-turbo-preview',
  ];

  useEffect(() => {
    // 计算字符数
    setCharCount(text.length);

    // 使用tiktoken计算token数
    const updateTokenCount = async () => {
      if (!text) {
        setTokenCount(0);
        return;
      }

      setLoading(true);
      try {
        const count = await getTokenCount(text, model);
        setTokenCount(count);
      } catch (error) {
        console.error('Error encoding text:', error);
        setTokenCount(0);
      } finally {
        setLoading(false);
      }
    };

    // 使用防抖，避免频繁更新
    const timeoutId = setTimeout(() => {
      updateTokenCount();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [text, model]);

  const handleClearText = () => {
    setText('');
  };

  return (
    <BaseLayout title="Token计数" link="/tools/tokenizer">
      <Card title={<Title level={3}>文本分词统计工具</Title>} bordered={false}>
        <Paragraph>计算文本的字符数和Token数</Paragraph>

        <Alert
          message="什么是Token？"
          description={
            <div>
              <p>Token是GPT等大语言模型处理文本的基本单位。它不同于字符：</p>
              <ul>
                <li>短单词通常是一个token</li>
                <li>长单词可能会被分成多个token</li>
                <li>标点符号通常是单独的token</li>
                <li>中文和其他非英语语言的token化更为复杂</li>
              </ul>
              <p>
                每个模型有自己的分词方式，这会影响token的计数结果。OpenAI的API按token计费，所以了解文本的token数量有助于估算API调用成本。
              </p>
            </div>
          }
          type="info"
          style={{ marginBottom: '16px' }}
        />

        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="model"
            style={{ display: 'block', marginBottom: '8px' }}
          >
            选择模型:
          </label>
          <Select
            id="model"
            style={{ width: '100%' }}
            value={model}
            onChange={(value: TiktokenModel) => setModel(value)}
          >
            {models.map((m) => (
              <Option key={m} value={m}>
                {m}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <label
              htmlFor="text"
              style={{ display: 'block', marginBottom: '8px' }}
            >
              输入文本:
            </label>
            <Button
              icon={<ClearOutlined />}
              onClick={handleClearText}
              size="small"
            >
              清空
            </Button>
          </div>
          <TextArea
            id="text"
            placeholder="在此处输入要分析的文本..."
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic title="字符数" value={charCount} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Spin spinning={loading}>
                <Statistic title="Token数" value={tokenCount} />
              </Spin>
            </Card>
          </Col>
        </Row>
      </Card>
    </BaseLayout>
  );
};

export default TokenizerTool;
