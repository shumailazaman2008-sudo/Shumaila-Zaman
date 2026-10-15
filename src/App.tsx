/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, Grid, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { PRODUCTS, Product } from './data/catalog';
import { Navbar, ActivePage } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage, OrderRecord } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { LookbookPage } from './pages/LookbookPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { StyleFinderPage } from './pages/StyleFinderPage';
import {
  auth,
  db,
  signInWithGoogle,
  signOutUser,
  handleFirestoreError,
  OperationType,
  BOOTSTRAPPED_ADMIN_EMAIL,
} from './lib/firebase';

const DEFAULT_FALLBACK_ORDER: OrderRecord = {
  orderId: 'SAM-1042',
  date: 'October 6, 2026',
  customerName: 'Ayesha Sikandar Khan',
  email: 'ayesha.khan@example.com',
  phone: '+92 300 8452190',
  address: 'House 42-B, Main Boulevard, Gulberg III',
  city: 'Lahore',
  postalCode: '54660',
  deliveryMethod: 'Standard Insured',
  paymentMethod: 'Cash on Delivery',
  items: [
    {
      product: PRODUCTS[5],
      size: 'M',
      color: 'Champagne Gold',
      quantity: 1,
    },
  ],
  itemsSummary: 'Golden Bloom Formal (M, Champagne Gold) x1',
  itemCount: 1,
  total: 42000,
  statusStep: 2,
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [styleFilter, setStyleFilter] = useState<string>('All');
  const [collectionFilter, setCollectionFilter] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  // Modals & Drawers
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'rose-garden-maxi-dress',
    'ivory-luxe-abaya',
  ]);

  // Shopping Bag State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      size: 'M',
      color: PRODUCTS[0].colors[0].name,
      quantity: 1,
    },
  ]);

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>([DEFAULT_FALLBACK_ORDER]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<OrderRecord>(
    DEFAULT_FALLBACK_ORDER
  );

  // 1. Listen to Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthReady(true);

      if (user && user.emailVerified) {
        const userDocPath = `users/${user.uid}`;
        try {
          await setDoc(
            doc(db, 'users', user.uid),
            {
              uid: user.uid,
              displayName: (user.displayName || 'SHUMAILA ZAMAN Patron').slice(0, 100),
              email: (user.email || 'patron@shumailazaman.com').slice(0, 150),
              phone: '+92 300 8452190',
              wishlistIds: wishlistIds.slice(0, 10),
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, userDocPath);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-Time Firestore Listeners for User Profile Wishlist & Orders
  useEffect(() => {
    if (!isAuthReady || !currentUser) return;

    const userDocPath = `users/${currentUser.uid}`;
    const unsubUser = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data.wishlistIds)) {
            setWishlistIds(data.wishlistIds);
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, userDocPath);
      }
    );

    const isAdmin =
      Boolean(currentUser.emailVerified) &&
      currentUser.email === BOOTSTRAPPED_ADMIN_EMAIL;

    const ordersQuery = isAdmin
      ? collection(db, 'orders')
      : query(collection(db, 'orders'), where('ownerId', '==', currentUser.uid));

    const unsubOrders = onSnapshot(
      ordersQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedOrders: OrderRecord[] = snapshot.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              orderId: d.orderId || docSnap.id,
              ownerId: d.ownerId,
              date: d.createdAt?.toDate
                ? d.createdAt.toDate().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent Order',
              customerName: d.customerName || 'SHUMAILA ZAMAN Patron',
              email: d.email || '',
              phone: d.phone || '',
              address: d.address || '',
              city: d.city || '',
              postalCode: d.postalCode || '',
              deliveryMethod: d.deliveryMethod || 'Standard Insured',
              paymentMethod: d.paymentMethod || 'Cash on Delivery',
              items: [
                {
                  product: PRODUCTS[0],
                  size: 'M',
                  color: 'Blush Rose',
                  quantity: d.itemCount || 1,
                },
              ],
              itemsSummary: d.itemsSummary || '',
              itemCount: d.itemCount || 1,
              total: d.total || 28500,
              statusStep: typeof d.statusStep === 'number' ? d.statusStep : 0,
            };
          });
          setOrders(loadedOrders);
          setActiveTrackingOrder(loadedOrders[0]);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'orders');
      }
    );

    return () => {
      unsubUser();
      unsubOrders();
    };
  }, [isAuthReady, currentUser]);

  // Dynamic SEO Document Title update
  useEffect(() => {
    const titles: Record<ActivePage, string> = {
      home: "SHUMAILA ZAMAN — Luxury Women's Fashion & Couture",
      shop: `${categoryFilter !== 'All' ? categoryFilter : 'Collections'} — SHUMAILA ZAMAN Couture`,
      product: `${selectedProduct.name} — SHUMAILA ZAMAN Couture`,
      lookbook: 'The ’26 Interactive Lookbook — SHUMAILA ZAMAN',
      story: 'Our Story & Atelier Craftsmanship — SHUMAILA ZAMAN',
      wishlist: 'Saved Wishlist — SHUMAILA ZAMAN',
      checkout: 'Private Atelier Checkout — SHUMAILA ZAMAN',
      account: 'Patron Account Portal — SHUMAILA ZAMAN',
      tracking: `Track Order #${activeTrackingOrder.orderId} — SHUMAILA ZAMAN`,
      'style-finder': 'Find Your Style Quiz — SHUMAILA ZAMAN',
    };
    document.title = titles[activePage] || "SHUMAILA ZAMAN — Luxury Women's Fashion & Couture";
  }, [activePage, categoryFilter, selectedProduct, activeTrackingOrder]);

  const handleNavigate = (
    page: ActivePage,
    catFilter = 'All',
    stFilter = 'All',
    colFilter = 'All'
  ) => {
    setCategoryFilter(catFilter);
    setStyleFilter(stFilter);
    setCollectionFilter(colFilter);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = async (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updatedList = wishlistIds.includes(productId)
      ? wishlistIds.filter((id) => id !== productId)
      : [...wishlistIds, productId].slice(0, 10);

    setWishlistIds(updatedList);

    if (currentUser && currentUser.emailVerified) {
      const path = `users/${currentUser.uid}`;
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          wishlistIds: updatedList,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, path);
      }
    }
  };

  const handleAddToBag = (
    product: Product,
    size = product.sizes[1] || product.sizes[0],
    color = product.colors[0]?.name || 'Default',
    e?: React.MouseEvent,
    quantity = 1
  ) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, color, quantity }];
    });
    setCartOpen(true);
  };

  const handleBuyNow = (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => {
    handleAddToBag(product, size, color, undefined, quantity);
    setCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCartQuantity = (
    productId: string,
    size: string,
    color: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, size: string, color: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (newOrder: OrderRecord) => {
    if (currentUser && currentUser.emailVerified) {
      const orderPath = `orders/${newOrder.orderId}`;
      try {
        await setDoc(doc(db, 'orders', newOrder.orderId), {
          orderId: newOrder.orderId,
          ownerId: currentUser.uid,
          customerName: newOrder.customerName.slice(0, 100),
          email: newOrder.email.slice(0, 150),
          phone: newOrder.phone.slice(0, 40),
          address: newOrder.address.slice(0, 250),
          city: newOrder.city.slice(0, 80),
          postalCode: newOrder.postalCode.slice(0, 20),
          deliveryMethod: newOrder.deliveryMethod,
          paymentMethod: newOrder.paymentMethod,
          itemsSummary: (newOrder.itemsSummary || 'SHUMAILA ZAMAN Couture Piece').slice(0, 500),
          itemCount: newOrder.itemCount || 1,
          total: Math.round(newOrder.total),
          statusStep: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, orderPath);
      }
    } else {
      setOrders((prev) => [newOrder, ...prev]);
    }

    setActiveTrackingOrder(newOrder);
    setCartItems([]);
    setActivePage('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminUpdateOrderStatus = async (orderId: string, newStatusStep: number) => {
    if (!currentUser) return;
    const orderPath = `orders/${orderId}`;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        statusStep: newStatusStep,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, orderPath);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1815] pb-14 lg:pb-0">
      {/* Sticky Luxury Navigation Bar */}
      <Navbar
        activePage={activePage}
        selectedCategory={categoryFilter}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onNavigate={(page, cat) => handleNavigate(page, cat || 'All')}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToBag={handleAddToBag}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            initialCategory={categoryFilter}
            initialStyle={styleFilter}
            initialCollection={collectionFilter}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToBag={handleAddToBag}
            onSelectProduct={handleSelectProduct}
            onOpenStyleFinder={() => handleNavigate('style-finder')}
          />
        )}

        {activePage === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToBag={handleAddToBag}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onOpenSizeGuide={() => setSizeGuideOpen(true)}
            onBackToShop={() => handleNavigate('shop', categoryFilter)}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            currentUser={currentUser}
            onSignInWithGoogle={handleGoogleSignIn}
            onPlaceOrder={handlePlaceOrder}
            onContinueShopping={() => handleNavigate('shop', 'All')}
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistPage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToBag={handleAddToBag}
            onSelectProduct={handleSelectProduct}
            onExploreShop={() => handleNavigate('shop', 'New Arrivals')}
          />
        )}

        {activePage === 'account' && (
          <AccountPage
            currentUser={currentUser}
            orders={orders}
            wishlistCount={wishlistIds.length}
            onSignInWithGoogle={handleGoogleSignIn}
            onSignOut={handleSignOut}
            onUpdateOrderStatus={handleAdminUpdateOrderStatus}
            onNavigate={(page) => handleNavigate(page)}
            onSelectOrderToTrack={(ord) => {
              setActiveTrackingOrder(ord);
              handleNavigate('tracking');
            }}
          />
        )}

        {activePage === 'tracking' && (
          <OrderTrackingPage
            activeOrder={activeTrackingOrder}
            allOrders={orders}
            onSelectOrder={(ord) => setActiveTrackingOrder(ord)}
          />
        )}

        {activePage === 'lookbook' && (
          <LookbookPage
            onSelectProduct={handleSelectProduct}
            onAddToBag={handleAddToBag}
          />
        )}

        {activePage === 'story' && (
          <OurStoryPage
            onExploreCollection={() =>
              handleNavigate('shop', 'All', 'All', 'The Signature Collection')
            }
            onOpenLookbook={() => handleNavigate('lookbook')}
          />
        )}

        {activePage === 'style-finder' && (
          <StyleFinderPage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToBag={handleAddToBag}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Luxury Footer & Newsletter */}
      <Footer
        onNavigate={(page, cat) => handleNavigate(page, cat || 'All')}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Mobile Bottom Shopping Bar */}
      <nav
        aria-label="Mobile quick navigation"
        className="fixed inset-x-0 bottom-0 z-30 flex h-13 items-center justify-around border-t border-[#1E1815]/10 bg-[#FAF7F2]/95 px-2 backdrop-blur-md lg:hidden"
      >
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activePage === 'home' ? 'text-[#9A7B38]' : 'text-[#1E1815]/75'
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={() => handleNavigate('shop', 'All')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activePage === 'shop' ? 'text-[#9A7B38]' : 'text-[#1E1815]/75'
          }`}
        >
          <Grid className="h-4 w-4" />
          <span>Shop</span>
        </button>
        <button
          type="button"
          onClick={() => handleNavigate('style-finder')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activePage === 'style-finder' ? 'text-[#9A7B38]' : 'text-[#1E1815]/75'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Style Quiz</span>
        </button>
        <button
          type="button"
          onClick={() => handleNavigate('wishlist')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activePage === 'wishlist' ? 'text-[#9A7B38]' : 'text-[#1E1815]/75'
          }`}
        >
          <Heart className="h-4 w-4" />
          <span>Wishlist ({wishlistIds.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#1E1815]/75"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Bag ({totalCartCount})</span>
        </button>
      </nav>

      {/* Global Overlays & Modals */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={(cat) => handleNavigate('shop', cat)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToBag={(prod, sz, col) => handleAddToBag(prod, sz, col)}
        onViewFullDetails={handleSelectProduct}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setSizeGuideOpen(true);
        }}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => handleNavigate('checkout')}
        onContinueShopping={() => handleNavigate('shop', 'All')}
      />
    </div>
  );
}
