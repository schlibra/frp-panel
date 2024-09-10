export interface AxiosCallbackModel {
    ok?: (res: object, data: any|any[]) => void;
    bad?: (res: object) => void;
    error?: (err: object) => void;
    then?: () => void;
}