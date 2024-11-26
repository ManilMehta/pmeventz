import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './pmevents.svg';
import carasoul1 from './images/carasoul1.JPEG';
import carasoul2 from './images/carasoul2.JPEG';
import carasoul3 from './images/carasoul3.JPEG';
import carasoul4 from './images/carasoul4.JPEG';
import carasoul5 from './images/carasoul5.JPG';
import carasoul6 from './images/carasoul6.JPG';
import fremontkebob from './images/fremontkebob.png';
import freshmeatfactory from './images/freshmeatfactory.png';
import myfinelook from './images/myfinelook.png';
import qualityautodealership from './images/qualityautodealership.png';
import skyviewaviation from './images/skyviewaviation.png';
import thub from './images/thub.png';
import westvalleydisposal from './images/westvalleydispoal.png';
import flyer from './images/flyer.png'; 

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

    const images = [carasoul1, carasoul2, carasoul3, carasoul4, carasoul5, carasoul6];

    const moveToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const moveToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            moveToNext();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gallery-container">
            <button className="gallery-arrow left" onClick={moveToPrev}>
                &#10094;
            </button>
            <div className="gallery-content">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`gallery-slide ${index === currentIndex ? 'active' : 'inactive'}`}
                    >
                        <img src={image} alt={`Gallery Image ${index + 1}`} className="gallery-image" />
                    </div>
                ))}
            </div>
            <button className="gallery-arrow right" onClick={moveToNext}>
                &#10095;
            </button>
            <div className="gallery-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

function MultiLogoCarousel() {
    const logos = [skyviewaviation, freshmeatfactory, myfinelook, qualityautodealership, fremontkebob, thub, westvalleydisposal, fremontkebob, thub, skyviewaviation, myfinelook];

    return (
        <div className="logos">
            <div className="logos-slide">
                {logos.map((logo, index) => (
                    <img src={logo} alt={`Logo ${index + 1}`} key={index} />
                ))}
                {logos.map((logo, index) => (
                    <img src={logo} alt={`Logo Duplicate ${index + 1}`} key={`duplicate-${index}`} />
                ))}
            </div>
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

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://server.fillout.com/embed/v1/';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="App">
            <StarryBackground />
            <header className="App-header">
                <div className="header-content">
                    <img src={logo} alt="PM Events Logo" className="logo" draggable={"false"} />
                    <nav className="menu-bar">
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

            <section id="logo-carousel" className="section">
                <MultiLogoCarousel />
            </section>

            {/* Updated Tournaments Section */}
            <section id="tournaments" className="section tournaments-section">
                <h2>Upcoming Tournament!</h2>
                <div className="tournament-content">
                    <div className="tournament-details">
                        <p>
                            Indoor Volleyball Tournament - January 19th, 2025 <br />
                            @MHHS - Large and Small Gym <br />
                            $200 entry per team, Max 8 per team.
                        </p>
                        <p>
                            <strong>Cash Prizes + Trophies:</strong> <br />
                            Advanced - 1st: $1250, 2nd: $750 <br />
                            Beginner - 1st: $650, 2nd: $350
                        </p>
                        <p>
                            Come out and enjoy the various food vendors! Water will be provided for all teams.
                        </p>
                        <div
                            data-fillout-id="qhzk5QLXFHus"
                            data-fillout-embed-type="popup"
                            data-fillout-button-text="Register Now"
                            data-fillout-dynamic-resize
                            data-fillout-button-color="#FCCF0A"
                            data-fillout-button-size="medium"
                            data-fillout-popup-size="medium"
                            className="register-button"
                        ></div>
                    </div>
                    <div className="tournament-flyer">
                        <img src={flyer} alt="Tournament Flyer" />
                    </div>
                </div>
            </section>

            <section id="gallery" className="section">
                <Gallery />
            </section>

            <section id="about-us" className="section">About Us Section</section>
            <ContactSection />
        </div>
    );
}

export default App;
