import { AxiosError } from "axios";
import { useModals } from "@mantine/modals";
import { useLocation, useNavigate } from "react-router-dom";
import { MCAPError } from "../models/Error.model";
import { Button, Text } from "@mantine/core";

const useAxiosError = () => {
    const modals = useModals();
    const navigate = useNavigate();
    const location = useLocation();

    const handleError = (err: AxiosError) => {
        if (err.response?.data) {
          const errResponse = err.response.data as MCAPError;
          if (errResponse.error?.statusCode === 401 && errResponse.message === "Please login to QuickBooks in the app settings and try again") {
            const { message } = errResponse;
            const id = modals.openModal({
              title: 'QuickBooks Login Error',
              centered: true,
              onClose: () => {
                navigate('/settings');
              },
              children: (
                <>
                  <Text>{message}</Text>
                  <Button fullWidth onClick={() => {
                    navigate('/settings')
                    modals.closeModal(id)
                  }} mt="md">Login to QuickBooks</Button>
                </>
              )
            })
          } else if (errResponse.error?.statusCode === 401 || errResponse.message === "jwt expired") {
            navigate('/login', { replace: true });
          } else {
            const { message } = errResponse;
            const id = modals.openModal({
              title: 'Something bad happened',
              centered: true,
              children: (
                <>
                  <Text>{message}</Text>
                  <Button fullWidth onClick={() => modals.closeModal(id)} mt="md">Close</Button>
                </>
              )
            })
          }
        }
    }

    return handleError;

}

export default useAxiosError;