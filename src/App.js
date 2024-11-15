import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './pmevents.svg';

function StarryBackground() {
    const stars = Array.from({ length: 200 }, (_, i) => (
        <div
            key={i}
            className="star"
            style={{
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`
            }}
        ></div>
    ));

    return <div className="starry-background">{stars}</div>;
}

function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'https://via.placeholder.com/400x300?text=Image+1',
        'https://via.placeholder.com/400x300?text=Image+2',
        'https://via.placeholder.com/400x300?text=Image+3',
        'https://via.placeholder.com/400x300?text=Image+4',
        'https://via.placeholder.com/400x300?text=Image+5',
    ];

    const moveToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const moveToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            moveToNext();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gallery">
            <button className="gallery-arrow left" onClick={moveToPrev}>
                &#10094; {/* Left arrow */}
            </button>
            <div className="gallery-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index + 1}`}
                        className={`gallery-image ${
                            index === currentIndex ? 'active' : 'inactive'
                        }`}
                    />
                ))}
            </div>
            <button className="gallery-arrow right" onClick={moveToNext}>
                &#10095; {}
            </button>
        </div>
    );
}

function App() {
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <div className="App">
            <StarryBackground /> {}

            <header className="App-header">
                <div className="header-content">
                    <img src={logo} alt="PM Events Logo" className="logo" draggable={"false"}/>
                    <nav className="menu-bar">
                        <button onClick={() => scrollToSection('events')}>Events</button>
                        <button onClick={() => scrollToSection('tournaments')}>Tournaments</button>
                        <button onClick={() => scrollToSection('gallery')}>Gallery</button>
                        <button onClick={() => scrollToSection('about-us')}>About Us</button>
                    </nav>
                </div>
            </header>

            <div className="center-logo">
                <img src={logo} alt="PM Events Central Logo" className="central-logo" draggable={"false"} />
            </div>

            <section id="events" className="section">Events Section</section>
            <section id="tournaments" className="section">Tournaments Section</section>
            <section id="gallery" className="section">
                <Gallery />
            </section>
            <section id="about-us" className="section">About Us Section</section>
        </div>
    );
}

export default App;
