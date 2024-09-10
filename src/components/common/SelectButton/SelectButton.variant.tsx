import { cva } from 'class-variance-authority';

export const selectButtonVariants = cva(
  'w-full border-[1px] border-gray-300 rounded-md bg-white-200 text-left focus:border-green-700 focus:outline-none',
  {
    variants: {
      size: {
        small: 'px-3 py-2 text-sm rounded-md pr-8',
        basic: 'px-5 py-3 text-basic rounded-lg pr-10',
        large: 'px-7 py-5 text-lg rounded-lg pr-12',
      },
    },
  },
);