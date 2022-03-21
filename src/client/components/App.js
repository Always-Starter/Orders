import React from 'react'
import { SocketProvider } from '../contexts/SocketProvider';
import { OrdersProvider } from '../contexts/OrdersProvider';
import OrderTable from './OrderTable';

function App() {
  // const [id, setId] = useLocalStorage('id')

  return (
    <SocketProvider>
      <OrdersProvider>
        <OrderTable />
      </OrdersProvider>
      <div>You should see a table here</div>
    </SocketProvider>
  );
}

export default App;
