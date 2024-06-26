import {pokemonDetailData} from '@/interface/pokemonDetail'
import pokeball from '@/assets/Pokeball.png'
import { Link } from 'react-router-dom';
function PokemonCard(props:{detail:pokemonDetailData} ) {
    const { detail } = props
    const {name,id,types,image} = detail
    const typeStyle = types[0].type.name;
    return (
        <Link to={`/detail/${name}`} className={`cursor-pointer hover:scale-[1.03] duration-300 p-4 rounded-lg bg-white mx-auto sm:mx-0 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.15)] max-w-[285px] overflow-hidden relative z-0`} >
            <div className={`badge-type-${typeStyle} h-56 w-full flex justify-center items-center rounded-lg `}>
                <img className='max-h-36 object-cover' src={image} alt="pokemon image" />
                <img className='absolute -bottom-16 -right-24 h-64 object-cover -z-10 opacity-5'  src={pokeball} alt="pokeball-png" />
            </div>
            <div className='flex justify-between items-end mt-4'>
                <div className='flex flex-col'>
                    <span className='font-extrabold text-2xl opacity-20'>#{id<10?"00":id<100?"0":""}{id}</span>
                    <h1 className='font-extrabold text-2xl capitalize text-blue-900'>{name}</h1>
                </div>
                <div className='flex flex-col gap-1 items-end'>
                    {types.map((items) => {
                        const type = items.type.name;
                        return <div className={`badge-type-${type} text-sm font-bold text-white capitalize px-4 py-1 rounded-md`} key={`type-${type}`}>{type}</div>
                    })}
                </div>
            </div>
        </Link>
    )
}

export default PokemonCard