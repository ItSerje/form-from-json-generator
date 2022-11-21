import { FC } from 'react';
import { useField } from 'formik';
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { DroppedFile } from './DroppedFile';
import { UploadError } from './UploadError';

let currentId = 0;

function getNewId() {
  return ++currentId;
}

type DroppedFiles = {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
};

type UploadInputContainerProps = JSX.IntrinsicElements['input'] & {
  name: string;
  acceptedFormats?: {
    [key: string]: string[];
  };
  multiple?: boolean;
  maximumFileSize?: number;
  preview?: boolean;
  dropzoneText?: string;
  checkboxLabel?: string;
  value?: string;
};

const UploadInputContainer: FC<UploadInputContainerProps> = (props) => {
  const {
    name,
    multiple = true,
    maximumFileSize,
    preview,
    dropzoneText,
    acceptedFormats,
  } = props;
  const [field, _, helpers] = useField(name);
  const [files, setFiles] = useState<DroppedFiles[]>(
    field.value.length ? field.value : []
  );

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
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

  const onUpload = (file: File, url: string) => {
    setFiles((curr) =>
      curr.map((fileWrapper) => {
        if (fileWrapper.file === file) {
          return { ...fileWrapper, url };
        }
        return fileWrapper;
      })
    );
  };

  const onDelete = (file: File) => {
    setFiles((curr) => curr.filter((fileWrapper) => fileWrapper.file !== file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    ...(acceptedFormats && { accept: acceptedFormats }), // eg. accept: { 'image/*': [], 'video/*': [], 'text/*': ['.pdf'] },
    ...(maximumFileSize && { maxSize: maximumFileSize * 1024 * 1024 }), // maximumFileSize MB
  });

  useEffect(() => {
    helpers.setValue(
      files.filter((file) => !file.errors.length),
      true
    );
  }, [files]);

  return (
    <React.Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {preview &&
        files[0]?.url &&
        typeof files[0].url === 'string' &&
        files[0].url.length > 0 ? (
          <img src={files[0].url} className='dropzone--image-preview' />
        ) : (
          <p>
            {dropzoneText ||
              "Drag 'n' drop some files here, or click to select files"}
          </p>
        )}
      </div>

      {files.map((fileWrapper) => (
        <div key={fileWrapper.id} className='dropzone__file-wrapper'>
          {fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
            />
          ) : (
            <DroppedFile
              file={fileWrapper.file}
              onDelete={onDelete}
              onUpload={onUpload}
            />
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default UploadInputContainer;
