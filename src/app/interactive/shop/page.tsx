"use client";

export default function ShopPage() {
  const products = [
    {
      id: "prod001",
      name: "Advanced Vitamin C Serum",
      category: "skincare",
      brand: "SkinMedica",
      description: "Clinical-grade vitamin C serum untuk brightening dan anti-aging",
      price: 850000,
      originalPrice: 1000000,
      discount: 15,
      stock: 15,
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop"
    },
    {
      id: "prod002",
      name: "Hydrating Collagen Mask (5 pieces)",
      category: "skincare",
      brand: "BeautyMed",
      description: "Intensive hydrating mask dengan marine collagen dan hyaluronic acid",
      price: 350000,
      originalPrice: 400000,
      discount: 12,
      stock: 28,
      rating: 4.6,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop"
    },
    {
      id: "prod003",
      name: "Sunscreen SPF 50+ Professional",
      category: "skincare",
      brand: "DermaShield",
      description: "Broad spectrum protection dengan anti-aging benefits",
      price: 280000,
      originalPrice: 280000,
      discount: 0,
      stock: 42,
      rating: 4.9,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop"
    },
    {
      id: "prod004",
      name: "Retinol Night Serum 0.5%",
      category: "skincare", 
      brand: "Advanced Derma",
      description: "Professional-grade retinol untuk anti-aging dan acne treatment",
      price: 650000,
      originalPrice: 750000,
      discount: 13,
      stock: 18,
      rating: 4.7,
      reviews: 27,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "✨" : "");
  };

  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.stock > 0).length,
    onSale: products.filter(p => p.discount > 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Beauty Shop</h1>
          <p className="text-gray-600 mt-1">E-commerce untuk produk kecantikan dan skincare</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>🛒</span>
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Products</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
            </div>
            <span className="text-2xl">🛍️</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">In Stock</h3>
              <div className="text-2xl font-bold text-green-600">{stats.inStock}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">On Sale</h3>
              <div className="text-2xl font-bold text-red-600">{stats.onSale}</div>
            </div>
            <span className="text-2xl">🏷️</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
              <div className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalValue)}</div>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow border hover:shadow-lg transition-shadow">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {product.category}
                  </span>
                  {product.discount > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm">{getRatingStars(product.rating)}</span>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(product.price)}</span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-1">
                  <span>🛒</span>
                  <span>Add to Cart</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  👁️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">🎁 Special Offers</h3>
          <p className="text-gray-600 mb-4">Free shipping untuk pembelian di atas {formatCurrency(500000)}</p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="flex items-center space-x-1">
              <span>📦</span>
              <span>Free shipping</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>🔄</span>
              <span>Easy returns</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>💎</span>
              <span>Member discounts</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}