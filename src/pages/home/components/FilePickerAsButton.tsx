import { ChangeEvent, FC, useRef, useState } from 'react';
import FormComponents from '../../../components/form';
import { readFileAsText } from '../../../utils/generalUtils/readFileAsText';
import { v4 as uuidv4 } from 'uuid';

type FilePickerButtonProps = {
  onFilePick: (file: File) => void;
};

const FilePickerAsButton: FC<FilePickerButtonProps> = ({ onFilePick }) => {
  const [isParsingError, setIsParsingError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = '';

    const onComplete = async (json: string) => {
      try {
        const obj = await JSON.parse(json);
        obj.id = uuidv4();
        onFilePick(obj);
        setIsParsingError(false);
      } catch (error) {
        setIsParsingError(true);
      }
    };

    readFileAsText(fileObj, onComplete);
  };

  return (
    <>
      <label className='neuromorphic'>
        <input type='file' ref={inputRef} onChange={handleFileChange} hidden />
        <FormComponents.Button
          className='btn--embossed'
          value='UPLOAD JSON'
          onClick={handleClick}
        />
      </label>
      {isParsingError && (
        <div className='form__message form__message--error invalid-json-error'>
          Please upload valid json
        </div>
      )}
    </>
  );
};

export default FilePickerAsButton;
