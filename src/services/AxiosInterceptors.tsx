// import axios from "axios";
// import React, { useEffect } from "react";
// interface IProps {
//   children: React.ReactNode;
// }
// const AxiosInterceptors = ({ children }: IProps) => {
//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use(
//       function (config) {
//         return config;
//       },
//       function (error) {
//         return Promise.reject(error);
//       }
//     );
//     const responseInterceptor = axios.interceptors.response.use(
//       function (response) {
//         return response;
//       },
//       function (error) {
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };
//   }, []);
//   return <>{children}</>;
// };
// export default AxiosInterceptors;
