import { Title, Text, Blockquote, Space, Group, Button, PasswordInput, TextInput, Select } from '@mantine/core'
import { UserPlus } from 'tabler-icons-react'
import { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import { User } from '../../models/User.model'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { USERS } from '../../App.constants'
import { MCAPResponse } from '../../models/MCAP.model'
import { useNavigate } from 'react-router-dom'
import { useModals } from '@mantine/modals'
import useAxiosError from '../../hooks/useAxiosError'
import CreateNewEmployee from './CreateNewEmployee'
import { showNotification } from '@mantine/notifications'

type Props = {}

function Employees({ }: Props) {
  const axiosPrivate = useAxiosPrivate();
  const modals = useModals();
  const initEmps: User[] = [];
  const [employees, setEmployees] = useState(initEmps);
  const navigate = useNavigate();
  const axiosError = useAxiosError();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getUsers = async (isMounted: boolean, controller?: AbortController) => {
      try {
        const response = await axiosPrivate.get(USERS, {
          signal: controller?.signal
        });
        const responseData = response?.data as MCAPResponse;
        const empData = responseData?.data?.users as User[];
        isMounted && setEmployees(empData)
      } catch (e) {
        axiosError(e as AxiosError);
      }
    }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getUsers(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  const handleCreateEmployeeClose = async () => {
    getUsers(true);
    setIsCreateModalOpen(false);
  }

  const handleDeleteEmployee = async (user: User) => {
    modals.openConfirmModal({
        title: 'Delete User',
        centered: true,
        children: (
          <Text>{`Are you sure you want to delete ${user.name}'s account?`}</Text>
        ),
        labels: { confirm: 'Delete Account', cancel: 'Cancel' },
        onCancel: () => { },
        onConfirm: async () => {
          try {
            const response = await axiosPrivate.delete(`${USERS}/${user._id}`);
            const responseData = response?.data as MCAPResponse;
            if (response.status === 204) {
              showNotification({
                title: 'User Account Deleted',
                message: `${user.name}'s account has been successfully deleted`,
                autoClose: 10000,
                color: 'green'
              });
              getUsers(true);
            }
          } catch (e) {
            axiosError(e as AxiosError);
          }
        }
      })
  }

  return (
    <>
        <Title order={1}>Your Employees</Title>
        <br />
        <Group position='apart'>
            <Text color="gray">Only Administrators and Owners can see this area</Text>
            <Button leftIcon={<UserPlus size={20} />} onClick={() => setIsCreateModalOpen(true)}>Create New Employee Account</Button>
        <CreateNewEmployee opened={isCreateModalOpen} onClose={() => handleCreateEmployeeClose()} />
        </Group>
        <Space h="md" />
      <EmployeeTable data={employees} deleteEmp={handleDeleteEmployee} getUsers={getUsers} />  
    </>
  )
}

export default Employees