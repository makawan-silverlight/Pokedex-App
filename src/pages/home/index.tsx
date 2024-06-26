import PokemonCard from "@/components/PokemonCard";
import SearchForm from "@/components/SearchForm";
import { usePokemonListStore } from '@/store/pokemonListStore'
import ReactLoading from 'react-loading';

function HomePage() {
  const { pokemon, fetchPokemon } = usePokemonListStore()
  return (
    <div className="w-full max-w-[1280px] mx-auto mt-32">
      <SearchForm />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 p-8 border-2 border-blue-900 rounded-xl ">
        {pokemon.data.map((pokemonDetail, index) => {
          return <PokemonCard key={`${pokemonDetail.name}-Card-${index}`} detail={pokemonDetail} />
        })}
        {fetchPokemon.loading &&
          (<div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 m-auto py-20 h-[600px]">
            <ReactLoading type={"bubbles"} color={"#172554"} height={50} width={100} />
          </div>)}
      </section>
    </div>
  )
}

export default HomePage