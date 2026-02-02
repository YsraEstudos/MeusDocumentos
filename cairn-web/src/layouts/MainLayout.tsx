import { ReactNode } from 'react';
import DynamicIsland from '../components/DynamicIsland';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="macos-container">
            {children}
            <DynamicIsland />
        </main>
    );
};

export default MainLayout;
