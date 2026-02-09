import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from 'react';
import './Toast.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: number;
    title: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    showToast: (title: string, message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastItemProps extends Toast {
    onClose: (id: number) => void;
}

const ToastItem = ({ id, title, message, type, duration = 4000, onClose }: ToastItemProps) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => onClose(id), 400); // Match animation duration
    }, [id, onClose]);

    useEffect(() => {
        const timer = setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
    }, [duration, handleClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>;
            case 'error':
                return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
            case 'warning':
                return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
            default:
                return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
        }
    };

    return (
        <div className={`toast-item toast-${type} ${isClosing ? 'closing' : ''}`}>
            <div className="toast-icon">
                {getIcon()}
            </div>
            <div className="toast-content">
                <div className="toast-title">{title}</div>
                <div className="toast-message">{message}</div>
            </div>
            <button className="toast-close-btn" onClick={handleClose}>&times;</button>
            <div className="toast-progress" style={{ animation: `progress-bar ${duration}ms linear forwards` }}></div>
        </div>
    );
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((title: string, message: string, type: ToastType, duration?: number) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, title, message, type, duration }]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <ToastItem key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
