import * as React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import ApiService from './apiService';

const { useState } = React;

export default function useService<Response, Request>(
  service: ApiService<Response, Request>
) {
  const [response, setResponse] = useState<Response | undefined>();
  const [error, setError] = useState<AxiosError | undefined>();

  let onFinally: (() => void) | undefined = (): Promise<AxiosResponse<any>> =>
    (undefined as unknown) as Promise<AxiosResponse<any>>;

  function _execute(request?: Request) {
    service
      .execute(request)
      .then(setResponse)
      .catch(setError)
      .finally(onFinally);
  }

  function Send(request: Request) {
    _execute(request);
  }

  function OnSuccess(handleSuccess: () => void) {
    React.useEffect(() => {
      if (response) {
        handleSuccess();
      }
      // eslint-disable-next-line
    }, [response]);
  }

  function OnError(handleError: () => void) {    
    React.useEffect(() => {
      if (error) {
        handleError();
      }
      // eslint-disable-next-line
    }, [error]);
  }

  function OnFinish(handleFinish: () => void) {
    onFinally = handleFinish;
  }

  return {
    response,
    error,
    send: Send,
    onSuccess: OnSuccess,
    onError: OnError,
    onFinish: OnFinish,
  };
}
