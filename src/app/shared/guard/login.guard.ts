import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import{Injectable, Inject}from'@angular/core';
import { TokenService, DA_SERVICE_TOKEN } from "@delon/auth";
import { SettingsService } from "@delon/theme";

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
        public settings: SettingsService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{

        let tokens:string = ''; 
        let loggedIn :boolean = false;
 
        tokens = this.settings.user.token;

        if(tokens==='' || tokens===undefined || tokens ===null){
            loggedIn = false;
        }else{
            loggedIn = true;
        }

        if(!loggedIn){
            this.router.navigate(['/login'])
        }
        return loggedIn; 
    }
}