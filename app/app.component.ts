/**
 * Created by gucheng on 1/21/16.
 */
/// <reference path="../typings/index.d.ts" />

import { Component, OnInit, NgZone } from '@angular/core';
import { ContenteditableModel } from './shared';
import { TagInput } from './shared';
import LeancloudConfig from './leancloud-config';
import { ToastService } from './shared';
import moment = require('moment');
const AV = require('leancloud-storage');

AV.init(LeancloudConfig);

const Diary = AV.Object.extend('Diary');

moment.locale('zh-cn');

@Component({
  selector: 'diary',
  templateUrl: 'app/app.html',
  directives: [ContenteditableModel, TagInput],
  providers: [ToastService]
})
export class AppComponent implements OnInit {
  title = 'Journal';

  tags = [];

  content = '';

  timeline = [];

  diary = new Diary();

  query = new AV.Query('Diary');

  constructor(private ToastService: ToastService, private zone: NgZone) {
  }

  submit() {
    if (!this.content) {
      console.log('content-empty');
      return;
    }

    this.diary.save({
      pub_timestamp: new Date(),
      content: this.content,
      tags: this.tags
    })
      .then((response) => {
        console.log(response);
        this.ToastService.show('保存成功');
        this.zone.run(() => {
          this.timeline = [this.formatDiaryFromAV(response)].concat(this.timeline);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  formatDiaryFromAV(diary) {
    var newElement = diary.toJSON();
    newElement.viewTags = newElement.tags.join(', ');
    newElement.viewTime = moment(newElement.createdAt).format('LL');
    return newElement;
  }

  ngOnInit() {
    this.query.addDescending('createdAt');
    this.query.limit(10);
    this.query.find()
      .then(diaries => {
        this.zone.run(() => {
          Array.prototype.push.apply(this.timeline, diaries.map(this.formatDiaryFromAV));
        });
      });
  }
}