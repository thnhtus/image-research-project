import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Input from 'rc-input';
import { SearchIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from '../../hooks';
import { getRandomPhoto, searchPhotos } from '../../slices/app';
import TopBar from '../../components/topBar';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [defaultPage, setDefaultPage] = useState<number>(1);
  const [defaultPerPage, setDefaultPerPage] = useState<number>(20);
  const [query, setQuery] = useState<string>('');

  const { randomPhoto, searchResults, searchLoading } = useSelector(
    (state) => state.app,
  );

  const getPhoto = useCallback(() => {
    dispatch(getRandomPhoto());
  }, [dispatch]);

  const handleSearchPhotos = useCallback(() => {
    dispatch(
      searchPhotos({
        query,
        page: defaultPage,
        perPage: defaultPerPage,
      }),
    );
  }, [dispatch, defaultPage, defaultPerPage, query]);

  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  return (
    <>
      <TopBar />
      <div className="w-full flex">
        <div className="w-2/4 flex flex-col justify-center m-10">
          <div className="">
            <h1 className="text-6xl font-serif font-semibold w-3/4">
              Images Research Project
            </h1>
            <div className="mt-10 text-2xl">
              <p>The internet&apos;s source of freely-usable images.</p>
              <p>
                Base on{' '}
                <a
                  className="font-semibold hover:underline"
                  href="https://unsplash.com/developers"
                >
                  Unsplash API.
                </a>
              </p>
            </div>
          </div>
          <div className="group bg-white mt-40">
            <div className="w-full flex content-center justify-start">
              <label
                htmlFor="search-input"
                className="flex items-center px-3 border border-r-0 rounded-l-lg"
              >
                <SearchIcon className="h-6 w-6 text-gray-400" />
              </label>
              <Input
                className="w-full h-14 pr-3 border border-l-0 rounded-r-lg focus:outline-none"
                type="text"
                id="search-input"
                placeholder="Search images..."
                onChange={(e) => setQuery(e.target.value)}
                onPressEnter={handleSearchPhotos}
                // allowClear
              />
            </div>
          </div>
        </div>
        <motion.div
          className="relative w-2/4 m-10 rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // transition={{ duration: 0.1 }}
        >
          <img src={randomPhoto?.urls?.full} alt={randomPhoto?.blur_hash} />
          {/* <img
            src="https://images.unsplash.com/photo-1652607461776-df92f9da165f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjk1NjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTMyOTk3Njg&ixlib=rb-1.2.1&q=80"
            alt=""
          /> */}
          <div className="absolute bottom-10 w-full px-20">
            <div className="h-16 w-full text-white rounded bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-3/4 flex flex-row justify-around items-center">
                <p className="font-semibold">Random photo</p>
                <p>|</p>
                <p>
                  <span className="italic text-slate-200">made by</span>{' '}
                  <span className="font-semibold">
                    {randomPhoto?.user?.name}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {searchLoading ? (
        <div>Loading</div>
      ) : (
        <div className="w-full my-10 px-10">
          {searchResults ? (
            <div className="w-full grid grid-cols-4 gap-7">
              {searchResults?.results?.map((item) => (
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    className="object-cover h-full"
                    src={item?.urls?.regular}
                    alt={item?.blur_hash}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div>Error</div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
