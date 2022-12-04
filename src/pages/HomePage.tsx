import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const debounced = useDebounce(search)
    const {data, isError, isLoading} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true,
    })
    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    },[debounced, data]);

    function clickHandler(username: string) {
        fetchRepos(username)
        setDropdown(false )
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-y-scroll'>
            { isError && <p className='text-center text-red-600'>Something wrong...</p>}

            <div className='relative w-[560px]'>
                <input
                    type="text"
                    className='border py-2 px-4 w-full h-[42px] md-2 mb-2'
                    placeholder='Search for Github username...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {dropdown && <ul className=' list one absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'>
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {data?.map(user => (
                        <li
                            key={user.id}
                            className={'py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'}
                            onClick={() => clickHandler(user.login)}

                        >
                            {user.login}
                        </li>
                    ))}
                </ul>}
                <div className="container">
                    {areReposLoading && <p className='text-center'>Repos are loading...</p>}
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
                </div>
            </div>
        </div>
    );
};

export default HomePage;