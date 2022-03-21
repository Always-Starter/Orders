import React from 'react'
import { useOrders } from '../contexts/OrdersProvider';

export default function OrderTable() {
    const { orders } = useOrders();

    return (
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