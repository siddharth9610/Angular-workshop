export interface CatBreed {
    name: string;
    description: string;
}

export interface Cat {
    id: string;
    url: string;
    breeds: CatBreed[];
}

export interface CatStateModel {
    cats: Cat[];
    isLoading: boolean;
}