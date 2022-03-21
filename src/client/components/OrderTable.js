import React from 'react'
import { useOrders } from '../contexts/OrdersProvider';
import '../app.css';

export default function OrderTable() {
    const { orders } = useOrders();
    // console.log('Hi, here are your orders', orders);
    return (
        <table>
            <thead>
                <tr>
                <th>#</th>
                <th>Order Status</th>
                <th>Order Price</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Destination</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(order => {
                        return (
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.event_name}</td>
                                <td>{order.price}</td>
                                <td>{order.customer}</td>
                                <td>{order.item}</td>
                                <td>{order.destination}</td>
                            </tr>
                        );
                })}
            </tbody>
        </table>
    )
  }