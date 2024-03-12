import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ISignInRequestModel} from "../../../data/request-models/sign-in.request-model";

export class SignInViewModel {
	public form: FormGroup

	constructor() {
		this.createForm();
	}

	public getModel(): ISignInRequestModel {
		return {
			password: this.form.get('password').value,
			username: this.form.get('login').value
		}
	}

	private createForm() {
		this.form = new FormGroup({
			login: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		})
	}
}
