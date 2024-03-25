import {OperatorFunction, Observable, shareReplay, Subject, BehaviorSubject} from "rxjs";

export abstract class BufferedTokenService<TInput, TOutput> {
	private updateToken$: Subject<TInput>;
	public value: Observable<TOutput>;

	protected constructor(initValue: TInput) {
	 	this.updateToken$ = new BehaviorSubject<TInput>(initValue);
		this.value = this.createBuffer();
	}

	/**
	 * Действие, которое должно произойти при новом обновлении
	 * */
	protected abstract action(): OperatorFunction<TInput, TOutput>;

	/**
	 * Обновить буфер
	 * */
	public update(value: TInput) {
		this.updateToken$.next(value);
	}

	private createBuffer(): Observable<TOutput> {
		return this.updateToken$
			.pipe(
				this.action(),
				shareReplay(1)
			)
	}
}
