import { useState } from 'react';

const LandlordDash = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab1')}
        >
          Tab 1
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab2')}
        >
          Tab 2
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab3' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab3')}
        >
          Tab 3
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab4' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab4')}
        >
          Tab 4
        </button>
      </div>

      <div className="border rounded p-4">
        {activeTab === 'tab1' && <Tab1Content />}
        {activeTab === 'tab2' && <Tab2Content />}
        {activeTab === 'tab3' && <Tab3Content />}
        {activeTab === 'tab4' && <Tab4Content />}
      </div>
    </div>
  );
};

const Tab1Content = () => {
  return <div>Tab 1 Content</div>;
};

const Tab2Content = () => {
  return <div>Tab 2 Content</div>;
};

const Tab3Content = () => {
  return <div>Tab 3 Content</div>;
};

const Tab4Content = () => {
  return <div>Tab 4 Content</div>;
};

export default LandlordDash;
