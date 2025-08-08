import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function TermsOfUse() {
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
            <FileText className="w-12 h-12 text-primary mr-4" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary font-primary">
                Terms of Use
              </h1>
              <p className="text-neutral-400 font-primary mt-2">
                The rules that govern how you use our platform and services.
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
              Welcome to Dazzling Xchange. By accessing or using our website or services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">1. Use of Services</h2>
              <p>
                You agree to use our services only for lawful purposes and in accordance with all applicable laws and regulations. You may not use our platform to engage in fraudulent, harmful, or illegal activities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">2. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the property of Dazzling Exchange or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or modify any part of the site without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">3. User Accounts</h2>
              <p>
                Certain features may require account registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">4. Service Availability</h2>
              <p>
                We strive to ensure uninterrupted access to our services but do not guarantee availability at all times. We may suspend or terminate access for maintenance, updates, or unforeseen issues.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">5. Limitation of Liability</h2>
              <p>
                To the extent permitted by law, Dazzling Exchange shall not be liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. Continued use of our services after any changes constitutes your acceptance of the new Terms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

export default TermsOfUse;
