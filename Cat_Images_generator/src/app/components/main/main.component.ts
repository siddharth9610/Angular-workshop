import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Cat, CatStateModel } from 'src/app/models/cat.interface';
import { Breed } from 'src/app/models/breed.interface';
import { CatState } from 'src/app/states/cat.state';
import { GetAllCats, GetCatsByBreed } from 'src/app/actions/cats.action';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit { 

  cats: Cat[] = [];
  limits: number[] = [10, 20, 40];
  limit = 10;
  breedsSelected: Breed[] | null = null;
  isLoading = false;
  @Select(CatState.selectStateData) cats$!: Observable<any>;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getAllCats();
  }

  setBreed(filters: Breed[]): void {
    this.breedsSelected = filters;
    this.getCatsImages();
  }

  allBreedsSelected(): void {
    this.breedsSelected = null;
    this.getAllCats();
  }

  setLimit(newLimit: number): void {
    this.limit = newLimit;
    this.getCatsImages();
  }

  getCatsImages(): void {
    this.breedsSelected ? this.getCatsByBreeds() : this.getAllCats();
  }

  getAllCats(): void {
    this.store.dispatch(new GetAllCats({ limit: this.limit }));
    this.cats$.pipe(takeUntil(this.destroy)).subscribe((data: CatStateModel) => {
      this.isLoading = data.isLoading;
      this.cats = data.cats;
    });
  }

  getCatsByBreeds() : void {
    if(this.breedsSelected) {
      const breedsSelectedIds = this.breedsSelected.map(el => el.id);
      this.store.dispatch(new GetCatsByBreed({ limit: this.limit, breeds: breedsSelectedIds }));
      this.cats$.pipe(takeUntil(this.destroy)).subscribe((data: CatStateModel) => {
        this.isLoading = data.isLoading;
        this.cats = data.cats;
      });
    }
  }
}
