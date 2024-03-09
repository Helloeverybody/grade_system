import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiErrorModule, TuiNotificationModule} from "@taiga-ui/core";
import {AuthorizationRequestService} from "../../data/services/authorization-request.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'add-user-page',
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiNotificationModule,
    TuiErrorModule
  ],
  providers: [
    AuthorizationRequestService
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent {
  public registrationForm = new FormGroup({
    login: new FormControl('', [
      Validators.required, Validators.pattern(/[a-z]/)
    ]),
    email: new FormControl('', [
      Validators.required, Validators.email
    ])
  })

  protected loading = signal(false);
  protected requestError = signal<string | null>(null)

  private _authRequestService: AuthorizationRequestService = inject(AuthorizationRequestService)

  public sendRegistrationForm() {
    this.requestError.set('')

    if (this.registrationForm.valid) {
      this.loading.set(true)

      this._authRequestService.createUser({
        username: this.registrationForm.get('login')?.value || '',
        email: this.registrationForm.get('email')?.value || '',
      })
        .subscribe({
          error: () => {
            this.requestError.set('Не удалось добавить нового сотрудника')
            this.loading.set(false)
          },
          complete: () => {
            this.loading.set(false)
          }
        })
    } else {
      this.requestError.set('Форма заполнена не правильно!')
    }
  }
}
