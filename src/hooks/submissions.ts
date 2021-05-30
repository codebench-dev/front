import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import useToken from './token';

function useProcessInterval({
  onSuccess,
  onError,
}: {
  onSuccess: any;
  onError: any;
}) {
  const [processId, setProcessId] = useState('');
  const [isPollingEnabled, setIsPollingEnabled] = useState(false);
  const { token } = useToken();

  // 1: Handle code submission
  async function createJob(code: string) {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/submissions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          language: 'cpython3',
          code: code,
        }),
      },
    );
    return await response.json();
  }

  const { mutate } = useMutation(createJob, {
    onMutate: () => {
      setIsPollingEnabled(true);
    },
    onError: (error) => {
      console.error(error);
      setIsPollingEnabled(false);
      onError();
    },
    onSuccess: (data) => {
      console.log(data);
      setProcessId(data.id);
    },
  });

  // 2: Poll code execution job result until done or failed
  const { isLoading, data } = useQuery(
    ['processProgress', token, processId],
    async () => {
      const res: AxiosResponse<{ status: string; output: string }> =
        await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/submissions/${processId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      return res.data;
    },
    {
      onSuccess: (data) => {
        if (data.status === 'completed') {
          setIsPollingEnabled(false);
          onSuccess();
        }
      },
      onError: (error) => {
        console.error(error);
        setIsPollingEnabled(false);
        setProcessId('');
      },
      enabled: processId !== '',
      refetchInterval: isPollingEnabled ? 500 : false,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    },
  );

  return { mutate, data, isLoading };
}

export default useProcessInterval;
