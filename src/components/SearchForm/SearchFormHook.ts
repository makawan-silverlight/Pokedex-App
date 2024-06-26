import { useEffect } from "react"
import { pokemonListServices, pokemonDetailServices } from '@/services'
import { generationList } from '@/utils/optionList'
import { usePokemonListStore } from '@/store/pokemonListStore'
import { useForm } from "react-hook-form";
import { pokemonDetailData } from "@/interface/pokemonDetail";
const useSearchForm = () => {

    const { register, watch, } = useForm()
    const { setFetchPokemonList, setPokemonList, fetchPokemon } = usePokemonListStore()
    const pokemonName = watch("pokemonName")
    const generation = watch("generation")
    const type = watch("type")
    const sort = watch("sort")

    async function callData(limit: number | undefined, offset: number | undefined) {
        const pokemonListResponse = await pokemonListServices.getPokemonList(limit, offset);
        // console.log(pokemonListResponse.data.results);
        const pokemonListArray = [];
        setFetchPokemonList({
            data: [],
            loading: true,
            error: null,
        })
        if (pokemonListResponse.status === 200) {
            const pokemonListResults = pokemonListResponse.data?.results || [];
            let indexResult = 0;
            for (const pokemon of pokemonListResults) {
                if (indexResult % 20 == 0) {
                    setFetchPokemonList({
                        data: pokemonListArray,
                        loading: true,
                        error: null,
                    })
                    const filterSearch = filterPokemon(pokemonListArray, pokemonName, type, sort)
                    setPokemonList({
                        data: filterSearch,
                        loading: true,
                        error: null,
                    })
                }
                const pokemonDetailResponse = await pokemonDetailServices.getPokemonDetail(pokemon.name);
                const pokemonDetail = pokemonDetailResponse.data
                pokemonListArray.push({ ...pokemonDetail, image: pokemonDetail.sprites.other["official-artwork"].front_default })
                indexResult++;
            }

            setFetchPokemonList({
                data: pokemonListArray,
                loading: false,
                error: null,
            })
            const filterSearch = filterPokemon(pokemonListArray, pokemonName, type, sort)
            setPokemonList({
                data: filterSearch,
                loading: false,
                error: null,
            })


        } else {
            setFetchPokemonList({
                data: [],
                loading: false,
                error: pokemonListResponse.error || null,
            })
        }

    }

    function filterPokemon(data: pokemonDetailData[], pokemonName: string, type: string, sort: "id" | "name") {
        const typeFilter = type !== "all types"? (data.filter((pokemonData) => {
            return pokemonData.types.find((pokemonType) => {
            return pokemonType.type.name.toLowerCase().includes(type)
        }) })) : data
        
        const sortPokemon = sortBy(sort,typeFilter);
        const searchFilter = sortPokemon.filter((item) => item.name.toLocaleLowerCase().includes(pokemonName?.toLocaleLowerCase()))

        return searchFilter
    }

    function sortBy(sort:"id" | "name",data:pokemonDetailData[]){
        switch (sort) {
            case "id":
                return data.sort((a,b) => a.id-b.id);
            case "name":
                return data.sort((a,b) => a.name > b.name? 1: a.name < b.name? -1:0)
            default: return data.sort((a,b) => a.id-b.id)
        }
    }
    useEffect(() => {
        if(generation !== undefined){
            const { limit, offset } = generationList[generation ? generation : 0];
            callData(limit, offset);
            
        }
    }, [generation])


    useEffect(() => {

        const filterSearch = filterPokemon(fetchPokemon.data, pokemonName, type, sort)
        setPokemonList({
            data: filterSearch,
            loading: false,
            error: null
        });

    }, [pokemonName, type,sort])

    return {
        fieldPokemonName: register("pokemonName"),
        fieldGeneration: register("generation"),
        fieldType: register("type"),
        fieldSort: register("sort")
    }
}

export { useSearchForm }