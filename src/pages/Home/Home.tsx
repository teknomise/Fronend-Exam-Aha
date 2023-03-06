/**
 * A React component that represents the main search page of the application.
 * It renders a search input box and a follow list, and updates the follow list based on user input.
 * @param {Object} props - The props object containing the component's properties.
 * @returns {JSX.Element} - A JSX element representing the component.
 */

import * as React from 'react';
import Navbar from '../../components/Navbar';
import Navtabs from '../../components/Navtabs';
import Follows from '../../components/Follows';
import TextBox from '../../components/TextBox';
export interface IAppProps {
}

/**
 * Represents the state for the Home component.
 * @interface
 * @property {string} activeTab - The currently active tab.
 * @property {number} screenWidth - The width of the screen.
 */
export interface IAppState {
  activeTab: string;
  screenWidth: number;
}

/**
 * Represents the Home component.
 * @class
 */
export default class Home extends React.Component<IAppProps, IAppState> {

  /**
   * Creates an instance of the SearchPage component.
   * @param props - The props passed down to the component.
   */
  constructor(props: IAppProps) {
    super(props);

    /**
     * Represents the initial state for the SearchPage component.
     * @type {Object}
     * @property {string} activeTab - The currently active tab.
     * @property {number} screenWidth - The width of the screen.
    */
    this.state = {
      activeTab: "Followers",
      screenWidth: window.innerWidth
    };

    // Bind method to component instance
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    // Adding event listener to window resize
    window.addEventListener('resize', this.handleScreenResize);
  }

  componentWillUnmount() {
    // Remove event listener for screen resize
    window.removeEventListener('resize', this.handleScreenResize);
  }

  /**
   * An event handler function that updates the state of the component with the current
   * inner width of the browser window whenever the window is resized.
   */
  handleScreenResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  /**
   * A method that updates the state of the active tab.
   * @param {string} tab - The name of the active tab.
   * @returns {void} This method does not return anything.
   */
  handleTabChange(tab: string) {
    this.setState({ activeTab: tab });
  }

  /**
   * A React component that renders the search bar and follows list.
   * @class
   * @property {string} activeTab - The currently active tab.
   * @property {number} screenWidth - The width of the screen.
   */
  public render() {
    const { activeTab, screenWidth } = this.state;
    return (
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <Navbar />
            <div className="col-sm min-vh-100">
              <div className="container">
                <div className='row'>
                  <div className='col-md-8'>
                    <div className='content-wrapper'>
                      <h2 className='pos-bottom-3'>Search</h2>
                      <TextBox />
                    </div>
                  </div>
                  {
                    screenWidth >= 1440
                      ? (
                        <div className='col-md-4 pr-0'>
                          <div className='follows'>
                            <Navtabs activeTab={activeTab} onChangeTab={this.handleTabChange} />
                            <Follows activeTab={activeTab} isFetching={false} />
                          </div>
                        </div>
                      )
                      : (
                        <></>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}