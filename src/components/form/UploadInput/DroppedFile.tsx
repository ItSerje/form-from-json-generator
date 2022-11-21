import { Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { FileHeader } from './FileHeader';
import { getFileDataUrlWithProgress } from '../../../utils/formUtils/getFileDataURL';

type DroppedFileProps = {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
};

const DroppedFile = ({ file, onDelete, onUpload }: DroppedFileProps) => {
  const [progress, setProgress] = useState(0);
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>('');

  useEffect(() => {
    const load = async () => {
      let url;
      await getFileDataUrlWithProgress(file, setFileDataURL, setProgress);
      url = fileDataURL;

      onUpload(file, url as string);
    };

    load();
  }, [fileDataURL]);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant='determinate' value={progress} />
    </Grid>
  );
};

export { DroppedFile };
