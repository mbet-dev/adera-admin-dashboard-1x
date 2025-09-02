import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const AderaLogo: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M21.16 33.32L0 0H9.08L25.6 26.24L25.72 26.24L42.24 0H51.32L30.16 33.32V40H21.16V33.32Z" fill="currentColor"/>
    <path d="M83.4173 0.8C77.4173 0.8 72.4573 2.92 68.5373 7.16C64.6573 11.36 62.6973 16.6 62.6973 22.88C62.6973 29.12 64.6573 34.36 68.5373 38.6C72.4573 42.8 77.4173 44.92 83.4173 44.92C89.4173 44.92 94.3773 42.8 98.2973 38.6C102.257 34.36 104.217 29.12 104.217 22.88C104.217 16.6 102.257 11.36 98.2973 7.16C94.3773 2.92 89.4173 0.8 83.4173 0.8ZM83.4173 38.2C80.0573 38.2 77.2973 37.04 75.1373 34.72C72.9773 32.4 71.8973 29.2 71.8973 25.12V20.56C71.8973 16.48 72.9773 13.28 75.1373 10.96C77.2973 8.64 80.0573 7.48 83.4173 7.48C86.7773 7.48 89.5373 8.64 91.6973 10.96C93.8973 13.28 94.9773 16.48 94.9773 20.56V25.12C94.9773 29.2 93.8973 32.4 91.6973 34.72C89.5373 37.04 86.7773 38.2 83.4173 38.2Z" fill="currentColor" transform="translate(0, -4)"/>
    <path d="M110.36 40V0H119.32V40H110.36Z" fill="currentColor"/>
    <path d="M149.33 0.8C145.49 0.8 142.17 1.8 139.37 3.8L142.61 10.4C144.61 9.04 146.81 8.36 149.21 8.36C151.73 8.36 153.53 8.92 154.61 10.04C155.73 11.12 156.29 12.64 156.29 14.6V15.44C152.05 13.44 147.85 12.44 143.69 12.44C137.93 12.44 133.25 14.28 129.65 17.96C126.09 21.6 124.31 26.2 124.31 31.76C124.31 35.8 125.29 39.08 127.25 41.6C129.25 44.08 131.81 45.32 134.93 45.32C138.61 45.32 141.69 44.28 144.17 42.2L141.29 35.72C139.45 36.8 137.49 37.36 135.41 37.36C133.53 37.36 132.13 36.88 131.21 35.92C130.33 34.92 129.89 33.6 129.89 31.96C129.89 28.52 131.25 26.08 134.05 24.64C136.85 23.2 140.69 22.48 145.57 22.48H151.25V17.8C151.25 15.68 150.21 14.04 148.13 12.88C146.09 11.68 143.25 11.08 139.61 11.08C136.81 11.08 134.33 11.6 132.17 12.64L128.93 6.16C131.93 4.08 135.49 3.04 139.61 3.04C143.09 3.04 146.09 3.8 148.73 5.32C151.41 6.8 153.41 8.96 154.73 11.8C156.09 14.6 156.77 17.8 156.77 21.4V40H165.73V0H154.93L149.33 0.8Z" fill="currentColor" transform="translate(0, -4)"/>
    <path d="M199.16 0H190.2L173.68 26.24V26.24L173.56 0H164.48V40H173.48V13.32L190.64 40H199.72L182.56 13.32L199.16 0Z" fill="currentColor"/>
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M3 6h18M3 18h18" />
  </svg>
);

export const PackageIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export const StoreIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 6h14M5 10h14M5 14h14" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export const TruckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const DollarSignIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m0-10h.01M6 12a6 6 0 1112 0A6 6 0 016 12z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const FinancialsIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const ProfitLossIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a3 3 0 013-3h2a3 3 0 013 3v2m-6 0h6M12 4a8 8 0 100 16 8 8 0 000-16z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0l-2-2m2 2l2-2" />
    </svg>
);

export const PdfIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const GoogleSheetsIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15 2H9C7.9 2 7 2.9 7 4V20C7 21.1 7.9 22 9 22H15C16.1 22 17 21.1 17 20V4C17 2.9 16.1 2 15 2M12 12H15V14H12V12M12 8H15V10H12V8M12 4H15V6H12V4M9 12H11V14H9V12M9 8H11V10H9V8M9 4H11V6H9V4Z" />
  </svg>
);

export const LineChartIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 012-2h3a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" />
  </svg>
);