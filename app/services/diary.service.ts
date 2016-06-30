/**
 * Created by gucheng on 6/30/16.
 */
import { Injectable } from '@angular/core';
import { Diary } from './diary.model';
import LeancloudConfig from '../leancloud-config';
import moment = require('moment');
const AV = require('leancloud-storage');
AV.init(LeancloudConfig);

const DiaryObject = AV.Object.extend('Diary');

@Injectable()
export class DiaryService {
  query = new AV.Query('Diary');

  diary = new DiaryObject();

  getDiaries() {
    this.query.addDescending('createdAt');
    this.query.limit(10);
    return this.query.find()
      .then(diaries => {
        return Promise.resolve(diaries.map(this.formatDiaryFromAV))
      });
  }

  createDiary(diary: Diary) {
    return this.diary.save(Object.assign({}, diary))
      .then(response => Promise.resolve(this.formatDiaryFromAV(response)))
      .catch(err => Promise.reject(err));
  }

  formatDiaryFromAV(diary) {
    var newElement = diary.toJSON();
    newElement.viewTags = newElement.tags.join(', ');
    newElement.viewTime = moment(newElement.createdAt).format('LL');
    return newElement;
  }
}