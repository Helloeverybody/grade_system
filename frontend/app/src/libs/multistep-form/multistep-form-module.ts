import {NgModule} from "@angular/core";
import {MultistepFormManagerService} from "./services/multistep-form-manager.service";
import {MultistepFormComponent} from "./directives/multistep-form.component";
import {FormStepDirective} from "./directives/form-step.directive";
import {NgSwitch, NgTemplateOutlet} from "@angular/common";

@NgModule({
	providers: [
		MultistepFormManagerService
	],
	exports: [
		MultistepFormComponent,
		FormStepDirective
	],
	imports: [
		NgSwitch,
		NgTemplateOutlet
	],
	declarations: [
		MultistepFormComponent,
		FormStepDirective
	]
})
export class MultistepFormModule {

}
