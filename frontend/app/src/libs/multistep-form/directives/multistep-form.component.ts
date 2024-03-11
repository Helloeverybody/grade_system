import {AfterViewInit, Component, inject} from "@angular/core";
import {MultistepFormManagerService} from "../services/multistep-form-manager.service";

@Component({
	selector: 'multistep-form',
	providers: [
		MultistepFormManagerService
	],
	template: `<ng-content></ng-content>`
})
export class MultistepFormComponent implements AfterViewInit {
	protected managerService: MultistepFormManagerService = inject(MultistepFormManagerService);

	public ngAfterViewInit(): void {
		this.managerService.initializeStepping();
	}
}
