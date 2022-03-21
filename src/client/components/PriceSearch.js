import React from 'react';
import { useOrders } from '../contexts/OrdersProvider';
import { debounce } from '../utils/utils';

export default function PriceSearch() {
    const { setSearchText } = useOrders();

    const onSearchPrice = debounce(function (price) {
        const priceValue = parseFloat(price) || '';
        setSearchText(priceValue);
    }, 300)

    return (
        <div className="price-search__container">
            Price Search: 
            <input
                type="number"
                onChange={(e) => {
                    onSearchPrice(e.target.value);
                }}
            />
        </div>
    );
}