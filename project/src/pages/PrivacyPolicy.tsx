import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function PrivacyPolicy() {
  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 lg:px-24">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center text-primary hover:text-accent transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium font-primary">Back to Home</span>
          </Link>
          
          <div className="flex items-center mb-6">
            <Shield className="w-12 h-12 text-primary mr-4" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary font-primary">
                Privacy Policy
              </h1>
              <p className="text-neutral-400 font-primary mt-2">
                Your data, your rights — how we protect your privacy.
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-neutral-500 text-sm font-primary">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last updated: 06/06/2025</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-neutral-300 font-primary leading-relaxed space-y-8">
            <p>
              Dazzling Exchange values your privacy. This policy explains how we collect, use, and protect your personal information.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">1. Information We Collect</h2>
              <p className="mb-4">We may collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal data (e.g. name, email, phone number)</li>
                <li>Financial details for transaction purposes</li>
                <li>Technical data (e.g. IP address, device type)</li>
                <li>Usage data (e.g. pages visited, actions taken)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">Your information is used to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Process transactions</li>
                <li>Communicate with you</li>
                <li>Ensure security and compliance</li>
                <li>Develop new features and offerings</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">3. Sharing of Information</h2>
              <p>
                We do not sell your personal information. We may share data with trusted partners for the purposes of service delivery, regulatory compliance, and fraud prevention.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">5. Your Rights</h2>
              <p>
                You may request access, correction, or deletion of your personal data. Contact us at hello@dazzlingxchange.com for any privacy-related inquiries.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">6. Cookies</h2>
              <p>
                Our website may use cookies to improve user experience and analyze traffic. You can manage cookie preferences in your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
