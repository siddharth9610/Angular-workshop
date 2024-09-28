export class GetAllCats {
    static readonly type = '[Cats] Get Cats';
    constructor(public payload: { limit: number }) {}
}

export class GetCatsByBreed {
    static readonly type = '[Cats By Breed] Get Filtered Cats';
    constructor(public payload: { limit: number, breeds: string[] }) {}
}