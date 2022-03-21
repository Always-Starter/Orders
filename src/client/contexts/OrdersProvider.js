import React, { useContext, useState, useEffect, useRef } from 'react'
import { useSocket } from './SocketProvider';

const OrdersContext = React.createContext();

export function useOrders() {
    return useContext(OrdersContext);
}

export function OrdersProvider({ id, children }) {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const socket = useSocket();
    const prevOrderstRef = useRef([]);

    useEffect(() => {
        if (socket == null) return;
        socket.on('order_event', (newOrders) => {
            let combinedOrders = [];
            prevOrderstRef.current.forEach(element => {
                const indexOfSameOrder = newOrders.findIndex(order => order.id === element.id);

                if (indexOfSameOrder === -1) {
                    combinedOrders.push(element);
                } else {
                    combinedOrders.push(newOrders[indexOfSameOrder]);
                    // Mark the updated order as found to avoid duplicate check
                    newOrders[indexOfSameOrder].isFound = true;
                }
            });

            newOrders.forEach(item => {
                if (!item.isFound) {
                    combinedOrders.push(item);
                }
            });

            prevOrderstRef.current = combinedOrders;
            setOrders(combinedOrders);
        })

        return () => socket.off('order_event');
    }, [socket])

    const value = {
        orders,
        searchText,
        setSearchText,
    };

    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    )
}