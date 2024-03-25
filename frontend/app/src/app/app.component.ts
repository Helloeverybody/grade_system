import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {UserRequestService} from "./authorization/data/services/user-request.service";
import {UserInfoBufferService} from "./authorization/data/services/user-info-buffer.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    providers: [
		UserRequestService,
		UserInfoBufferService,
		{
			provide: TUI_SANITIZER,
			useClass: NgDompurifySanitizer
		}
	]
})
export class AppComponent {

}
