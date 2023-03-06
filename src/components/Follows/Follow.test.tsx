import { render, screen } from '@testing-library/react';
import FollowList, { IFollowListProps, IUser } from './FollowList';
import DefaultImage from '../../assets/images/user-image-4.png'

describe('FollowList component', () => {
  const mockUsers: IUser[] = [
    {
      id: 1,
      avater: DefaultImage,
      name: 'John Doe',
      username: 'johndoe',
      isFollowing: true,
    },
    {
      id: 2,
      avater: DefaultImage,
      name: 'Jane Doe',
      username: 'janedoe',
      isFollowing: false,
    },
  ];

  const mockProps: IFollowListProps = {
    users: mockUsers,
  };

  it('renders a list of users', () => {
    render(<FollowList {...mockProps} />);

    const userListItems = screen.getAllByRole('listitem');
    expect(userListItems.length).toBe(mockUsers.length);
  });

  it('renders user avatar images', () => {
    render(<FollowList {...mockProps} />);

    const userAvatarImages = screen.getAllByRole('img');
    expect(userAvatarImages.length).toBe(mockUsers.length);
  });


  
  it('displays the user name and username', () => {
    render(<FollowList {...mockProps} />);
    
    const userNames = screen.getAllByRole('heading', { level: 3 });
    const userUsernames = screen.getAllByTestId('user-username');
  
    mockUsers.forEach((user, index) => {
      expect(userNames[index]).toHaveTextContent(user.name);
      expect(userUsernames[index]).toHaveTextContent(`@${user.username}`);
    });
  });
  

  it('displays Follow/Following buttons for each user', () => {
    render(<FollowList {...mockProps} />);

    const followButtons = screen.getAllByRole('button');
    mockUsers.forEach((user, index) => {
      expect(followButtons[index]).toHaveTextContent(user.isFollowing ? 'Following' : 'Follow');
    });
  });
});
