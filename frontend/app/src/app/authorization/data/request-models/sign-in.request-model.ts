interface ISignInRequestModelRequired {
	username: string,
	email: string,
	password: string,
}

export type ISignInRequestModel = Omit<ISignInRequestModelRequired, 'username'> | Omit<ISignInRequestModelRequired, 'email'>
