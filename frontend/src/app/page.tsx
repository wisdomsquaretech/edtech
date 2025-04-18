'use client';
import ContactSection from "@/components/Landing-page/ContactSection";
import Footer from "@/components/FooterSection";
import Hero from "@/components/Landing-page/HeroSection";
import HowItWork from "@/components/Landing-page/HowItWorkSection";
// import Nav from "@/components/NavSection";
import Registration from "@/components/Landing-page/RegistrationSection";
import Image from "next/image";
import LanguageBannerSection from "@/components/LanguageBannerSection";
import React, { useState } from 'react';

export default function Home() {

 

  return (
    <div className="min-h-screen bg-white">
      {/* Language Banner */}
      <LanguageBannerSection/>

      {/* Navigation */}
      {/* <Nav/> */}

      {/* Hero Section */}
      <Hero/>

      {/* How It Works Section */}
      <HowItWork/>

      {/* Registration Section */}
      <Registration/>

      {/* Contact Section */}
      <ContactSection/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
