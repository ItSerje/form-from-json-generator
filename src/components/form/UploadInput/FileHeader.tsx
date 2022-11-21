import { Grid } from '@mui/material';
import { FaTrash } from 'react-icons/fa';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>{file.name}</Grid>
      <div>
        <button onClick={() => onDelete(file)} className='btn btn--upload'>
          <span>
            <FaTrash />
          </span>
        </button>
      </div>
    </Grid>
  );
}
