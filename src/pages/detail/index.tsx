import { pokemonDetailData } from "@/interface/pokemonDetail";
import { pokemonDetailServices } from "@/services";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

function DetailPage() {
  const { pokemonname } = useParams()
  const [pokemon, setPokemon] = useState<pokemonType>(
    {
      data: null,
      loading: false,
      error: null,
    }
  );

  type pokemonType = {
    data: pokemonDetailData | null,
    loading: boolean
    error: null | any
  }

  async function callData(name: string) {
    const pokemonDetailResponse = await pokemonDetailServices.getPokemonDetail(name);
    const pokemonDetail = pokemonDetailResponse.data
    console.log(pokemonDetail);
    if (pokemonDetailResponse.status === 200) {
      setPokemon(
        {
          data: { ...pokemonDetail, image: pokemonDetail.sprites.other.dream_world.front_default || pokemonDetail.sprites.other["official-artwork"].front_default },
          loading: false,
          error: null,
        }
      )
    } else {
      setPokemon({
        data: null,
        loading: false,
        error: pokemonDetailResponse.error || null,
      })
    }

  }

  useEffect(() => {
    if (pokemonname) {
      callData(pokemonname);
    }

  }, [pokemonname])

  const id = pokemon.data?.id || 0
  const weight = pokemon.data?.weight || 0
  const height = pokemon.data?.height || 0

  return (
    <>
      <Link to="/" className="absolute z-20 top-8 left-8 text-blue-950 hover:text-white hover:bg-blue-950 hover:border-white border-2 border-blue-950 text-xl font-bold px-4 py-2 bg-white rounded-full duration-300">{"<- Back"}</Link>
      <div className={`badge-type-${pokemon.data?.types[0].type.name} lg:h-screen lg:overflow-hidden`}>
        <div className="w-full max-w-[1280px] mx-auto pt-36 relative z-0 flex flex-col justify-center items-center">
          <div className="w-full flex lg:flex-row flex-col-reverse justify-center items-center lg:justify-between">
            <div className={`text-type-${pokemon.data?.types[0].type.name} w-[90%] lg:w-1/2 flex flex-col gap-8 justify-center items-center mb-20 mt-10 lg:mt-0 lg:mb-0`}>

              <div className="text-8xl font-black capitalize">{pokemon.data?.name}</div>

              <div className="flex w-3/4 justify-between items-center">
                <p className="font-bold text-2xl flex flex-col items-center">{(weight / 10).toFixed(2)}KG<span className="text-base opacity-40 font-medium">WEIGHT</span></p>
                <p className="font-bold text-2xl flex flex-col items-center justify-center border-r-2 border-l-2 px-12 h-full">{(height / 10).toFixed(2)}M<span className="text-base opacity-40 font-medium">HEIGHT</span></p>
                <div className="flex flex-col gap-2 ">
                  {pokemon.data?.types.map((item) => {
                    return <div key={item.type.name} className="font-bold text-lg text-center capitalize py-2 px-4 bg-[#ffffff80] rounded-lg ">{item.type.name}</div>
                  })}
                </div>
              </div>

              <h2 className="font-bold uppercase mt-8">Stats</h2>

              <div className="w-[85%] space-y-4">
                {pokemon.data?.stats.map((stat, index) => {
                  return <div className="flex justify-between items-center w-full" key={stat.stat.name + index}>
                    <h3 className="w-[27%] font-bold uppercase">{stat.stat.name}</h3>
                    <div className="w-[50%] h-2 bg-[#00000030] rounded-xl"><div style={{ width: `${stat.base_stat > 200 ? 100 : stat.base_stat / 2}%` }} className="h-full bg-white rounded-xl"></div></div>
                    <p className="font-bold w-7 text-right">{stat.base_stat}</p>
                  </div>
                })}
                <div className="flex w-full justify-between items-end">
                  <h2 className="font-bold uppercase">abilities</h2>
                  <div className="flex gap-4">{pokemon.data?.abilities.map((ability) => {
                    return <div key={ability.ability.name} className="font-bold text-base text-center capitalize py-2 px-4 bg-[#ffffff80] rounded-lg">{ability.ability.name}</div>
                  })}</div>
                  <img className="h-16" src={pokemon.data?.sprites.other.showdown.front_default} alt="pokemon gif" />
                </div>
              </div>
            </div>

            <div className="w-[90%] lg:w-1/2 flex flex-col justify-center items-center ">
              <div className="w-full text-[200px] font-bold text-center opacity-10 -mt-16">#{id < 10 ? "00" : id < 100 ? "0" : ""}{id}</div>
              <img className="w-2/3 max-h-[450px]" src={pokemon.data?.image} alt="Pokemon image" />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPage