import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NewsletterSection from './components/NewsletterSection';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Help from './pages/Help';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickView from './components/QuickView';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccess from './components/OrderSuccess';
import Toast from './components/Toast';

function PageRouter() {
  const { currentPage } = useStore();
  return (
    <main className="store-main">
      {currentPage === 'shop' && <Shop />}
      {currentPage === 'profile' && <Profile />}
      {currentPage === 'orders' && <Orders />}
      {currentPage === 'about' && <AboutUs />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'help' && <Help />}
    </main>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Navbar />
      <PageRouter />
      <NewsletterSection />
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <QuickView />
      <CheckoutModal />
      <OrderSuccess />
      <Toast />
    </StoreProvider>
  );
}
