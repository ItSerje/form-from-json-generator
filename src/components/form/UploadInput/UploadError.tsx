import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { FileHeader } from './FileHeader';
import { FileError } from 'react-dropzone';
import { Grid } from '@mui/material';

export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}

const ErrorLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.error.main,
  },
}));

export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <ErrorLinearProgress variant='determinate' value={100} />
      {errors.map((error) => (
        <div key={error.code}>
          <div className='dropzone__message dropzone__message--error'>
            {error.message}
          </div>
        </div>
      ))}
    </Grid>
  );
}
