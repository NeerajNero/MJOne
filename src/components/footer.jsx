import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-1">© 2024 Your Company Name. All rights reserved.</p>
        <p className="mb-0">
          <a href="/privacy" className="text-decoration-none me-3">
            Privacy Policy
          </a>
          <a href="/terms" className="text-decoration-none">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
