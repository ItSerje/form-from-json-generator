import { FC } from 'react';
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

export interface DroppedFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

export interface UploadableFile {
  id: number;
  file: File;
  url: string;
}

export type MultipleFilesUploadFieldProps = JSX.IntrinsicElements['input'] & {
  name: string;
  acceptedFormats?: {
    [key: string]: string[];
  };
  multiple?: boolean;
  maximumFileSize?: number;
  preview?: boolean;
  checkboxLabel?: string;
  value?: string;
};

export const MultipleFilesUploadField: FC<MultipleFilesUploadFieldProps> = ({
  name,
  multiple = true,
  maximumFileSize,
  preview,
  acceptedFormats,
}) => {
  const [field, meta, helpers] = useField(name);
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>('');

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    console.log('filess', accFiles, rejFiles);

    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => {
      curr = [...curr, ...mappedAcc, ...mappedRej];
      if (!multiple) {
        curr = curr.slice(curr.length - 1);
      }
      return curr;
    });
    helpers.setTouched(true);
  }, []);

  useEffect(() => {
    helpers.setValue(
      files.filter((file) => !file.errors.length),
      true
    );
    // helpers.setTouched(true);
    console.log(field, meta, helpers);
  }, [files]);

  useEffect(() => {
    if (preview) {
      if (!field.value[0]?.file) {
        setFileDataURL('');
        return;
      }
      let fileReader: FileReader,
        isCancel = false;
      if (field.value[0]?.file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          if (e.target?.result) {
            const { result } = e.target;
            if (!isCancel) {
              setFileDataURL(result);
            }
          }
        };
        console.log('файл', field.value[0].file);
        fileReader.readAsDataURL(field.value[0].file);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      };
    }
  }, [field.value]);

  //   useEffect(() => {
  //     onUpload(files[0].file, fileDataURL as string);
  //   }, [fileDataURL]);

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
    // multiple: multiple,
    ...(acceptedFormats && { accept: acceptedFormats }), // eg. accept: { 'image/*': [], 'video/*': [], 'text/*': ['.pdf'] },
    ...(maximumFileSize && { maxSize: maximumFileSize * 1024 * 1024 }), // maximumFileSize MB
  });

  return (
    <React.Fragment>
      <Grid item>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          {preview &&
          typeof fileDataURL === 'string' &&
          fileDataURL.length > 0 ? (
            <img
              src={fileDataURL}
              className={styles['dropzone--image-preview']}
            />
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
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
};
