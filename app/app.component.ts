/**
 * Created by gucheng on 1/21/16.
 */
import {Component} from 'angular2/core'
import {ContenteditableModel} from "./shared/directives/contenteditable-model";
import {TagInput} from './shared/components/tag-input';
import LeancloudConfig from './leancloud-config'

declare var AV:any;

AV.initialize(LeancloudConfig.AppId, LeancloudConfig.AppKey);

const Diary = AV.Object.extend('Diary');

@Component({
  selector: 'diary',
  templateUrl: 'app/app.html',
  directives: [ContenteditableModel, TagInput]
})

export class AppComponent {
  public title = 'Journal';

  public content = '';

  diary = new Diary();

  submit() {
    if (!this.content) {
      console.log('content-empty');
      return;
    }
    this.diary.save({
        pub_timestamp: new Date(),
        content: this.content
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}