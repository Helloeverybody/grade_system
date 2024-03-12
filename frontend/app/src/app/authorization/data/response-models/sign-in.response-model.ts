import {IRoleResponseModel} from "./role.response-model";

export interface ISignInResponseModel {
	id: string,
	username: string,
	email: string,
	roles: IRoleResponseModel[]
}
