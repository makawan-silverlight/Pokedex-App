import { generationList, typesList, sortList } from '@/utils/optionList'
import { useSearchForm } from '@/components/SearchForm'

function SearchForm() {
    const { fieldPokemonName,fieldGeneration,fieldSort,fieldType } = useSearchForm();

    return (
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 lg:px-0">
            <div>
                <label htmlFor="generation" className="block mb-2 text-md font-semibold text-blue-900 dark:text-white">GENERATION</label>
                <select {...fieldGeneration} id="generation" className="bg-gray-50 border capitalize cursor-pointer border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                    {generationList.map((item, index) => {
                        return <option className='capitalize' key={`generation-key-${index}`} value={index}>{item.name}</option>
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="type" className="block mb-2 text-md font-semibold text-blue-900 dark:text-white">TYPE</label>
                <select {...fieldType} id="type" className="bg-gray-50 border capitalize cursor-pointer border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                    {typesList.map((item) => {
                        return <option className='capitalize' key={`type-key-${item}`} value={item}>{item}</option>
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="sortBy" className="block mb-2 text-md font-semibold text-blue-900 dark:text-white">SORT BY</label>
                <select {...fieldSort} id="sortBy" className="bg-gray-50 border capitalize cursor-pointer border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                    {sortList.map((item) => {
                        return <option className='capitalize' key={`sort-key-${item}`} value={item}>{item}</option>
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="generation" className="block mb-2 text-md font-semibold text-blue-900 dark:text-white">SEARCH</label>
                <input {...fieldPokemonName} placeholder='Search Pokemon name' id="generation" className="bg-gray-50 border border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" />
            </div>

        </form>
    )
}

export default SearchForm