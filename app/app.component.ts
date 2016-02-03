/**
 * Created by gucheng on 1/21/16.
 */
import {Component} from 'angular2/core'
import {ContenteditableModel} from "./shared/directives/contenteditable-model";
import {TagInput} from './shared/components/tag-input'
import LeancloudConfig from './leancloud-config'
import {ToastService} from './shared/services/toast'

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

  public timeline: [{}];

  diary = new Diary();

  query = new AV.Query('Diary');

  constructor(private ToastService: ToastService) {
    this.query.addDescending('createdAt');
    this.query.limit(10);
    this.query.find()
      .then((diaries) => {
        this.timeline = diaries.map(function(element) {
          var newElement = element.toJSON();
          newElement.viewTags = newElement.tags.join('，');
          newElement.viewTime = moment(newElement.createAt).format('LL');
          return newElement;
        });
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
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}