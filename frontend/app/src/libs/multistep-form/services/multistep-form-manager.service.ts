import {AfterViewInit, DestroyRef, inject, Injectable} from "@angular/core";
import {BehaviorSubject, tap} from "rxjs";
import {IStep} from "../interfaces/step.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

type Step = { stepInstance: IStep, step: number }

@Injectable()
export class MultistepFormManagerService {
	private _formSteps: Step[] = [];
	protected currentStep$ = new BehaviorSubject(1);
	private _destroyRef: DestroyRef = inject(DestroyRef)

	public nextStep() {
		if (this.currentStep$.value < this._formSteps.length) {
			this.currentStep$.next(this.currentStep$.value + 1)
		}
	}

	public previousStep() {
		if (this.currentStep$.value > 1) {
			this.currentStep$.next(this.currentStep$.value - 1)
		}
	}

	public initializeStep(step: Step) {
		this._formSteps.push(step);
	}

	public initializeStepping() {
		this.currentStep$
			.pipe(
				tap((newStep) => {
					this._formSteps.forEach((step: Step) => step.stepInstance.destroy())

					const step = this._formSteps.find((step: Step) => step.step === newStep).stepInstance
					step.render()
				}),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe()
	}
}
