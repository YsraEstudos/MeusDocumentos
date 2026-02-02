import DynamicIsland from '../components/DynamicIsland';

const MainLayout = ({ children, activeTab, setActiveTab }) => {
    return (
        <div className="macos-container">
            {children}
            <DynamicIsland activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default MainLayout;
