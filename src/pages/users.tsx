import { CheckIcon, LockIcon } from '@chakra-ui/icons';
import { IconButton, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import SmartTable from '../components/SmartTable/SmartTable';
import {
  $page,
  $total,
  $users,
  changePage,
  changeUserStatus,
  PER_PAGE,
} from '../features/users/users.model';
import { UserEmailStatus } from '../features/users/users.types';

const Users = () => {
  const users = useStore($users);
  const total = useStore($total);
  const page = useStore($page);

  useEffect(() => {
    changePage(0);
  }, []);

  return (
    <div className="container px-4 mx-auto">
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
            <Th>Status</Th>
            <Th>id</Th>
            <Th>organizationName</Th>
            <Th>INN</Th>
            <Th>KPP</Th>
            <Th>ORGN</Th>
            <Th>city</Th>
            <Th>factAddress</Th>
            <Th>legalAddress</Th>
            <Th>postalCode</Th>
            <Th>phone</Th>
            <Th>email</Th>
            <Th>fio</Th>
            <Th>position</Th>
            <Th>directorPhone</Th>
            <Th>directorEmail</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <div className="flex flex-col items-center gap-2 font-bold">
                  {user.emailStatus}

                  <div>
                    {[
                      UserEmailStatus.blocked,
                      UserEmailStatus.verification,
                    ].includes(user.emailStatus) && (
                      <IconButton
                        className="mr-2"
                        size={'sm'}
                        aria-label="edit"
                        colorScheme="green"
                        icon={<CheckIcon />}
                        onClick={() =>
                          changeUserStatus({
                            userId: user.id,
                            status: UserEmailStatus.active,
                          })
                        }
                      />
                    )}
                    {[
                      UserEmailStatus.active,
                      UserEmailStatus.verification,
                    ].includes(user.emailStatus) && (
                      <IconButton
                        onClick={() =>
                          changeUserStatus({
                            userId: user.id,
                            status: UserEmailStatus.blocked,
                          })
                        }
                        size={'sm'}
                        aria-label="delete"
                        colorScheme="red"
                        variant={'ghost'}
                        icon={<LockIcon />}
                      />
                    )}
                  </div>
                </div>
              </Td>
              <Td>{user.id}</Td>
              <Td>{user.organizationName}</Td>
              <Td>{user.INN}</Td>
              <Td>{user.KPP}</Td>
              <Td>{user.ORGN}</Td>
              <Td>{user.city}</Td>
              <Td>{user.factAddress}</Td>
              <Td>{user.legalAddress}</Td>
              <Td>{user.postalCode}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.email}</Td>
              <Td>{user.fio}</Td>
              <Td>{user.position}</Td>
              <Td>{user.directorPhone}</Td>
              <Td>{user.directorEmail}</Td>
            </Tr>
          ))}
        </Tbody>
      </SmartTable>
    </div>
  );
};

export default Users;
