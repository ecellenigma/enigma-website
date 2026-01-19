import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import EventsSection from '../sections/EventsSection';
import TeamSection from '../sections/TeamSection';
import ContactSection from '../sections/ContactSection';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <EventsSection />
            <TeamSection />
            <ContactSection />
        </main>
    );
}
