import { ChangeEvent, FC, useRef, useState } from 'react';
import FormComponents from '../../../components/form';
import { readFileAsText } from '../../../utils/generalUtils/readFileAsText';

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
        onFilePick(await JSON.parse(json));
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
        <FormComponents.Button value='UPLOAD JSON' onClick={handleClick} />
      </label>
      {isParsingError && <span>Please upload json</span>}
    </>
  );
};

export default FilePickerAsButton;
