import React, { useCallback } from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import {
  UploadFile,
  UploadChangeParam,
  RcFile,
} from 'antd/lib/upload/interface';
import { usePaste } from '../utils/hooks/usePaste';
import { isPasteImage } from '../utils/image-helper';
import { message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const UploadInner = styled.div`
  .upload-drag-icon {
    margin-bottom: 20px;

    .anticon {
      color: #40a9ff;
      font-size: 48px;
    }
  }

  .upload-text {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
  }

  .upload-hint {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
`;

/**
 * 带剪切板检测的图片上传组件
 */
interface ImageUploaderProps {
  fileList: UploadFile[];
  onChange: (fileList: UploadFile[]) => void;
}
export const ImageUploader: React.FC<ImageUploaderProps> = React.memo(
  (props) => {
    const { fileList, onChange: setFileList } = props;

    usePaste((e) => {
      if (e.clipboardData && e.clipboardData.items) {
        const image = isPasteImage(e.clipboardData.items);
        if (image) {
          // 上传图片
          e.preventDefault();
          const rawFile = image.getAsFile()!;
          // const uploadEl = this.$refs.upload;
          const uploadFile: UploadFile = {
            uid: Date.now().toString(),
            size: rawFile.size,
            name: rawFile.name,
            type: rawFile.type,
            originFileObj: rawFile as RcFile,
            status: 'done',
          };

          setFileList([uploadFile]);
        }
      }
    });

    const handleChange = useCallback(
      async (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.fileList[0]) {
          setFileList([info.fileList[0]]); // 只显示一个
        } else {
          setFileList([]);
        }

        const { status } = info.file;

        if (status === 'done') {
          message.success(`${info.file.name} 文件上传成功.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
      []
    );

    return (
      <Dragger
        name="file"
        multiple={false}
        listType="picture"
        fileList={fileList}
        beforeUpload={(file) => {
          if (file.type !== 'image/png') {
            message.error(`${file.name} is not a png file`);
          }
          return file.type === 'image/png';
        }}
        onChange={handleChange}
      >
        <UploadInner>
          <p className="upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="upload-text">点击或拖拽文件到该区域</p>
          <p className="upload-hint">只支持上传图片格式</p>
        </UploadInner>
      </Dragger>
    );
  }
);
ImageUploader.displayName = 'ImageUploader';
