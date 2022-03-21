import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useSocket } from './SocketProvider';

const OrdersContext = React.createContext();

export function useOrders() {
  return useContext(OrdersContext);
}

export function OrdersProvider({ id, children }) {
    const [orders, setOrders] = useState([]);
//   const [conversations, setConversations] = useLocalStorage('conversations', [])
//   const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
//   const { contacts } = useContacts()
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    socket.on('order_event', (orders) => {
        console.log(orders);
        setOrders(orders);
    })

    return () => socket.off('receive-message')
  }, [socket])

  const value = {
    orders,
  }

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  )
}