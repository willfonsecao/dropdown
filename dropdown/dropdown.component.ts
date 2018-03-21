import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
declare var $: any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

const noop = () => { };

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DropdownComponent {

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  active: boolean;

  @Input()
  options: any[] = [];

  @Input()
  displayAttribute: string;

  @Input()
  placeHolder: string = '';

  ngAfterViewChecked(){
    this.addValueOff();
  }

  addValueOff(){
    if (this.value != null && this.value != '') {
      let hasOnList: boolean = false;
      for (let i = 0; i < this.options.length; i++) {
          if(this.equalObjects(this.options[i], this.value)){
            hasOnList = true;
            break;
          }
      }
      if(!hasOnList){
        this.options.push(this.value);
      }
    }
  }

  closeFromInside() {
    $('.wrapper-dropdown')[0].className = $('.wrapper-dropdown')[0].className.replace('active', '');
  }

  selectOption(option) {
    this.value = option;
    this.closeFromInside();
  }

  selectPlaceHolder() {
    this.value = null;
    this.closeFromInside;
  }

  toggle() {
    this.active = !this.active;
  }

  displayValue() {
    if (this.value != null && this.value != '' && this.displayAttribute != null) {
      return this.value[this.displayAttribute];
    } else if (this.value != null && this.value != '' && (this.displayAttribute == null || this.displayAttribute == '')) {
      return this.value;
    } else {
      return this.placeHolder;
    }
  }

  equalObjects(object1: any, object2: any): boolean {
    let result: boolean = true;
    if (object1 && object2) {
      const keys1: string[] = Object.keys(object1);
      const keys2: string[] = Object.keys(object2);
      if (keys1.length === keys2.length) {
        keys1.forEach(key => {
          if (object1[key] instanceof Object) {
            if (!this.equalObjects(object1[key], object2[key])) {
              result = false;
              return;
            }
          } else if (object1[key] !== object2[key]) {
            result = false;
            return;
          }
        });
      } else {
        result = false;
      }
    } else if (object1 || object2) {
      result = false;
    }

    return result;
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

}
