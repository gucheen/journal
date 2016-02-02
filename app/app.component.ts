/**
 * Created by gucheng on 1/21/16.
 */
import {Component} from 'angular2/core'
import {ContenteditableModel} from "./shared/directives/contenteditable-model";
import {TagInput} from './shared/components/tag-input'
import LeancloudConfig from './leancloud-config'
import {ToastService} from './shared/services/toast'

declare var AV:any;

AV.initialize(LeancloudConfig.AppId, LeancloudConfig.AppKey);

const Diary = AV.Object.extend('Diary');

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

  diary = new Diary();
  
  constructor(private ToastService: ToastService) {
    
  }

  submit() {
    // if (!this.content) {
    //   console.log('content-empty');
    //   return;
    // }
    
    this.ToastService.show('保存成功');
    
    // this.diary.save({
    //     pub_timestamp: new Date(),
    //     content: this.content,
    //     tags: this.tags
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  };
}