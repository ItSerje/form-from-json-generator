// currently files are not uploaded onDrop. When needed the below function can be replaced with uploadFiles() (check formUtils)
export const getFileDataURL = async (
  file: File,
  setFileDataURL: (dataUrl: string | ArrayBuffer) => void,
  onProgress: (percentage: number) => void
) => {
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
};
