import { AxiosError, AxiosResponse } from "axios"


export const handleResponse = {
    success:(res:AxiosResponse) => {
        return {
            status: res.status,
            data:res.data
        }
    },
    error:(res:AxiosError<AxiosResponse>) => {
        if(res.message === "Network Error"){
            return {
                status: 500,
                error:res,
            }
        }else{
            return {
                status:res.response?.status,
                error:res.response?.data
            }
        }
    }
}