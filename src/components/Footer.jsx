import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#">Plans</FooterLink>
          <FooterLink href="#">Terms of Use</FooterLink>
          <FooterLink href="#">Copyright</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">FAQs</FooterLink>
        </FooterLinks>
        <FooterText>NetaFlim India</FooterText>
      </FooterContent>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem 0;
  color: white;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }

  @media (max-width: 360px) {
    padding: 0.25rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FooterLink = styled.a`
  color: white;
  margin: 0.5rem 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0.5rem;
  }

  @media (max-width: 480px) {
    margin: 0.5rem 0.3rem;
  }

  @media (max-width: 360px) {
    margin: 0.5rem 0.2rem;
  }
`;

const FooterText = styled.p`
  margin: 1rem 0 0;
  font-size: 0.85rem;
`;
