/**
 * The main component that represents the application.
 * It renders the main pages of the application using React Router.
 * @function
 * @returns {JSX.Element} - A JSX element representing the component.
*/
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const loader = (
  <div className="pt-2 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Home = lazy(() => import('./pages/Home'));
const SearchResult = lazy(() => import('./pages/SearchResult'));
const Tags = lazy(() => import('./pages/Tags'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loader}>
        <Routes>
          <Route path="/" element={
            <AnimatePresence>
              <Home />
            </AnimatePresence>
          } />
          <Route path="/search" element={
            <AnimatePresence>
              <SearchResult />
            </AnimatePresence>
          } />
          <Route path="/tags" element={
            <AnimatePresence>
              <Tags />
            </AnimatePresence>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;