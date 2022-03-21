import React from 'react'
import { useOrders } from '../contexts/OrdersProvider';
import { formatMoney } from '../utils/utils';

export default function OrderTable() {
    const { orders, searchText } = useOrders();

    const filteredOrders = searchText ? orders.filter(order => {
        return order.price.toString().includes(searchText);
    }) : orders;

    return (
        <div>
            {
                searchText ?  (
                    <p className="order_table--count"><span>{filteredOrders.length}</span> orders found for your search of <span>{searchText}</span></p>
                ) : (
                    <p className="order_table--count"><span>{filteredOrders.length}</span> orders in total</p>
                )
            }
            <table>
                <thead>
                    <tr>
                    <th width="10%">Order ID</th>
                    <th width="10%">Order Status</th>
                    <th width="10%">Order Price</th>
                    <th width="15%">Customer</th>
                    <th width="20%">Item</th>
                    <th width="35%">Destination</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredOrders.map(order => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.event_name}</td>
                                    <td>{formatMoney(order.price)}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.item}</td>
                                    <td>{order.destination}</td>
                                </tr>
                            );
                    })}
                </tbody>
            </table>
        </div>
    )
  }