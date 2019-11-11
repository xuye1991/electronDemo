import { Component, OnInit, Inject, OnDestroy, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { ElectronService } from 'ngx-electron'; 
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth'; 
import { SettingsService } from '@delon/theme';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  
  @ViewChild(TemplateRef) template: TemplateRef<{}>;
   
  modalityId: string = '';


  //use modality id here
  userId: string = '';

  constructor( 
    private _e: ElectronService,
    public settings: SettingsService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { 
   
  }

  ngOnInit() {

    console.log('dashboard init');
 
  } 


}
