
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/producrcard.jsx';
import { apiFetch } from '../utils/api';
import '../styles/product.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiFetch('/api/products');

                if (!res.ok) {
                    throw new Error(`Failed to load products (${res.status})`);
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error('Invalid product response');
                }

                setProducts(data);

            } catch (error) {
                console.error('Shop products error:', error);
                setError('Unable to load products. Please try again.');

            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="shop-container">
            <h2>All Products</h2>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <p>{error}</p>
            ) : filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
