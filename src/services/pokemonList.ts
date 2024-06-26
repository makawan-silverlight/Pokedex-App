import axios from "axios"
import { POKEMON_BASE_URL } from '@/utils/constant'
import { AxiosResponsePokemonList } from '@/interface/pokemonList'
import { handleResponse } from '@/utils/handleResponse'

export const pokemonListServices = {
    getPokemonList: async (limit?: number, offset?: number): Promise<AxiosResponsePokemonList> => {

        try {
            const response = await axios.get(`${POKEMON_BASE_URL}/pokemon?limit=${limit || 151}&offset=${offset || 0}`)
            return handleResponse.success(response)
        } catch (error: any) {
            return handleResponse.error(error)
        }

    },
}