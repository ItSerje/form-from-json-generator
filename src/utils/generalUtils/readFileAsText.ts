export const readFileAsText = async (
  file: File,
  onComplete: (json: string) => void
) => {
  let fileReader: FileReader = new FileReader();
  let fileContent;
  fileReader.onload = (event) => {
    if (event.target?.result) {
      const { result } = event.target;
      if (typeof result === 'string') {
        onComplete(result);
      }
    }
  };
  fileReader.readAsText(file);
  return fileContent;
};
