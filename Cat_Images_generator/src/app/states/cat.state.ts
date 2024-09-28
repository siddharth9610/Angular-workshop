import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { CatsService } from "../services/cats.service";
import { CatStateModel } from "../models/cat.interface";
import { GetAllCats, GetCatsByBreed } from "../actions/cats.action";

@State<CatStateModel>({
    name: 'catstate',
    defaults: {
        cats: [],
        isLoading: false
    }
})

@Injectable()
export class CatState {

    constructor(private catsService: CatsService) { }

    @Selector()
    static selectStateData(state: CatStateModel): CatStateModel {
        return { cats: state.cats, isLoading: state.isLoading };
    }

    @Action(GetAllCats)
    getAllCatsList(ctx: StateContext<CatStateModel>, action: GetAllCats) {
        const { limit } = action.payload;
        ctx.patchState({ isLoading: true });
        return this.catsService.getAllCats(limit).pipe(tap(data => {
            ctx.patchState({ cats: data, isLoading : false});
        }))
    }

    @Action(GetCatsByBreed)
    getCatsByBreedList(ctx: StateContext<CatStateModel>, action: GetCatsByBreed) {
        const { limit, breeds } = action.payload;
        ctx.patchState({ isLoading: true });
        return this.catsService.getCatsByBreeds(limit, breeds).pipe(tap(data => {
            ctx.patchState({ cats: data, isLoading : false});
        }))
    }
}