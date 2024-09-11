import type {AxiosError, AxiosResponse} from "axios";

export interface AxiosCallbackModel {
    ok?: (res: AxiosResponse, data: any|any[]) => void;
    bad?: (res: AxiosResponse) => void;
    error?: (err: AxiosError) => void;
    then?: () => void;
}