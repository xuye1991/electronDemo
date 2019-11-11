import { Component, Inject, EventEmitter } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd'; 
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth'; 
import * as Contrast from "../../../app.contrast";
import { SettingsService } from '@delon/theme'; 
import * as $ from 'jquery'; 
import { Router } from '@angular/router';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
 

  constructor(
    public msgSrv: NzMessageService, 
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService, 
    private modalService: NzModalService,
    public settings: SettingsService, 
    private router: Router) {


  }

  ngOnInit() { 
    console.log('Sidebar init'); 
  } 
}
