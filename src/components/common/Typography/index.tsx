'use client';

import { ComponentPropsWithoutRef, ElementType } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import { typographyVariants } from '@/components/common/Typography/Typography.variant';

export type TypographyProps = VariantProps<typeof typographyVariants> &
  ComponentPropsWithoutRef<'p'>;

const customTypography = (
  element: ElementType,
  variants: VariantProps<typeof typographyVariants>,
) => {
  const Typography = ({ children, className, ...props }: TypographyProps) => {
    const Tag = element;
    return (
      <Tag className={cn(typographyVariants(variants), className)} {...props}>
        {children}
      </Tag>
    );
  };
  return Typography;
};

export const H2Black = customTypography('span', {
  type: 'H2',
  color: 'black',
});

export const Body3Grey500 = customTypography('span', {
  type: 'Body3',
  color: 'grey500',
});

export const Label1Black = customTypography('span', {
  type: 'label1',
  color: 'black',
});

export const Body2Black = customTypography('span', {
  type: 'Body2',
  color: 'black',
});

export const SubTitle1Black = customTypography('span', {
  type: 'Subtitle1',
  color: 'black',
});

export const Subtitle2Black = customTypography('span', {
  type: 'Subtitle2',
  color: 'black',
});

export const Label1White = customTypography('span', {
  type: 'label1',
  color: 'white',
});

export const Body2Grey500 = customTypography('span', {
  type: 'Body2',
  color: 'grey500',
});

export const Subtitle2Green500 = customTypography('span', {
  type: 'Subtitle2',
  color: 'green',
});

export const Body2Grey200 = customTypography('span', {
  type: 'Body2',
  color: 'grey200',
});

// 리디자인 변경 전 Typography
export const HeadPrimary = customTypography('h1', {
  type: 'heading1',
  weight: 'bold',
});
export const BodyPrimary = customTypography('p', {
  type: 'body1',
  color: 'dark',
});
export const Label = customTypography('label', {
  type: 'subLabel1',
  color: 'darken',
});
export const BodyGray = customTypography('p', {
  type: 'body3',
  color: 'gray',
});
export const AuthTitle = customTypography('h1', {
  type: 'authTitle',
  weight: 'bold',
});
export const MealHeaderTitle = customTypography('h1', {
  type: 'mealHeaderTitle',
  weight: 'bold',
  color: 'dark',
});
export const PageHeaderTitle = customTypography('h1', {
  type: 'pageHeaderTitle',
  weight: 'bold',
  color: 'dark',
});
export const CardTitle = customTypography('h1', {
  type: 'title2',
  weight: 'bold',
  color: 'dark',
});
export const MealCalenderTitle = customTypography('span', {
  type: 'mealCalendarTitle',
  color: 'dark',
});
export const NutritionDate = customTypography('h2', {
  type: 'title2',
  color: 'dark',
});
export const NutritionMenu = customTypography('h3', {
  type: 'title3',
  color: 'dark',
});
export const NutritionEtc = customTypography('h4', {
  type: 'title4',
  color: 'gray',
  weight: 'normal',
});
