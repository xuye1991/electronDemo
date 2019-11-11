import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.less']
})
export class SlideshowComponent implements OnInit {
  testSwiper: Swiper;
  slides = [
    './assets/png/login_pic4.png',
    './assets/png/login_pic1.png',
    './assets/png/login_pic2.png'
  ];

  constructor() { }

  ngOnInit() {
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    this.testSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 水平切换选项
      loop: true, // 循环模式选项
      autoplay: true,
      speed: 1000,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

}
