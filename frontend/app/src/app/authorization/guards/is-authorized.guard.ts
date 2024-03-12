import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {AuthorizationRequestService} from "../data/services/authorization-request.service";


export function isAuthorizedGuard(next: ActivatedRouteSnapshot, nextState: RouterStateSnapshot): Observable<boolean | UrlTree> {
	const authService = inject(AuthorizationRequestService);
	const router = inject(Router);

	const url: UrlTree = router.createUrlTree(
		['/authorization/sign-in'],
		{
			queryParams:  {
				next: nextState.url
			}
		}
	);


	return authService.ping()
		.pipe(
			map(() => true),
			catchError((error) => {
				console.log(error)
				return of(url)
			})
		)
}
