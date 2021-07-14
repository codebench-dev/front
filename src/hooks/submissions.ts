import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import authenticatedRequest from '../components/utils/request';
import { useToken } from './token';

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
  async function createJob({
    code,
    benchmarkId,
    language,
  }: {
    code: string;
    benchmarkId: string;
    language: string;
  }) {
    const { data } = await authenticatedRequest({
      url: `/submissions`,
      method: 'POST',
      data: {
        language: language,
        code: code,
        benchmarkId: benchmarkId,
      },
    });
    return data;
  }

  const { mutate } = useMutation(createJob, {
    onMutate: () => {
      setIsPollingEnabled(true);
    },
    onError: (error) => {
      setIsPollingEnabled(false);
      onError();
    },
    onSuccess: (data) => {
      setProcessId(data.submission.id);
    },
  });

  // 2: Poll code execution job result until done or failed
  const { isLoading, data } = useQuery(
    ['processProgress', token, processId],
    async () => {
      const {
        data,
      }: {
        data: {
          status: string;
          message: string;
          error: string;
          stdout: string;
          stderr: string;
          execDuration: number;
          qualityScore: number;
          lintScore: number;
        };
      } = await authenticatedRequest({
        url: `submissions/${processId}`,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        if (data.status === 'done' || data.status === 'failed') {
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

export function useLastSubmissionForUser(
  benchmarkId: string,
  language: string,
) {
  return useQuery<{ code: string }, Error>(
    `last-submission-${benchmarkId}-${language}`,
    async () => {
      if (benchmarkId && language) {
        const { data } = await authenticatedRequest({
          url: `benchmarks/${benchmarkId}/submissions/last`,
          params: {
            language,
          },
        });
        return data;
      }
    },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );
}
