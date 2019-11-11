import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import * as $ from 'jquery'; 
import { NzModalService } from 'ng-zorro-antd'; 
import { SettingsService } from '@delon/theme';
import * as Contrast from "../../app.contrast"; 
import { TokenService, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth'; 
import { Router } from '@angular/router';
import { RtcClient_1 } from '@shared/rtc-clients/RTCClient_1';
 
//declare var WebRTCAPI: any;


@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styles: ['./cameras.component.less']
})
export class CamerasComponent implements OnInit {
 

  constructor( 
    private modalService: NzModalService, 
    public settings: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, ) { }

  ngOnInit() {

  this.newpush();
  }

  newpush() {
    this.client_1_init();
  }

  client_1_init() {

    let userId = 'Web_trtc_02';
    let roomId = '528341';
    let sdkAppId = 'APPID';
    let userSig = '用户签名';

    let rtc = new RtcClient_1({
      userId,
      roomId,
      sdkAppId: sdkAppId,
      userSig: userSig
    });
    rtc.join(); 
  }

}
