import React, { useState, useCallback } from 'react';
import BaseLayout from '../../components/Layout';
import { Row, Col, Button, Divider, Typography, notification } from 'antd';
import { getFileBase64 } from '../../utils/image-helper';
import { UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';
import { ImageUploader } from '../../components/ImageUploader';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';

const VehiclePage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [vehicleColor, setVehicleColor] = useState('');
  const [resultList, setResultList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (fileList.length !== 1) {
      return;
    }

    try {
      setLoading(true);
      const file = fileList[0].originFileObj!;
      if (file.size > 1000 * 1000 * 1) {
        // 大于1MB
        notification.error({
          message:
            '文件过大, 请压缩后再进行识别, 当前:' +
            (file.size / 1024 / 1024).toFixed(2) +
            'MB',
        });
        return;
      }
      const base64 = await getFileBase64(file);

      const { data } = await axios.post('/api/ai/vehicle', {
        imageBase64: base64,
      });

      const { color_result, location_result, result } = data.result;
      console.log('location_result', location_result);

      setVehicleColor(color_result);
      setResultList(
        result.map(
          (item: any) =>
            `${item.name}(${item.year}) - ${Math.round(item.score * 100)}%`
        )
      );
    } catch (err: any) {
      notification.error({ message: String(err) });
    } finally {
      setLoading(false);
    }
  }, [fileList]);

  return (
    <BaseLayout title="车辆识别" link="/tools/vehicle">
      <Row gutter={8}>
        <Col sm={12}>
          <ImageUploader fileList={fileList} onChange={setFileList} />

          {fileList.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Row>
                <Button type="primary" loading={loading} onClick={handleSubmit}>
                  车辆识别
                </Button>
              </Row>
            </div>
          )}
        </Col>

        <Col sm={12}>
          <Typography.Paragraph>识图结果:</Typography.Paragraph>
          <Typography.Paragraph>
            {vehicleColor && `颜色: ${vehicleColor}`}
          </Typography.Paragraph>
          <Divider />
          <div>
            {resultList.map((item, i) => (
              <Typography.Paragraph key={i}>
                {String(item)}
              </Typography.Paragraph>
            ))}
          </div>
        </Col>
      </Row>
    </BaseLayout>
  );
};
VehiclePage.displayName = 'VehiclePage';

export default VehiclePage;
