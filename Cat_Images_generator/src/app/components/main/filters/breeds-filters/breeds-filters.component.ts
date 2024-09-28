import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from 'src/app/models/breed.interface';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { Subject, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-breeds-filters',
  templateUrl: './breeds-filters.component.html',
  styleUrls: ['./breeds-filters.component.scss']
})
export class BreedsFiltersComponent {

  @ViewChild('select') select!: MatSelect;
  @Input() breeds!: Breed[];
  @Input() removeFilterEvent!: Observable<Breed[]>;

  filteredBreeds!: Breed[];
  filtersControl = new FormControl();
  breedsSelected: Breed[] = [];
  breedsSelectedIds: string[] = [];
  private destroy: Subject<boolean> = new Subject<boolean>();

  @Output() breedsEmit = new EventEmitter<Breed[]>();

  ngOnInit(): void {
    if(this.removeFilterEvent) {
      this.removeFilterEvent.pipe(takeUntil(this.destroy)).subscribe((res: Breed[]) => {
        this.breedsSelected = res;
        this.breedsEmit.emit(this.breedsSelected);
      })
    }
  }

  removeValue(): void {
    this.filtersControl.reset();
    if(this.breeds) {
      this.filteredBreeds = this.breeds;
    }
  }

  filterPredictions(): void {
    if(this.breeds) {
      this.filteredBreeds = this.breeds.filter((item: Breed) => item.name.toLowerCase().includes(this.filtersControl.value));
    }
  }

  selectAll(): void {
    this.breedsSelected.length = 0;
    this.removeValue();
    this.breedsEmit.emit(this.breedsSelected);
  }

  selectBreed(breed: Breed): void {
    const isValueSelected = this.isChecked(breed);
    if(!isValueSelected) {
      this.breedsSelected.push(this.filtersControl.value);
    } else {
      this.breedsSelected = this.breedsSelected.filter((el: Breed) => el.id !== breed.id);
    }
    this.removeValue();
    this.breedsEmit.emit(this.breedsSelected);
  }

  isChecked(breed: Breed): boolean {
    return !!this.breedsSelected.find((item: Breed) => item.id === breed.id);
  }

}
