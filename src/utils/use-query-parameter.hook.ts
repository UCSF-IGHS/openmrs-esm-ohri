import { useHistory, useLocation } from 'react-router-dom';

/**
 * A hook similar to `useState` which reads from and writes to a query parameter.
 * @param name The name of the query parameter.
 * @param fallbackValue A value to be returned instead of `null` (in case no such query parameter is available).
 */
export function useQueryParameter(
  name: string,
  fallbackValue: string = null,
): [string | null, (newValue: string) => void] {
  const history = useHistory();
  const location = useLocation();
  const current = new URLSearchParams(location.search).get(name) ?? fallbackValue;
  const setCurrent = (value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(name, value);
    history.push({
      ...history.location,
      search: params.toString(),
    });
  };

  return [current, setCurrent];
}
