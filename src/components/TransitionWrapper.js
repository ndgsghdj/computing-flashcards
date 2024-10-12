// src/components/TransitionWrapper.js

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './TransitionWrapper.css'; // Import CSS for animations

const TransitionWrapper = ({ children }) => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                timeout={300}
                classNames="fade" // Specify the class names for the animation
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

export default TransitionWrapper;

