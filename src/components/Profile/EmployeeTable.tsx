import { ActionIcon, Avatar, Group, ScrollArea, Table, Text, Tooltip } from '@mantine/core';
import { AxiosError } from 'axios';
import React, { useState } from 'react'
import { Pencil, Refresh, Trash } from 'tabler-icons-react';
import { USERS } from '../../App.constants';
import useAxiosError from '../../hooks/useAxiosError';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { MCAPResponse } from '../../models/MCAP.model';
import { User } from '../../models/User.model';
import ChangeEmployeePassword from './ChangeEmployeePassword';
import UpdateEmployee from './UpdateEmployee';

type Props = {
  data: User[];
  getUsers: (isMounted: boolean, controller?: AbortController) => Promise<void>;
  deleteEmp(user: User): Promise<void>
}

function EmployeeTable({ data, getUsers, deleteEmp }: Props) {
  const [user, setUser] = useState({} as User);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const axiosError = useAxiosError();

  const handleUpdateModalOpen = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`${USERS}/${id}`);
      const responseData = response?.data as MCAPResponse;
      const userToEdit = responseData?.data as User;
      setUser(userToEdit);
      setIsUpdateModalOpen(true);
    } catch (e) {
      axiosError(e as AxiosError);
    }
  }

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    getUsers(true);
  }

  const handleChangePasswordModalOpen = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`${USERS}/${id}`);
      const responseData = response?.data as MCAPResponse;
      const userToEdit = responseData?.data as User;
      setUser(userToEdit);
      setIsChangePasswordModalOpen(true);
    } catch (e) {
      axiosError(e as AxiosError);
    }
  }

  const handleChangePasswordModalClose = () => {
    setIsChangePasswordModalOpen(false);
    getUsers(true);
  }

    data.forEach(emp => {
      if (emp.role === 'admin') {
        emp.role = 'administrator';
      }
      emp.role = emp.role.charAt(0).toUpperCase() + emp.role.slice(1);
    });


    const rows = data.map((emp) => (
    <tr key={emp.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} radius={40} color={emp.active ? "blue" : "gray"}>{emp.avatar}</Avatar>
          <div>
            <Text size="sm" weight={500}>
              {emp.name}
            </Text>
            <Text size="xs" color="dimmed">
              {emp.email}
            </Text>
          </div>
        </Group>
      </td>
      <td>{emp.role}</td>
      <td>{emp._id}</td>
      <td>
        <Group spacing={0} position="right">
            <Tooltip label="Edit User" withArrow>
                <ActionIcon onClick={() => handleUpdateModalOpen(emp._id)}>
                    <Pencil size={16} />
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Reset Password" withArrow>
                <ActionIcon onClick={() => handleChangePasswordModalOpen(emp._id)}>
                    <Refresh size={16} />
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete" withArrow>
                <ActionIcon color="red" onClick={() => deleteEmp(emp)}>
                    <Trash size={16} />
                </ActionIcon>
            </Tooltip>
        </Group>
      </td>
    </tr>
  ));


  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Account ID</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <UpdateEmployee user={user} opened={isUpdateModalOpen} setOpened={handleUpdateModalClose} />
      <ChangeEmployeePassword user={user} opened={isChangePasswordModalOpen} setOpened={handleChangePasswordModalClose} />
    </ScrollArea>
  );

}

export default EmployeeTable