/**
 * Created by gucheng on 1/21/16.
 */
import {Component} from 'angular2/core'
import {ContenteditableModel} from "./shared/directives/contenteditable-model";
import {TagInput} from './shared/components/tag-input'
import LeancloudConfig from './leancloud-config'
import {ToastService} from './shared/services/toast'
import moment = require("moment");

declare var AV: any;

AV.initialize(LeancloudConfig.AppId, LeancloudConfig.AppKey);

const Diary = AV.Object.extend('Diary');

moment.locale('zh-cn');

@Component({
  selector: 'diary',
  templateUrl: 'app/app.html',
  directives: [ContenteditableModel, TagInput],
  providers: [ToastService]
})

export class AppComponent {
  public title = 'Journal';

  public tags = [];

  public content = '';

  public timeline: Object[];

  diary = new Diary();

  query = new AV.Query('Diary');

  constructor(private ToastService: ToastService) {
    this.query.addDescending('createdAt');
    this.query.limit(10);
    this.query.find()
      .then((diaries) => {
        this.timeline = diaries.map(this.formatDiaryFromAV);
      });
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
        this.timeline = [this.formatDiaryFromAV(response)].concat(this.timeline);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  formatDiaryFromAV(diary) {
    var newElement = diary.toJSON();
    newElement.viewTags = newElement.tags.join(', ');
    newElement.viewTime = moment(newElement.createdAt).format('LL');
    return newElement;
  }
}