/**
 * Created by gucheng on 1/21/16.
 */
/// <reference path="../typings/index.d.ts" />

import { Component, OnInit, NgZone } from '@angular/core';
import { ContenteditableModel } from './shared';
import { TagInput } from './shared';
import { ToastService } from './shared';
import { DiaryService } from './services';

@Component({
  selector: 'diary',
  templateUrl: 'app/app.html',
  directives: [ContenteditableModel, TagInput],
  providers: [ToastService, DiaryService]
})
export class AppComponent implements OnInit {
  title = 'Journal';

  tags = [];

  content = '';

  timeline = [];

  constructor(private ToastService: ToastService,
              private zone: NgZone,
              private diaryService: DiaryService) {
  }

  submit() {
    if (!this.content) {
      console.log('content-empty');
      return;
    }

    this.diaryService.createDiary({
      content: this.content,
      tags: this.tags,
      pub_timestamp: new Date()
    })
      .then(diary => {
        this.ToastService.show('保存成功');
        this.zone.run(() => {
          this.timeline.unshift(diary);
          this.content = '';
          this.tags.length = 0;
        });
      })
      .catch(err => {
        this.ToastService.show('保存失败', 'error');
      });
  }

  ngOnInit() {
    this.diaryService.getDiaries().then(diaries => {
      this.zone.run(() => {
        Array.prototype.push.apply(this.timeline, diaries);
      });
    });
  }
}