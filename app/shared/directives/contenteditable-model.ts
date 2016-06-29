/**
 * Created by gucheng on 1/28/16.
 */
import {Directive, ElementRef, Input, Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {OnChanges} from "@angular/core";
// import {isPropertyUpdated} from "@angular/src/common/forms/directives/shared";

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()'
  }
})
export class ContenteditableModel implements OnChanges {
  @Input('contenteditableModel') model: any;
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: any;


  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes) {
    this.lastViewModel = this.model
    this.refreshView()
  }

  onBlur() {
    var value = this.elRef.nativeElement.innerText
    this.lastViewModel = value
    this.update.emit(value)
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model
  }
}