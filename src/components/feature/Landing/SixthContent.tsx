'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactCard from '@/components/feature/Landing/_components/ContactCard';
import ContentHeader from '@/components/feature/Landing/_components/ContentHeader';

const SixthContent = () => {
  return (
    <motion.section
      initial={{ borderRadius: 0, marginLeft: 0, marginRight: 0 }}
      animate={{ borderRadius: 56, marginLeft: 32, marginRight: 32 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className='bg-grey-50'
      id='section4'
    >
      <div className='relative flex flex-col items-center gap-8 px-[328px] pb-24'>
        <Image
          src='/imgs/landing/stickers/graphic05.png'
          alt='스티커 모음'
          className='absolute right-8 top-0 h-[235px] w-[552px]'
          width={552}
          height={235}
        />
        <ContentHeader
          mainHeader='문의하기'
          subFirstHeader='의견을 남겨주세요.'
          isCenter={false}
        />
        <motion.div
          className='flex w-[1200px] justify-center gap-12'
          initial={{ y: 200 }}
          whileInView={{ y: 0 }}
          viewport={{ amount: 'some', once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <ContactCard />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SixthContent;
