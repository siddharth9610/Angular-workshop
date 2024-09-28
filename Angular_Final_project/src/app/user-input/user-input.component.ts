import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestimentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  ValorInicialInserido: string = '0';
  InvestimentoAnualInserido: string = '0';
  RetornoAnualEsperado: string = '5';
  DuracaoInserida: string = '10';

  constructor(private InvestmentService: InvestmentService){

  }

  onSubmit(){
    this.InvestmentService.calculateInvestmentResults({
      initialInvestment: +this.ValorInicialInserido,
      annualInvestment: +this.InvestimentoAnualInserido,
      duration: +this.DuracaoInserida,
      expectedReturn: +this.RetornoAnualEsperado
    });
  }
  
}
