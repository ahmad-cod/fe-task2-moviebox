import MovieSidebar from '@/components/MovieSidebar';
import SimilarMovies from '@/components/SimilarMovies';
import { fetchMovieById } from '@/http/tmdbAPI';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'



async function getMovie(id: number) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        }
    };

    return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
}
const intToString = (nums: number) => {
    let num = nums.toString().replace(/[^0-9.]/g, '');
    if (nums < 1000) {
        return num;
    }
    let si = [
        { v: 1E3, s: "K" },
        { v: 1E6, s: "M" },
        { v: 1E9, s: "B" },
        { v: 1E12, s: "T" },
        { v: 1E15, s: "P" },
        { v: 1E18, s: "E" }
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (nums >= si[index].v) {
            break;
        }
    }
    return (nums / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
};
const Movie = async ({ params }: { params: { id: number } }) => {
    const movie = await fetchMovieById(params.id)

    return (
        <section className='flex'>
            <MovieSidebar />
            <div className='flex sm:ml-[220px] flex-col flex-1 p-2 xl:p-9'>
                <div>

                    <div className='relative object-cover object-center h-[300px] lg:h-[550px] xl:h-[600px] inset-0'>
                        <Image sizes="(min-width: 808px) 50vw, 100vw" layout='fill' objectFit='fill' src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`} className=' block rounded-md lg:rounded-[10px] object-fill object-center h-full' alt='movie preview' />
                        <button className='absolute outline-none rounded-full flex justify-center items-center w-[65px] h-[65px] md:w-[80px] md:h-[80px] xl:w-[110px] bg-[#ffffff59] xl:h-[110px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                            <Image src='/play.png' className='w-[30px] md:w-[40px] xl:w-[54px]' width={54} height={54} alt='play' />
                        </button>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-4 p-2 lg:p-4'>
                        <h1 className='text-lg xl:text-3xl font-medium flex gap-2'>
                            <span data-testid='movie-title'>{movie.title}</span>
                            •
                            <span data-testid='movie-release-date'>{movie.release_date.split('-')[0]}</span>
                            • PG-13 •
                            <span data-testid='movie-runtime'>{movie.runtime}m</span>
                        </h1>
                        <div className='flex flex-col-reverse gap-2 sm:flex-row justify-between items-start flex-1'>
                            <div className='flex gap-2 xl:gap-4 w-[72%] flex-wrap'>
                                {
                                    movie.genres.map((genre: { id: number, name: string }) => (
                                        <small key={genre.id} className='text-[#B91C1C] rounded-[15px] border border-[#F8E7EB] w-[70px] h-[25px] md:w-[84px] md:h-[30px] flex justify-center items-center'>{genre.name}</small>
                                    ))
                                }
                            </div>
                            <div className='flex items-center justify-end gap-2'>
                                <Image src='/Star.png' width={30} height={30} alt='star' />
                                <p className='text-sm lg:text-base'>{Math.round(movie.vote_average * 10) / 10} | {intToString(movie.vote_count)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col xl:flex-row w-full px-4 gap-x-3'>
                        <div className='flex flex-col gap-y-3 xl:gap-y-6 w-full xl:w-2/3 pt-0 xl:pt-5'>
                            <div>
                                <p data-testid='movie-overview' className='text-[#333] text-l text-base xl:text-[20px] font-normal'>{movie.overview}</p>
                            </div>
                            <div className='flex flex-col gap-y-3 xl:gap-y-7'>
                                <div className='text-base xl:text-[20px] gap-4 flex'>
                                    <span>Director:</span>
                                    <span className='text-[#BE123C]'>Joseph Kosinski</span>
                                </div>
                                <div className='text-base xl:text-[20px] gap-4 flex'>
                                    <span>Writers:</span>
                                    <span className='text-[#BE123C]'>Jim Cash, Jack Epps Jr, Peter Craig</span>
                                </div>
                                <div className='text-base xl:text-[20px] gap-4 flex'>
                                    <span>Stars:</span>
                                    <span className='text-[#BE123C]'>Tom Cruise, Jennifer Connelly, Miles Teller</span>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row rounded-xl border border-[#C7C7C7]'>
                                <button className='flex items-center justify-center bg-rose-700 bg-rose-medium gap-2 px-5 py-[8px] rounded-[6px] text-base xl:text-[20px] font-medium text-white'>
                                    <span>Top rated movie #65</span>
                                </button>
                                <div className='flex flex-1 items-center justify-between p-2'>
                                    <p className='text-[#333] text-base xl:text-[20px] font-normal'>Awards
                                        9 nominations</p>
                                    <Image src='/arrow-down.png' alt='arrow' width={30} height={30} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-6 flex-1 pt-5'>
                            <div className='flex flex-col gap-3 justify-center'>
                                <button className='flex items-center justify-center bg-rose-700 gap-1 px-5 py-[8px] rounded-[6px] text-base xl:text-[20px] font-medium text-white'>
                                    <Image src='/ticket.png' alt='ticket' width={25} height={25} />
                                    <span>See Showtimes</span>
                                </button>
                                <button className='flex items-center justify-center bg-[#BE123C1A] border border-[#BE123C] gap-1 px-5 py-[8px] rounded-[6px] text-base xl:text-[20px] font-medium text-white'>
                                    <Image src='/list.png' alt='list' width={23} height={23} />
                                    <span className='text-[#333]'>More watch options</span>
                                </button>
                            </div>
                            <SimilarMovies id={params.id} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Movie