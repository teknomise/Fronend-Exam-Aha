import { render, screen } from '@testing-library/react';
import Tab from './Navtabs';

describe('Tab', () => {
    it('renders correctly', () => {
        const onChangeTab = jest.fn();
        render(<Tab activeTab="Followers" onChangeTab={onChangeTab} />);
        const followersTab = screen.getByTestId('followers-tab');
        const followingTab = screen.getByTestId('following-tab');
        expect(followersTab).toBeInTheDocument();
        expect(followingTab).toBeInTheDocument();
      });
  
      it('calls onChangeTab when a tab is clicked', () => {
        const onChangeTab = jest.fn();
        render(<Tab activeTab="Followers" onChangeTab={onChangeTab} />);
        const followingTab = screen.getByTestId('following-tab');
        followingTab.click();
        expect(onChangeTab).toHaveBeenCalledWith('Following');
      });
});
