import React from 'react'
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <div>
      <div className="container py-8 h-14 flex items-center justify-between">
        <Search />
        <div className="flex gap-x-3 items-center">
          <FontAwesomeIcon icon={faBell} className="max-[600px]:hidden text-dark-purple text-lg" />
          <motion.div whileTap={{ scale:0.8 }} className='max-[700px]:hidden cursor-pointer border bg-dark-purple p-2 rounded-md text-white'>
            Class Hub
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Navbar