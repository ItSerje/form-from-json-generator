import { FC } from 'react';
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

type MultipleFilesUploadFieldProps = JSX.IntrinsicElements['input'] & {
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

const MultipleFilesUploadField: FC<MultipleFilesUploadFieldProps> = (props) => {
  const {
    name,
    multiple = true,
    maximumFileSize,
    preview,
    dropzoneText,
    acceptedFormats,
  } = props;
  const [field, _, helpers] = useField(name);
  const [files, setFiles] = useState<DroppedFile[]>(
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

  useEffect(() => {
    helpers.setValue(
      files.filter((file) => !file.errors.length),
      true
    );
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
    ...(acceptedFormats && { accept: acceptedFormats }), // eg. accept: { 'image/*': [], 'video/*': [], 'text/*': ['.pdf'] },
    ...(maximumFileSize && { maxSize: maximumFileSize * 1024 * 1024 }), // maximumFileSize MB
  });

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
            <SingleFileUploadWithProgress
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

export default MultipleFilesUploadField;
