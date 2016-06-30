/**
 * Created by gucheng on 1/28/16.
 */
import { Directive, ElementRef, Input, Output, HostListener } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
// import {isPropertyUpdated} from "@angular/forms";

@Directive({
  selector: '[contenteditableModel]'
})
export class ContenteditableModel implements OnChanges {
  @Input('contenteditableModel') model: string;
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: any;
  
  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes) {
    this.lastViewModel = this.model
    this.refreshView()
  }

  @HostListener('blur') onBlur() {
    var value = this.elRef.nativeElement.innerText;
    this.lastViewModel = value;
    this.update.emit(value);
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model
  }
}