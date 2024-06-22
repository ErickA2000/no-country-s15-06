export interface IProfileData {
    success: boolean,
    data: IProfileDataDetail
}
export interface IProfileDataDetail {
    firstName: string
    lastName: string
    dni: string,
    address: string,
    createdAt: string,
    updatedAt: string,
    account: {
        email: string;
        username: string;
    }
}