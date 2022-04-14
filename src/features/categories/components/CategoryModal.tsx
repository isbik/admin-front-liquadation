import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React from 'react';
import ImageLoader from '../../../components/ImageLoader';
import {
  $categoryId,
  $categoryImage,
  $categoryName,
  $isOpenModal,
  $parentCategoryId,
  changeCategoryImage,
  changeCategoryName,
  changeParentCategoryId,
  createCategory,
  toggleModal,
  updateCategory,
} from '../categories.model';
import SelectCategory from './SelectCategory/SelectCategory';

const CategoryModal = () => {
  const isOpen = useStore($isOpenModal);

  const name = useStore($categoryName);
  const parentId = useStore($parentCategoryId);
  const categoryId = useStore($categoryId);
  const categoryImage = useStore($categoryImage);

  const initialRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={() => toggleModal()}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {categoryId ? 'Изменение категории' : 'Добавление категории'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl className="mb-2">
              <FormLabel>Название категории</FormLabel>
              <Input
                value={name}
                onChange={(e) => changeCategoryName(e.target.value)}
                ref={initialRef}
                placeholder="Название категории"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Родительская категория</FormLabel>
              <SelectCategory
                placeholder="Родительская категория"
                value={parentId || ''}
                onChange={(e) => {
                  changeParentCategoryId(Number(e.target.value) || null);
                }}
              />
            </FormControl>

            <ImageLoader
              image={categoryImage}
              onChange={(image) => {
                changeCategoryImage(image);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => toggleModal()}>
              Отменить
            </Button>
            <Button
              onClick={() => (categoryId ? updateCategory() : createCategory())}
              colorScheme="blue"
            >
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CategoryModal as CreateCategoryModal };
