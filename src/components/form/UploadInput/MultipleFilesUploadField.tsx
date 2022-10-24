import { Grid } from '@mui/material';
import styles from '../form.module.scss';
import { useField } from 'formik';
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';

let currentId = 0;

function getNewId() {
  return ++currentId;
}

export interface UploadableFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

export function MultipleFilesUploadField({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const [_, __, helpers] = useField(name);

  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [], 'text/*': ['.pdf'] },
    maxSize: 300 * 1024, // 300KB
  });

  return (
    <React.Fragment>
      <Grid item>
        <label htmlFor={name}>{label}</label>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>

      {files.map((fileWrapper) => (
        <Grid item key={fileWrapper.id}>
          {fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
            />
          ) : (
            <SingleFileUploadWithProgress
              file={fileWrapper.file}
              onDelete={onDelete}
              onUpload={onUpload}
            />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
}
