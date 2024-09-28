import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cat } from 'src/app/models/cat.interface';
import { CatDialogComponent } from '../cat-dialog/cat-dialog.component';

@Component({
  selector: 'app-cats-card',
  templateUrl: './cats-card.component.html',
  styleUrls: ['./cats-card.component.scss']
})
export class CatsCardComponent {

  @Input() cat!: Cat;

  constructor(public dialog: MatDialog) {}

  openCardDialog(): void {
    this.dialog.open(CatDialogComponent, {
      panelClass: 'cat-dialog',
      data: {
        cat: this.cat
      }
    });
  }
  
}
