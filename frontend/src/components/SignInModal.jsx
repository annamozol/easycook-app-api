import React, { useEffect, useState } from 'react';
import './SignInModal.css';

function SignInModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className="signin-modal__backdrop" onClick={onClose}>
            <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="signin-modal__close" onClick={onClose} aria-label="Close">×</button>

                <div className="signin-modal__title">Sign in</div>
                <div className="signin-modal__subtitle">Welcome back — pick up your menus and recipes.</div>

                <form className="signin-modal__form" onSubmit={handleSubmit}>
                    <label className="signin-modal__field">
                        <span>Email</span>
                        <input
                            type="email"
                            required
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </label>

                    <label className="signin-modal__field">
                        <span>Password</span>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </label>

                    <button type="submit" className="signin-modal__submit">Sign in</button>
                </form>

                <div className="signin-modal__footer">New to EasyCook? <span>Create an account</span></div>
            </div>
        </div>
    )
}

export default SignInModal;
