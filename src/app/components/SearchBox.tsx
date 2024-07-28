"use client"
import React, { FC, FormEvent, useEffect, useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { keyword as action } from "../core/action"
import { useFormState, useFormStatus } from "react-dom"
import ImageGrid from "@/app/components/ImageGrid"
import { templates } from "@/app/templates/index"

type Categories = "Posts" | "Stories"

const initialState = {
    data: {
        titles: [],
        images: [],
    },
    error:""
}

const SearchBox: FC = () => {
    const [selectedCategory, setSelectedCategory] =
        useState<Categories>("Posts")
    const [isOpen, setIsOpen] = useState(false)

    const [state, formAction] = useFormState(action, initialState)

    useEffect(() => {
      if(state.error) alert(state.error)
    }, [state])
    

    return (
        <form action={formAction}>
            <div className='max-w-3xl mx-auto space-y-4'>
                <div className='flex rounded-md shadow-sm'>
                    {/* Dropdown */}
                    <div className='relative inline-block text-left'>
                        <div>
                            <button
                                type='button'
                                className='inline-flex justify-center items-center w-40 rounded-l-md border border-gray-300 shadow-sm px-4 h-14 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {selectedCategory}
                                <ChevronDown
                                    className='ml-2 h-5 w-5'
                                    aria-hidden='true'
                                />
                            </button>
                        </div>

                        {isOpen && (
                            <div className='z-10 origin-top-right absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                                <div
                                    className='py-1'
                                    role='menu'
                                    aria-orientation='vertical'
                                    aria-labelledby='options-menu'
                                >
                                    {["Posts", "Stories"].map((category) => (
                                        <a
                                            key={category}
                                            href='#'
                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            role='menuitem'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setSelectedCategory(
                                                    category as Categories,
                                                )
                                                setIsOpen(false)
                                            }}
                                        >
                                            {category}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className='relative flex-grow focus-within:z-10'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <Search
                                className='h-6 w-6 text-gray-400'
                                aria-hidden='true'
                            />
                        </div>
                        <input
                            type='text'
                            name='search'
                            id='search'
                            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md pl-12 text-lg border-gray-300 h-14'
                            placeholder='Search'
                            autoComplete='off'
                        />
                        <input type='submit' hidden />
                    </div>
                </div>
            </div>

            <ImageGrid
                templates={templates[selectedCategory]}
                data={state.data}
            />
        </form>
    )
}

export default SearchBox
