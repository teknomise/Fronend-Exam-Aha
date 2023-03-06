/**
  * The Tab component displays a set of tabs that allow the user to switch between two options: "Followers" and "Following".
  * It receives two props:
  * activeTab (string): indicates the currently active tab
  * onChangeTab (function): is called when a tab is clicked, receives the name of the tab as a parameter
*/

import { useState } from 'react';
import './Navtabs.css';

interface ITabProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Tab = ({ activeTab, onChangeTab }: ITabProps) => {
  const [tabs] = useState(["Followers", "Following"]);

  /**
   * Handles a tab click event. Calls the onChangeTab prop function with the name of the clicked tab.
   * @param tab - The name of the clicked tab.
  */
  const handleTabClick = (tab: string) => {
    onChangeTab(tab);
  };

  /**
   * Renders the tabs and applies the 'active' class to the currently active tab.
   * @return {JSX.Element} - Returns a div element with the list of tabs that can be clicked to switch between them.
  */
  return (
    <div className="tab">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-item ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabClick(tab)}
          data-testid={`${tab.toLowerCase()}-tab`}
        >
          <span>{tab}</span>
        </div>
      ))}
    </div>
  );
};

export default Tab;
