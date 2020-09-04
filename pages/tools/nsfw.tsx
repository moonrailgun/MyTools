import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as nsfwjs from 'nsfwjs';
import BaseLayout from '../../components/Layout';
import { Row, Col, Progress, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { ImageUploader } from '../../components/ImageUploader';
import { getFileBase64 } from '../../utils/image-helper';
tf.enableProdMode();

const modelPath = '/nsfw/quant_nsfw_mobilenet/';

interface NSFWPredictions {
  className: string;
  probability: number;
}

let model: nsfwjs.NSFWJS | null = null;

const NSFWPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [predictions, setPredictions] = useState<NSFWPredictions[] | null>(
    null
  );
  const [image, setImage] = useState('https://i.imgur.com/Kwxetau.jpg');

  useEffect(() => {
    (async () => {
      // Load the model.
      if (model === null) {
        model = await nsfwjs.load(modelPath);
      }

      // Classify the image.
      const img = new Image();
      img.src = image;
      img.onload = () => {
        model!.classify(img).then((p) => {
          setPredictions(p);
        });
      };
    })();
  }, [image]);

  const handleChange = useCallback(async (list: UploadFile<any>[]) => {
    setFileList(list);

    const [file] = list;
    if (file && file.originFileObj) {
      const base64 = await getFileBase64(file.originFileObj, true);
      setImage(base64);
    } else {
      message.error('无法正确获取图片信息');
    }
  }, []);

  return (
    <BaseLayout title="NSFW" link="/tools/nsfw">
      <Row>
        <Col sm={12}>
          <ImageUploader fileList={fileList} onChange={handleChange} />
        </Col>
      </Row>
      <Row>
        <Col sm={16}>
          <div>
            <img
              src={image}
              crossOrigin="anonymous"
              style={{
                maxWidth: '100%',
                maxHeight: 400,
              }}
            />
          </div>
          {predictions ? (
            predictions.map((p) => (
              <div key={p.className}>
                <span>{p.className}:</span>
                <span>
                  <Progress
                    percent={Number((p.probability * 100).toFixed(2))}
                  />
                </span>
              </div>
            ))
          ) : (
            <div>正在处理中...</div>
          )}
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default NSFWPage;
