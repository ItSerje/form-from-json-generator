import { Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { FileHeader } from './FileHeader';

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

export const SingleFileUploadWithProgress = ({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadWithProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>('');

  useEffect(() => {
    async function upload() {
      let url;
      await getFileDataURL(file, setFileDataURL, setProgress);
      url = fileDataURL;

      onUpload(file, url as string);
    }

    upload();
  }, [fileDataURL]);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant='determinate' value={progress} />
    </Grid>
  );
};

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
  const key = 'docs_upload_example_us_preset';

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);

    xhr.send(formData);
  });
}

async function getFileDataURL(
  file: File,
  setFileDataURL: (dataUrl: string | ArrayBuffer) => void,
  onProgress: (percentage: number) => void
) {
  let fileReader: FileReader,
    isCancel = false;
  if (file) {
    fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        const { result } = e.target;
        if (!isCancel) {
          setFileDataURL(result);
        }
      }
    };
    fileReader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentage = (e.loaded / e.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    console.log('файл', file);
    fileReader.readAsDataURL(file);
  }
}
