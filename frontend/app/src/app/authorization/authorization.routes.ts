import {Routes} from "@angular/router";
import {AddUserPageComponent} from "./children/add-user/components/add-user-page/add-user-page.component";
import {SignInPageComponent} from "./children/sign-in/components/sign-in/sign-in-page.component";
import {isAuthorizedGuard} from "./guards/is-authorized.guard";

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'sign-in',
		pathMatch: 'full'
	},
	{
		path: 'create-user',
		providers: [],
		canActivate: [isAuthorizedGuard],
		component: AddUserPageComponent
	},
	{
		path: 'sign-in',
		component: SignInPageComponent
	},
]

