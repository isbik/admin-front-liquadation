import { Box, Button, Image } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { api } from '../services';
import { CloudFile } from '../types';

type Props = {
  image?: CloudFile;
  onChange: (data: CloudFile) => void;
};

const ImageLoader = ({ image, onChange }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [_image, setImage] = useState<CloudFile | null>(image || null);

  useEffect(() => {
    console.log(image);

    onChange(_image);
  }, [_image]);

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files || [];

    if (!file) return;

    const formData = new FormData();

    formData.append('file', file);

    api.post('/upload/image', formData).then((response) => {
      setImage(response.data);
    });
  };

  return (
    <Box className="flex my-2">
      {_image ? (
        <Box className="flex w-full gap-4 p-2 bg-gray-100 rounded">
          <Image className="rounded" boxSize="100px" src={_image.url} />
          <Box className="flex gap-4">
            <Button
              onClick={() => imageRef.current?.click()}
              colorScheme="blue"
            >
              Заменить
            </Button>
            <Button onClick={() => setImage(null)} colorScheme={'red'}>
              Удалить
            </Button>
          </Box>
        </Box>
      ) : (
        <button
          onClick={() => imageRef.current?.click()}
          className="w-full p-4 text-sm font-bold border border-gray-500 border-dotted"
        >
          Выбрать изображение
        </button>
      )}
      <input
        ref={imageRef}
        className="hidden"
        type="file"
        multiple
        onChange={handleChangeFileInput}
      />
    </Box>
  );
};

export default ImageLoader;
