import SearchBox from "./components/SearchBox"

export default function Home() {
    return (
        <main className='min-h-screen bg-gray-100 pt-10'>
            <div className='container mx-auto px-4'>
                <SearchBox />
            </div>
        </main>
    )
}
