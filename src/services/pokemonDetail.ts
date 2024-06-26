import axios from "axios"
import { POKEMON_BASE_URL } from '@/utils/constant'
import { AxiosResponsePokemonDetail } from '@/interface/pokemonDetail'
import { handleResponse } from '@/utils/handleResponse'


export const pokemonDetailServices = {
    getPokemonDetail: async (name:string): Promise<AxiosResponsePokemonDetail> => {
        try {
            const response = await axios.get(`${POKEMON_BASE_URL}/pokemon/${name}`)
            return handleResponse.success(response)
        } catch (error: any) {
            return handleResponse.error(error)
        }
    },
}