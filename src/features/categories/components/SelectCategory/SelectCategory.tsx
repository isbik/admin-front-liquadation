import { Select, SelectProps } from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { $categories, fetchCategoriesFx } from './select.category.model';

type Props = SelectProps;

const SelectCategory = ({ ...props }: Props) => {
  const categories = useStore($categories);

  useEffect(() => {
    fetchCategoriesFx();
  }, []);

  return (
    <Select {...props}>
      {categories.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </Select>
  );
};

export default SelectCategory;
