import { cva } from 'class-variance-authority';

export const typographyVariants = cva('whitespace-pre-line text-wrap', {
  variants: {
    type: {
      Landing: 'text-[64px] leading-[1.44] tracking-[-0.008em] font-semibold',
      LandingBadge: 'text-[40px] leading-[1.44] tracking-[-0.008em] font-light',
      H1: 'text-[40px] leading-[1.44] tracking-[-0.008em] font-bold',
      H2: 'text-[32px] leading-[1.44] tracking-[-0.008em] font-bold',
      H3: 'text-[28px] leading-[1.44] tracking-[-0.008em] font-bold',
      H4: 'text-2xl leading-[1.44] tracking-[-0.008em] font-bold',
      H5: 'text-xl leading-[1.44] tracking-[-0.008em] font-bold',
      Subtitle1: 'text-lg leading-[1.44] tracking-[-0.008em] font-bold',
      Subtitle2: 'text-base leading-[1.44] tracking-[-0.008em] font-bold',
      Subtitle3: 'text-sm leading-[1.44] tracking-[-0.008em] font-bold',
      Body1: 'text-lg leading-[1.52] tracking-[-0.008em] font-medium',
      Body2: 'text-base leading-[1.52] tracking-[-0.008em] font-medium',
      Body3: 'text-sm leading-[1.52] tracking-[-0.008em] font-medium',
      label1: 'text-sm leading-[1.28] tracking-[-0.008em] font-bold',
      label2: 'text-xs leading-[1.28] tracking-[-0.008em] font-bold',
      label3: 'text-[10px] leading-[1.28] tracking-[-0.008em] font-bold',
      Caption1: 'text-xs leading-[1.28] tracking-[-0.008em] font-medium',
      Caption2: 'text-[10px] leading-[1.28] tracking-[-0.008em] font-normal',

      // 리디자인 변경 전 type
      heading1: 'text-[24px] leading-[145%]',
      heading2: 'text-[22px] leading-[145%]',
      heading3: 'text-[18px] leading-[155%]',
      heading4: 'text-[16px] leading-[155%]',
      title1: 'text-[20px] leading-[155%]',
      title2: 'text-[18px] leading-[155%]',
      title3: 'text-[16px] leading-[155%]',
      title4: 'text-[14px] leading-[155%]',
      title5: 'text-[12px] leading-[155%]',
      body1: 'text-[18px] leading-[155%]',
      body2: 'text-[16px] leading-[155%]',
      body3: 'text-[14px] leading-[155%]',
      subLabel1: 'text-[16px] leading-[155%]',
      subLabel2: 'text-[14px] leading-[155%]',
      caption1: 'text-[12px] leading-[155%]',
      caption2: 'text-[8px] leading-[155%]',
      question: 'text-[22px] leading-[145%]',
      mealHeaderTitle: 'text-[42px] leading-[150%]',
      authTitle: 'text-[50px] leading-[150%]',
      pageHeaderTitle: 'text-[28px] leading-[145%]',
      mealCalendarTitle: 'text-[24px] leading-[155%]',
    },
    weight: {
      bold: 'font-bold',
      thin: 'font-thin',
      normal: 'font-normal',
    },
    color: {
      black: 'text-black-100',
      white: 'text-white-100',
      green: 'text-green-500',
      blue: 'text-blue-500',
      red: 'text-red-500',
      grey100: 'text-grey-100',
      grey200: 'text-grey-200',
      grey400: 'text-grey-400',
      grey500: 'text-grey-500',
      grey600: 'text-grey-600',
      grey700: 'text-grey-700',
      grey800: 'text-grey-800',
      grey900: 'text-grey-900',
      assistive: 'text-assistiveTxt',
      placeholder: 'text-placeholder',

      // 리디자인 후 삭제
      darken: 'text-dark-200',
      dark: 'text-dark-100',
      gray: 'text-gray-500',
    },
  },
  defaultVariants: {
    type: 'Body3',
    color: 'black',
  },
});
