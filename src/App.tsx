import Header from './layouts/parts/Header';
import Footer from './layouts/parts/Footer';
import HomePage from './pages/index';

export default function App() {
  return <div className="min-h-screen bg-background"><a className="sr-only focus:not-sr-only" href="#main-content">Skip to content</a><Header /><HomePage /><Footer /></div>;
}
