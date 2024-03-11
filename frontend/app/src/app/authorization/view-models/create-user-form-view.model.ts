import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICreateUserRequestModel} from "../data/request-models/create-user.request-model";
import {signal} from "@angular/core";
import {IRoleResponseModel} from "../data/response-models/role.response-model";

export class CreateUserFormViewModel {
	public submitLoading = signal(false);
	public formLoading = signal(true);
	public requestError = signal<string | null>(null)
	public roleList = signal<IRoleResponseModel[]>([])

	public form: FormGroup;

	public initialize(values: IRoleResponseModel[]): void {
		this.roleList.set(values)
		this.createForm(values[0])
		this.formLoading.set(false)
	}

	public getModel(): ICreateUserRequestModel {
		return {
			username: this.form.get('login')?.value || '',
			email: this.form.get('email')?.value || '',
			roles: this.form.get('roles')?.value.map((role: IRoleResponseModel) => role._id) || []
		}
	}

	public stringifyRole(role: IRoleResponseModel) {
		return role.title
	}

	public removeRoleFromSelected(role: IRoleResponseModel) {
		const currentRoles = this.form.get('roles').value as IRoleResponseModel[]
		const rolesWithoutDeleted = currentRoles.filter((value) => value.name != role.name)
		this.form.get('roles').setValue(rolesWithoutDeleted)
	}

	private createForm(defaultRole: IRoleResponseModel) {
		this.form = new FormGroup({
			login: new FormControl('', [
				Validators.required, Validators.pattern(/[a-z]/)
			]),
			email: new FormControl('', [
				Validators.required, Validators.email
			]),
			roles: new FormControl([defaultRole], [
				Validators.required
			]),
		})
	}
}
