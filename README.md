# dropdown
this is a full responsive dropdown for angular

# Example

```typescript
import { Component, OnInit } from '@angular/core';

let listA = [{id: 1, name: "Person1"},{id: 2, name: "Person2"},{id: 3, name: "Person3"},{id: 4, name: "Person4"},
{id: 5, name: "Person5"},{id: 6, name: "Person6"},{id: 7, name: "Person7"}];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  array: any[] = listA;
  selected: any;

  constructor() { }

  ngOnInit() {
  }

}
```

```html
<div class="col-md-4">
    <dropdown [placeHolder]="'Selecione...'" 
              [options]="array"
              [displayAttribute]="'name'"
              [(ngModel)]="selected">
    </dropdown>
</div>
```
![alt dropdown](https://image.ibb.co/fx6F5H/dropdown.jpg)


