import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SignInModal from './SignInModal';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [signInOpen, setSignInOpen] = useState(false);

    const submitSearch = (e) => {
        e.preventDefault();
        navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : '/');
    };

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <NavLink to="/" className="site-header__logo">
                    Easy<span>Cook</span>
                </NavLink>

                <nav className="site-header__nav">
                    <NavLink to="/" end className="site-header__link">Recipes</NavLink>
                    <NavLink to="/collections" className="site-header__link">Collections</NavLink>
                    <NavLink to="/menus" className="site-header__link">Menus</NavLink>
                </nav>

                <div className="site-header__actions">
                    <form className="site-header__search" onSubmit={submitSearch}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <circle cx="11" cy="11" r="7"></circle>
                            <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search recipes"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                    <button
                        type="button"
                        className="site-header__signin"
                        onClick={() => setSignInOpen(true)}
                    >
                        Sign in
                    </button>
                </div>
            </div>

            {signInOpen && <SignInModal onClose={() => setSignInOpen(false)} />}
        </header>
    )
}

export default Header;
