import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuWeekLabel, menuCategories } from '../mockData/menus';
import './MenusScreen.css';

function MenusScreen() {
    const [sel, setSel] = useState({});

    const isOn = (id) => (id in sel ? sel[id] : true);

    const toggle = (id) => {
        setSel((cur) => ({ ...cur, [id]: !isOn(id) }));
    };

    const { total, count } = useMemo(() => {
        let t = 0, c = 0;
        menuCategories.forEach((cat) => cat.dishes.forEach((d) => {
            t++;
            if (isOn(d.id)) c++;
        }));
        return { total: t, count: c };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sel]);

    const allSelected = total > 0 && count === total;

    const toggleAll = () => {
        const target = !allSelected;
        const next = {};
        menuCategories.forEach((cat) => cat.dishes.forEach((d) => { next[d.id] = target; }));
        setSel(next);
    };

    return (
        <div className="menus">
            <div className="menus__breadcrumb">
                <span className="menus__breadcrumb-current">Your menus</span>
                <span className="menus__breadcrumb-sep">&rsaquo;</span>
                <span className="menus__breadcrumb-week">{menuWeekLabel}</span>
            </div>

            <div className="menus__grid">
                {menuCategories.map((cat) => (
                    <div className="menus__category" key={cat.name}>
                        <div className="menus__category-header">{cat.name}</div>
                        <div className="menus__category-body">
                            {cat.dishes.map((dish) => {
                                const on = isOn(dish.id);
                                return (
                                    <div className="menus__dish" key={dish.id}>
                                        <div
                                            className={`menus__checkbox ${on ? 'menus__checkbox--on' : ''}`}
                                            onClick={() => toggle(dish.id)}
                                        >
                                            {on && <span>✓</span>}
                                        </div>
                                        <div className="menus__dish-body">
                                            <div className="menus__dish-photo" />
                                            <div className="menus__dish-name">{dish.name}</div>
                                        </div>
                                        <span className="menus__dish-servings">{dish.servings}</span>
                                    </div>
                                );
                            })}
                            <div className="menus__add-item">Add item</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="menus__actions">
                <div className="menus__action menus__action--primary">+ Add item</div>
                <div className="menus__action" onClick={toggleAll}>{allSelected ? 'Clear all' : 'Select all'}</div>
                <div className="menus__action">Delete items</div>
                <div className="menus__action">Columns &amp; groups</div>
                <div className="menus__actions-spacer" />
                <Link to="/shopping-list" className="menus__action menus__action--shopping">
                    {count > 0 ? `Shopping list · ${count}` : 'Shopping list'}
                </Link>
            </div>
        </div>
    )
}

export default MenusScreen;
