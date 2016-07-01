/**
 * Created by gucheng on 2/1/16.
 */
import { Component, ElementRef, Input, HostListener } from '@angular/core';

@Component({
  selector: 'tagInput',
  template: `
    <div class="taginputContainer">
      <ul>
        <li
         *ngFor="let tag of tags"
         [attr.data]="tag">
          {{tag}}
          <a (click)="removeTag(tag)" href="#">x</a>
         </li>
      </ul>
      <input type="text" placeholder="Tags" [(ngModel)]="currentInput">
    </div>
  `
})

export class TagInput {
  @Input('tags') tags: string[];

  private view = {
    input: null
  };

  private currentInput: string;

  constructor(el: ElementRef) {
  }

  @HostListener('keyup.enter') onEnterKeyUp() {
    if (this.currentInput) {
      this.addTag(this.currentInput);
      return false;
    }
  }

  @HostListener('keydown.backspace') onBackspaceKeyDown() {
    if (this.currentInput.length === 0 && this.tags.length) {
      this.tags.pop();
      return false;
    }
  }

  private addTag(tag) {
    if (this.tags.indexOf(tag) !== -1) {
      return;
    }

    this.tags.push(tag);

    this.currentInput = '';
  }

  private removeTag(tag) {
    var i = this.tags.indexOf(tag)
    if (i === -1) {
      return;
    }

    this.tags.splice(i, 1)
  }
}