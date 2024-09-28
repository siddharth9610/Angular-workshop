import { Component, computed, inject, Input, input } from '@angular/core';
import { calculateResult } from '../header/calculate-results.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {

  private InvestmentService = inject(InvestmentService)

  results = computed(() => this.InvestmentService.resultsData());
}

