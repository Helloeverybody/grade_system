import {
	AfterViewInit,
	Directive,
	EmbeddedViewRef,
	inject, Input,
	input,
	OnInit,
	TemplateRef,
	ViewContainerRef
} from "@angular/core";
import {MultistepFormManagerService} from "../services/multistep-form-manager.service";
import {IStep} from "../interfaces/step.interface";

@Directive({
	selector: 'ng-template[step]'
})
export class FormStepDirective implements IStep, OnInit {
	private _managerService: MultistepFormManagerService = inject(MultistepFormManagerService);
	private _template: TemplateRef<FormStepDirective> = inject(TemplateRef)
	private _element: EmbeddedViewRef<any> | null = null;
	private _viewContainer: ViewContainerRef = inject(ViewContainerRef)

	@Input()
	public step: number;

	public ngOnInit() {
		this._managerService.initializeStep({ stepInstance: this, step: this.step })
	}

	public render() {
		this._element = this._viewContainer.createEmbeddedView(this._template)
		this._element.detectChanges()
	}

	public destroy() {
		this._element?.destroy()
	}
}
