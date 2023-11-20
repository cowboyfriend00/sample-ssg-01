import React, { PropsWithChildren } from "react";
// import axios, { AxiosResponse } from 'axios';
import { SWRConfig } from "swr";

const isErrorStatus = (code: string) => code && code !== "200";
// const onResponse = async (res: AxiosResponse) => {
//     if (isErrorStatus(res.data.code)) {
//         return Promise.reject({ response: res.data });
//     }
//     return res;
// };
// axios.interceptors.response.use(onResponse);

const SWRProvider = ({ children }: PropsWithChildren) => (
  <SWRConfig
    value={{
      dedupingInterval: 300,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      fetcher: (args) => {
        const [resource, params = {}] = Array.isArray(args) ? args : [args];
        // return axios.get(resource, { params }).then((res) => res.data);
        return args;
      },
    }}
  >
    {children}
  </SWRConfig>
);

export default SWRProvider;
