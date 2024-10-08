import { cva } from 'class-variance-authority';

export const calendarDayVariants = cva(
  'w-full h-44 pt-1 pr-2 pb-2 pl-2 flex flex-col text-left bg-white-100 border-[0.5px] border-gray-200 hover:border-gray-400 active:border-gray-500',
  {
    variants: {
      isInvalid: {
        true: 'hover:border-gray-200 active:border-gray-200 text-opacity-30 text-dark-100 cursor-not-allowed',
        false: '',
      },
      isActive: {
        true: 'bg-gray-100',
        false: '',
      },
      readonly: {
        true: 'hover:border-gray-200 active:border-gray-200 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      isInvalid: false,
      isActive: false,
      readonly: false,
    },
  },
);
