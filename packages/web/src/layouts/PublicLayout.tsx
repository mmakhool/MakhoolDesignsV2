import { Outlet } from 'react-router-dom';

export const PublicLayout: React.FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
