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

function TypewriterCycle({ baseText, words }) {
    const [displayedText, setDisplayedText] = useState(baseText);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedWord, setTypedWord] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];
        let charIndex = isDeleting ? typedWord.length - 1 : typedWord.length;

        const type = () => {
            if (!isDeleting && charIndex < word.length) {
                setTypedWord(word.substring(0, charIndex + 1));
                charIndex++;
            } else if (isDeleting && charIndex >= 0) {
                setTypedWord(word.substring(0, charIndex));
                charIndex--;
            } else if (!isDeleting && charIndex === word.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex < 0) {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const typingInterval = setTimeout(type, isDeleting ? 100 : 150);

        return () => clearTimeout(typingInterval);
    }, [typedWord, isDeleting, currentWordIndex, words]);

    return (
        <span>
            {baseText}{" "}
            <span className="typewriter">
                <span className="typewriter-word">{typedWord}</span>
                <span className="typewriter-cursor">|</span>
            </span>
        </span>
    );
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

function ContactSection() {
    return (
        <section id="contact" className="contact-section">
            <h2>Contact Us</h2>
            <textarea className="contact-textarea" placeholder="Write your message here..." />
            <button className="contact-button">Contact</button>
        </section>
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
                        <button onClick={() => scrollToSection('contact')}>Contact</button>
                    </nav>
                </div>
            </header>

            <div className="center-logo">
                <img src={logo} alt="PM Events Central Logo" className="central-logo" draggable={"false"} />
                <div className="typewriter-container">
                    <span>
                        Creating unforgettable <span className="typewriter"><TypewriterCycle baseText="" words={["tournaments", "events", "bashes"]} /></span>
                    </span>
                </div>
            </div>

            

            <section id="events" className="section">Events Section</section>
            <section id="tournaments" className="section">Tournaments Section</section>
            <section id="gallery" className="section">
                <Gallery />
            </section>
            <section id="about-us" className="section">About Us Section</section>
            <ContactSection />
        </div>
    );
}

export default App;