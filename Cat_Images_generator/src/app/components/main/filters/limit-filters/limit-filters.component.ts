import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-limit-filters',
  templateUrl: './limit-filters.component.html',
  styleUrls: ['./limit-filters.component.scss']
})
export class LimitFiltersComponent {

  @Input() limits!: number[];
  limitControl = new FormControl(10);

  @Output() limitSelected = new EventEmitter<number>();

  selectLimit(): void {
    this.limitSelected.emit(this.limitControl.value ? this.limitControl.value : 10);
  }
}
