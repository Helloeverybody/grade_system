import {ICreateUserResponseModel} from "../data/response-models/create-user.response-model";

export class CreateUserSuccessViewModel {
	password: string;
	login: string;

	constructor(data: ICreateUserResponseModel) {
		this.fillViewModel(data)
	}

	public fillViewModel(data: ICreateUserResponseModel) {
		this.password = data.password;
		this.login = data.login;
	}
}
