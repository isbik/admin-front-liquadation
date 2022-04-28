import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  IconButton,
  Image,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import SmartTable from '../components/SmartTable/SmartTable';
import {
  $categories,
  $filters,
  $page,
  $total,
  changePage,
  deleteCategoryFx,
  editCategoryFromTable,
  PER_PAGE,
  setFilters,
  toggleModal,
} from '../features/categories/categories.model';
import { CreateCategoryModal } from '../features/categories/components';

const Categories = () => {
  const categories = useStore($categories);
  const total = useStore($total);
  const filters = useStore($filters);
  const page = useStore($page);

  useEffect(() => {
    changePage(0);
  }, []);

  const handleParentCheckboxChange = () => {
    const { parentCategory, ...rest } = filters;

    if (parentCategory) {
      setFilters(rest);
    } else {
      setFilters({ ...rest, parentCategory: 'null' });
    }
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="flex gap-4 my-4 ">
        <Button onClick={() => toggleModal()} colorScheme={'blue'}>
          Добавить категорию
        </Button>
        <CreateCategoryModal />
        <Checkbox
          isChecked={filters.parentCategory === 'null'}
          onChange={handleParentCheckboxChange}
          size="md"
          colorScheme="blue"
          defaultChecked
        >
          Показать только родительские категории
        </Checkbox>
      </div>

      <SmartTable
        onChange={({ page }) => changePage(page)}
        pagination={{
          page,
          total,
          perPage: PER_PAGE,
        }}
      >
        <Thead>
          <Tr>
            <Th>Номер</Th>
            <Th>Название</Th>
            <Th>Изображение</Th>
            <Th>Родительская категория</Th>
            <Th>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>{category.id}</Td>
              <Td>{category.name}</Td>
              <Td>
                {category.image === null ? (
                  '-'
                ) : (
                  <Image boxSize="50px" src={category.image.url} />
                )}
              </Td>
              <Td>
                {category.parentCategory?.name || (
                  <span className="italic">-</span>
                )}
              </Td>
              <Td>
                <IconButton
                  className="mr-2"
                  size={'sm'}
                  aria-label="edit"
                  colorScheme="blue"
                  icon={<EditIcon />}
                  onClick={() => editCategoryFromTable(category)}
                />
                <IconButton
                  onClick={() => deleteCategoryFx(category.id)}
                  size={'sm'}
                  aria-label="delete"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </SmartTable>
    </div>
  );
};

export default Categories;
