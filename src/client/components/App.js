import React from 'react'
import { SocketProvider } from '../contexts/SocketProvider';
import { OrdersProvider } from '../contexts/OrdersProvider';
import OrderTable from './OrderTable';

function App() {

  return (
    <SocketProvider>
      <OrdersProvider>
        <OrderTable />
      </OrdersProvider>
    </SocketProvider>
  );
}

export default App;
