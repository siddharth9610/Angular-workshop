import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetBreeds } from "../actions/breeds.action";
import { tap } from 'rxjs/operators';
import { CatsService } from "../services/cats.service";
import { BreedStateModel } from "../models/breed.interface";

@State<BreedStateModel>({
    name: 'breedstate',
    defaults: {
        breeds: []
    }
})

@Injectable()
export class BreedState {

    constructor(private catsService: CatsService) { }

    @Selector()
    static selectStateData(state: BreedStateModel){
        return state.breeds;
    }

    @Action(GetBreeds)
    getBreedsList(ctx: StateContext<BreedStateModel>) {
        return this.catsService.getBreeds().pipe(tap(data => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                breeds: data
            })
        }))
    }
}