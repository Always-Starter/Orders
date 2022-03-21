import React from 'react'
import { SocketProvider } from '../contexts/SocketProvider';
import { OrdersProvider } from '../contexts/OrdersProvider';
import OrderTable from './OrderTable';
import PriceSearch from './PriceSearch';

function App() {
  return (
    <SocketProvider>
      <OrdersProvider>
        <div className="orders__container">
          <p className="page-title">Order Table</p>
          <PriceSearch />
          <OrderTable />
        </div>
      </OrdersProvider>
    </SocketProvider>
  );
}

export default App;
