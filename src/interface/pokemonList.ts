import { AxiosError, AxiosResponse } from "axios"

export interface AxiosResponsePokemonList {
    status: number|undefined
    data?:pokemonListData
    error?: AxiosError<AxiosResponse<any, any>, any> | AxiosResponse<AxiosResponse<any, any>, any> | undefined
}

export interface pokemonListData {
    count: number
    next: string
    previous: null
    results: pokemonListResult[]
}

export interface pokemonListResult {
    name: string
    url: string
}