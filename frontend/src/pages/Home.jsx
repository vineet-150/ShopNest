
import { useEffect, useState } from "react";
import ProductCard from "../components/producrcard.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchProducts = async (attempt = 1) => {
            let retrying = false;

            try {
                const res = await fetch(`${API_URL}/api/products`);

                if (!res.ok) {
                    throw new Error(`Could not load products (${res.status})`);
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("The product response is not a list");
                }

                if (!cancelled) {
                    setProducts(data.slice(0, 4));
                }

            } catch (requestError) {
                if (attempt < 5 && !cancelled) {
                    retrying = true;
                    window.setTimeout(() => fetchProducts(attempt + 1), 1000);
                    return;
                }

                console.error("Product fetch error:", requestError);

                if (!cancelled) {
                    setError("Products could not be loaded. Please try again.");
                }

            } finally {
                if (!cancelled && !retrying) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main className="main-content">

            <div className="hero-banner">
                <h1>Welcome to ShopNest</h1>
                <p>Discover the best products at unbeatable prices.</p>
            </div>

            <h2>Featured Products</h2>

            {loading && <div>Loading products...</div>}

            {error && <p>{error}</p>}

            {!loading && !error && products.length === 0 && (
                <p>No products found.</p>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}

        </main>
    );
};

export default Home;
