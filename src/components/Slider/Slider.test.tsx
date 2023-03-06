import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import Slider from './Silder';

const mockStore = configureStore([]);

describe('Slider', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      search: {
        pageSize: 10,
      },
    });
  });

  it('should display the current page size', () => {
    render(
      <Provider store={store}>
        <Slider />
      </Provider>
    );

    const pageSizeText = screen.getByText(/10/);

    expect(pageSizeText).toBeInTheDocument();
  });


});
