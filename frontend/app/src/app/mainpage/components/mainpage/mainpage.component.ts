import { Component } from '@angular/core';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'mainpage',
  standalone: true,
	imports: [
		AppHeaderComponent,
		RouterOutlet
	],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent {

}
