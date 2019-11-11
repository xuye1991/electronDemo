import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth'; 

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown> 
    </div> 
    <div nz-menu class="width-sm"> 
  </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) { }

  logout() {  
    
    let logUrl = this.tokenService.login_url; 

    this.tokenService.clear(); 
    this.router.navigateByUrl(logUrl);

  }
}

 