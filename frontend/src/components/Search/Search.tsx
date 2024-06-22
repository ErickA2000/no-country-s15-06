import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { FaBell } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { GoBell } from 'react-icons/go';

type SearchProps = {};

export const Search: React.FC<SearchProps> = () => {
  return (
    <div className="hidden md:flex border-b py-5 lg:justify-end gap-5">
      <div className='hidden md:flex border rounded-2xl shadow-lg w-[675px] items-center gap-4 ml-4 border-[#175F70] text-[#175F70] bg-[#E7ECF4] '>
        <CiSearch className='ml-10' />
        <input
          placeholder="Buscador"
          className="bg-[#E7ECF4]"
        />
      </div>
      <div className='h-full flex justify-center items-center'>
        <div className="hidden md:flex items-center rounded-full relative bg-[#175F70] justify-center w-8 h-8 ml-8">
          <GoBell className='absolute top-2 left-2 text-white' />
        </div>
      </div>
      <div>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          size="sm"
          className='shadow-grey hidden md:flex'
        />
      </div>
    </div>
  );
};


