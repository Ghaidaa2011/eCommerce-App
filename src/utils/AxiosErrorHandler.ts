import { isAxiosError } from "axios";

const AxiosErrorHandler = (error: unknown) => {
  //isAxiosError(error) this is a Guard

  if (isAxiosError(error)) {
    return error.response?.data || error.response?.data.message || error.message;
  } else {
    return "An unexpected error";
  }
}
export default AxiosErrorHandler