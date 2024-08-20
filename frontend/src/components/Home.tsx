"use client"
import React from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #0B0D17;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavBrand = styled.div`
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  color: #F0F0F0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: #F0F0F0;
    text-decoration: none;
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
      color: #F39C12;
    }
  }
`;

const HeroSection = styled.section`
  background-image: url('/DRDO.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: #F0F0F0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

const HeroText = styled.h1`
  font-size: 3rem;
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  font-family: 'Arial', sans-serif;
  margin-bottom: 2rem;
`;

const CTAButton = styled.a`
  padding: 1rem 2rem;
  background-color: #F39C12;
  color: #0B0D17;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #D35400;
  }
`;

const FeaturesSection = styled.section`
  background-color: #0B0D17;
  color: #F0F0F0;
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  p {
    font-family: 'Arial', sans-serif;
    margin-bottom: 1.5rem;
  }
`;

const Footer = styled.footer`
  background-color: #0B0D17;
  color: #F0F0F0;
  padding: 2rem 2rem;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const Home: React.FC = () => {
  return (
    <>
      <Navbar>
        <NavBrand>DRDO Recruitment</NavBrand>
        <NavLinks>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </NavLinks>
      </Navbar>

      <HeroSection id="home">
        <HeroText>Join the Elite Force</HeroText>
        <SubText>Your path to joining DRDO starts here</SubText>
        <CTAButton href="/interview">Register</CTAButton>
      </HeroSection>

      <FeaturesSection id="features">
        <h2>Why Choose Our Interview Platform?</h2>
        <p>Secure and confidential interview environment.</p>
        <p>Easy scheduling and real-time notifications.</p>
        <p>In-depth candidate assessment tools.</p>
      </FeaturesSection>

      <Footer>
        &copy; 2024 DRDO Recruitment | All Rights Reserved
      </Footer>
    </>
  );
};

export default Home;
