import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import useSWR from 'swr';

const fetcher = (url) => openmrsFetch(url).then((res) => res.json());

export function useReportsData(startDate: string, endDate: string, reportId: string) {
  const url = `${restBaseUrl}/reportingrest/reportdata/${reportId}?startDate=${startDate}&endDate=${endDate}`;

  const { data, error, mutate, isLoading } = useSWR(url, fetcher, { revalidateOnFocus: false });

  return { data, error, mutate, isLoading };
}
