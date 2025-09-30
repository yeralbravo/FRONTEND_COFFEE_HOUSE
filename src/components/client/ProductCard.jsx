    // src/components/client/ProductCard.jsx
    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useCart } from '../../context/CartContext';
    import { useAlerts } from '../../hooks/useAlerts';
    import '../../style/ProductCard.css';

    const ProductCard = ({ item }) => {
    const { addToCart } = useCart();
    const { showSuccessAlert } = useAlerts();
    const navigate = useNavigate();

    if (!item) return null;

    const isProduct = item.item_type === 'product';
    const linkUrl = isProduct ? `/product/${item.id}` : `/insumo/${item.id}`;

    const imageUrl =
        item.images && item.images.length > 0
        ? item.images[0] // ✅ ya es URL absoluta
        : 'https://placehold.co/250x250/EFEFEF/8B8B8B?text=Sin+Imagen';

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const itemForCart = {
        ...item,
        isProduct: isProduct,
        };

        const wasAdded = await addToCart(itemForCart);
        if (wasAdded) {
        showSuccessAlert(`${item.nombre} ha sido añadido al carrito!`);
        }
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const itemForCheckout = {
        cartItems: [
            {
            ...item,
            quantity: 1,
            isProduct: isProduct,
            },
        ],
        cartTotal: item.precio,
        itemCount: 1,
        fromBuyNow: true,
        };

        navigate('/checkout/shipping', { state: itemForCheckout });
    };

    return (
        <Link to={linkUrl} className="product-card-link-wrapper">
        <div className="product-card-client">
            <div className="product-card-image-wrapper">
            <img src={imageUrl} alt={item.nombre} className="product-card-image" />
            </div>
            <div className="product-card-info">
            <h3 className="product-card-name">{item.nombre}</h3>
            <p className="product-card-type">{isProduct ? item.tipo : item.categoria}</p>
            <p className="product-card-price">
                ${new Intl.NumberFormat('es-CO').format(item.precio)}
            </p>
            </div>
            <div className="product-card-actions">
            <button onClick={handleBuyNow} className="btn btn-buy">
                Comprar
            </button>
            <button onClick={handleAddToCart} className="btn btn-add-cart">
                Añadir al carrito
            </button>
            </div>
        </div>
        </Link>
    );
    };

    export default ProductCard;
