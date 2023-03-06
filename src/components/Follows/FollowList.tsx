/**
 * A React component that displays a list of users with follow buttons.
 * @function FollowList
 * @param {IFollowListProps} props - The props passed to the component.
 * @return {JSX.Element} A JSX element representing the FollowList component.
*/
import ProfileImage from '../../assets/images/profile-image.png';
import DefaultImage from '../../assets/images/user-image-4.png'

/**
 * An interface representing a user.
 * @interface IUser
 * @property {number} id - The user's id.
 * @property {string} avatar - The user's avatar image.
 * @property {string} name - The user's name.
 * @property {string} username - The user's username.
 * @property {boolean} isFollowing - A boolean indicating whether the logged-in user is following the user.
*/
export interface IUser {
  id: number;
  avater: string;
  name: string;
  username: string;
  isFollowing: boolean;
}

/**
 * An interface representing the props passed to the FollowList component.
 * @interface IFollowListProps
 * @property {IUser[]} users - An array of users to render.
*/
export interface IFollowListProps {
  users: IUser[];
}


/**
 * Renders the FollowList component.
 * @function
 * @param {IFollowListProps} props - The props passed to the component.
 * @return {JSX.Element} A JSX element representing the list of users with follow buttons.
*/
export default function FollowList(props: IFollowListProps) {

  /**
   * Handles errors when loading images and replaces them with a default image.
   * @function
   * @param {React.SyntheticEvent<HTMLImageElement, Event>} event - The event that triggered the error.
  */
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = ProfileImage;
  };

  return (
    <ul className='list-follows'>
      {props.users?.map((user, key) => (
        <li key={key}>
          <div className='profile-follows'>
            <div className='left'>
              <div className='image'>
                <img src={DefaultImage} alt={user.name} onError={handleImageError}/>
              </div>
              <div className='detail'>
                <h3>{user.name}</h3>
                <p data-testid="user-username">@{user.username}</p>
              </div>
            </div>
            <div className='right'>
              <button className={user.isFollowing ? 'btn-following' : 'btn-outline-dark'}>
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}