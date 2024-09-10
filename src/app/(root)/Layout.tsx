import Navbar from '@/components/common/Navbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      <Navbar />
      <main className='ml-60 flex-grow p-6'>{children}</main>
    </div>
  );
};

export default RootLayout;