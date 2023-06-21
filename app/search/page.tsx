import getSongsByTitle from "@/actions/getSongsByTitle";
import { Header } from "@/components/Header";
import { SearchContent } from "@/app/search/components/SearchContent";
import { SearchInput } from "@/components/SearchInput";
// import { revalidate } from '../liked/page';

interface SearchProps {
    searchParams: {
        title: string;
    }
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title)

    return (
        <div
            className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
            "
        >
            <Header
                className="from-bg-neutral-900"
            >
                <div className="mb-2 flex-col gap-x-6">
                    <h1 className="
                        text-white 
                        text-2xl
                        font-semibold
                        "
                    >Search</h1>

                    <SearchInput />
                </div>
            </Header>
            <SearchContent
                songs={songs}
            />
        </div>
    )
}

export default Search
