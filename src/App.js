import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Star, Menu, X, Filter, ChevronDown, Truck, Shield, RotateCcw } from 'lucide-react';

const FlipkartEcommerce = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  // Sample product data
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 79999,
      originalPrice: 89999,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 2341,
      category: "smartphones",
      discount: 11,
      inStock: true
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      price: 74999,
      originalPrice: 84999,
      image: "https://images.unsplash.com/photo-1610792516307-ea270f416afc?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 1876,
      category: "smartphones",
      discount: 12,
      inStock: true
    },
    {
      id: 3,
      name: "MacBook Air M2",
      price: 119999,
      originalPrice: 134999,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 987,
      category: "laptops",
      discount: 11,
      inStock: true
    },
    {
      id: 4,
      name: "Sony WH-1000XM4",
      price: 24999,
      originalPrice: 29999,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 3421,
      category: "headphones",
      discount: 17,
      inStock: true
    },
    {
      id: 5,
      name: "Dell XPS 13",
      price: 89999,
      originalPrice: 99999,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 654,
      category: "laptops",
      discount: 10,
      inStock: false
    },
    {
      id: 6,
      name: "AirPods Pro",
      price: 19999,
      originalPrice: 24999,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 2876,
      category: "headphones",
      discount: 20,
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'smartphones', name: 'Smartphones' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'headphones', name: 'Headphones' }
  ];

  const bannerSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
      title: "Big Billion Days Sale",
      subtitle: "Up to 80% off on Electronics"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      title: "Mobile Bonanza",
      subtitle: "Latest smartphones at best prices"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=400&fit=crop",
      title: "Laptop Festival",
      subtitle: "Premium laptops with great deals"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'under25k' && product.price < 25000) ||
      (priceRange === '25k-50k' && product.price >= 25000 && product.price < 50000) ||
      (priceRange === '50k-100k' && product.price >= 50000 && product.price < 100000) ||
      (priceRange === 'above100k' && product.price >= 100000);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

 

const Header = () => (
    <header className="bg-blue-600 text-black sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold">Flipkart</h1>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="flex items-center bg-blue-50 rounded-md px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="flex-1 bg-transparent focus:outline-none px-5 text-sm text-gray-700"
            />
          </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition-colors">
              <User size={20} />
              <span className="hidden sm:inline">Login</span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition-colors relative">
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile search */}
        <div className="md:hidden pb-4">
           <div className="flex items-center bg-blue-50 rounded-md px-3 py-1">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="flex-1 bg-transparent focus:outline-none px-2 text-sm text-gray-700"
            />
          </div>
        </div>
      </div>
    </header>
  );


  const MobileMenu = () => (
    <div className={`md:hidden bg-white border-t ${isMenuOpen ? 'block' : 'hidden'}`}>
      <div className="px-4 py-2">
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const Banner = () => (
    <div className="relative h-64 md:h-80 overflow-hidden">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg md:text-xl">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );

  const Filters = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h3 className="font-semibold mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Prices</option>
            <option value="under25k">Under ₹25,000</option>
            <option value="25k-50k">₹25,000 - ₹50,000</option>
            <option value="50k-100k">₹50,000 - ₹1,00,000</option>
            <option value="above100k">Above ₹1,00,000</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setPriceRange('all');
              setSortBy('popularity');
              setSearchTerm('');
            }}
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
            {product.discount}% OFF
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart size={16} className="text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded text-sm">
            <span className="mr-1">{product.rating}</span>
            <Star size={12} fill="currentColor" />
          </div>
          <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center mb-3">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Truck size={14} className="mr-1" />
          <span>Free Delivery</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              product.inStock
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button
            disabled={!product.inStock}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              product.inStock
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );

  const Features = () => (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck size={32} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Free Delivery</h3>
            <p className="text-gray-600">Free delivery on orders above ₹500</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure payment with SSL encryption</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw size={32} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-600">7-day return policy for all products</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Payments</a></li>
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Policy</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Return Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Social</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Flipkart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />
      <Banner />
      
      <main className="container mx-auto px-4 py-8">
        <Filters />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </main>
      
      <Features />
      <Footer />
    </div>
  );
};

export default FlipkartEcommerce;