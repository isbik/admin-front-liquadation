import { Button, Table, TableContainer } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  pagination: {
    total: number;
    perPage: number;
    page: number;
  };
  onChange: (data: { page: number }) => void;
};

const SmartTable = ({ children, pagination, onChange }: Props) => {
  const { total, perPage, page } = pagination;

  const handleChange = ({ page }: { page: number }) => {
    onChange({ page });
  };

  return (
    <>
      <TableContainer className="mt-4 overflow-auto border rounded">
        <Table variant={'striped'}>{children}</Table>

        {!children && '1'}
      </TableContainer>

      <div className="flex flex-wrap gap-2 mt-4">
        {Array.from({ length: Math.floor(total / perPage) }).map((_, index) => (
          <Button
            onClick={() => handleChange({ page: index })}
            variant={page === index ? 'solid' : 'outline'}
            key={index}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SmartTable;
