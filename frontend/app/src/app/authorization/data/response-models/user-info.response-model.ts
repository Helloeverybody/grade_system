import {IRoleResponseModel} from "./role.response-model";

export interface IUserInfoResponseModel {
	id: string,
	username: string,
	email: string,
	roles: IRoleResponseModel[]
}
