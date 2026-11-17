import React from 'react';
import shoppingList from '../mockData/shoppingList';
import './ShoppingListScreen.css';

function ShoppingListScreen() {
    return (
        <div className="shopping">
            <div className="shopping__header">
                <div>
                    <h1 className="shopping__title">Shopping list</h1>
                    <p className="shopping__subtitle">Everything from this week&rsquo;s menu, grouped by aisle.</p>
                </div>
                <div className="shopping__actions">
                    <div className="shopping__action">Print</div>
                </div>
            </div>

            <div className="shopping__panel">
                <div className="shopping__panel-header">List</div>
                <div className="shopping__panel-body">
                    {shoppingList.map((group) => (
                        <div key={group.category}>
                            <div className="shopping__category">{group.category}</div>
                            {group.items.map((item) => (
                                <div className="shopping__item" key={item.name}>
                                    <div className="shopping__checkbox" />
                                    <div className="shopping__item-name">{item.name}</div>
                                    <div className="shopping__item-qty">{item.qty}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShoppingListScreen;
