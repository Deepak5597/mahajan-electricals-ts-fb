export declare interface IResponse<ObjectType> {

    isError: boolean,
    isSuccess: boolean,
    data: ObjectType,
    message: string
}