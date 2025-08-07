import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Users, BarChart3, CreditCard, Globe } from 'lucide-react';
import Footer from '../components/Footer';
import { useSalesModalStore } from '../stores/salesModalStore';

function Services() {
  const openSalesModal = useSalesModalStore((state) => state.openModal);

  return (
    <div className="bg-neutral-950 min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-24 space-y-24">
        
        {/* Payments & Collections Hero */}
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          aria-labelledby="payments-hero"
        >
          <h2 id="payments-hero" className="sr-only">International Payments and Collections</h2>
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary font-primary">
              International Payments & Collections
            </h1>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed font-primary">
              Pay and get paid worldwide with ease, speed and security. Dazzling Xchange offers integrated
              payment solutions to help you pay, receive and manage your overseas cash flows — all in one place.
            </p>
          </div>

          {/* Feature Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              "Global Payments Made Easy",
              "Fast & Secure Transactions", 
              "Seamless Cash Flow Management",
              "All-In-One Payment Platform",
              "Integrated Pay & Collect Solutions",
              "Effortless Cross-Border Transfers",
              "Pay And Receive Effortlessly With Our Integrated Payments Solution",
              "In The Currencies And Countries Your Clients Want",
            ].map((text, index) => (
              <motion.li 
                key={text} 
                className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-secondary font-medium font-primary">{text}</h3>
              </motion.li>
            ))}
          </ul>

          {/* Bullet Features */}
          <motion.div 
            className="mt-12 max-w-2xl mx-auto space-y-3 text-neutral-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              "Open local currency accounts without physical presence",
              "Receive international payments with ease", 
              "Convert balances between currencies",
              "Use balances to make global payments"
            ].map((text, index) => (
              <p key={index} className="flex items-center font-primary">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                {text}
              </p>
            ))}
          </motion.div>
        </motion.div>

        {/* Trade Finance Section */}
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="trade-finance"
        >
          <h2 id="trade-finance" className="sr-only">Trade Finance Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: text + numbered flow */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary">Trade Finance</h2>
              <p className="text-neutral-300 leading-relaxed font-primary">
                Flexible lending solution: Dazzling Xchange Trade Finance. Our lending solution provides you
                with credit to help finance your international imports.
              </p>
              <ol className="list-decimal list-inside text-neutral-300 space-y-3 font-primary">
                <li>Your supplier sends you an invoice</li>
                <li>You forward the invoice to Dazzling Xchange and we pay your supplier</li>
                <li>You sell your goods or services</li>
                <li>You repay Dazzling Xchange up to 150 days later in your domestic currency</li>
              </ol>
            </div>
            
            {/* Right: representative example card */}
            <motion.div 
              className="bg-neutral-800 rounded-2xl p-8 shadow-lg card-hover-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-secondary font-primary mb-4">Representative Example</h3>
              <ul className="mt-4 space-y-2 text-neutral-300 font-primary">
                <li>• Loan Amount: CNY ¥430,000</li>
                <li>• Exchange Rate: 1 AUD = 4.30 CNY</li>
                <li>• Equivalent in AUD: ¥430,000 ÷ 4.30 = AUD $100,000</li>
                <li>• Funding Cost: 0.5% per month</li>
                <li>• Monthly Interest: 0.5% × AUD 100,000 = AUD $500/month</li>
              </ul>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="font-medium text-primary font-primary">If held for 3 months:</p>
                <ul className="mt-2 space-y-1 text-neutral-300 font-primary">
                  <li>• Total Interest: 3 × $500 = AUD $1,500</li>
                  <li>• Total Repayment: AUD $100,000 + AUD $1,500 = AUD $101,500</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FX Risk Management */}
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="fx-risk"
        >
          <h2 id="fx-risk" className="sr-only">Foreign Exchange Risk Management</h2>
          <div className="space-y-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary">Foreign Exchange Risk Management</h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto font-primary">
              Avoid FX risk with our tailored solutions. Get the support you need to protect your business
              from market fluctuations.
            </p>
          </div>

          {/* Solution Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { 
                title: "Dedicated Relationship Manager", 
                desc: "Supports and manages your finances with personalized expertise and guidance.",
                icon: Users
              },
              { 
                title: "Fixed Forward Contracts", 
                desc: "Lock in a currency rate up to 5 years ahead for complete predictability.",
                icon: Shield
              },
              { 
                title: "Window Forward Contracts", 
                desc: "Lock a rate and use it during a set period for maximum flexibility.",
                icon: Zap
              },
              { 
                title: "Non-deliverable Forwards", 
                desc: "Manage exposure in exotic currencies without physical delivery.",
                icon: Globe
              },
            ].map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <motion.li 
                  key={solution.title} 
                  className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <IconComponent className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-xl font-semibold text-secondary font-primary mb-3">{solution.title}</h4>
                  <p className="text-neutral-300 font-primary">{solution.desc}</p>
                </motion.li>
              );
            })}
          </ul>

          {/* Playbook Callout */}
          <motion.div 
            className="mt-12 bg-neutral-900 rounded-2xl p-8 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-secondary font-primary mb-4">FX Risk Management Playbook</h3>
            <p className="text-neutral-300 font-primary">
              Our experts' guide to build a robust risk-management framework: identify & avert risk,
              protect your margins, and budget with confidence.
            </p>
          </motion.div>
        </motion.div>

        {/* Digital Platforms */}
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="digital-platforms"
        >
          <h2 id="digital-platforms" className="sr-only">Digital Platforms and APIs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary font-primary">Digital Platforms</h2>
              <p className="mt-4 text-neutral-300 leading-relaxed font-primary">
                Discover the smart way to access and integrate Dazzling Xchange capabilities with our
                platform and APIs.
              </p>
            </div>
            
            <motion.div 
              className="bg-neutral-800 rounded-2xl p-8 shadow-lg card-hover-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-secondary font-primary mb-4">Everything you need in one place</h4>
              <ul className="mt-4 space-y-2 text-neutral-300 font-primary">
                {[
                  "Convert Currencies",
                  "Book FX Trades", 
                  "Manage Your Accounts",
                  "Pay, Receive and Request Payments",
                  "Track Cash Flows",
                  "View Balances and Statements"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Key Metrics */}
          <motion.div 
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { value: "130 B+", label: "Worth of Transactions" },
              { value: "1 M+", label: "Merchant Join" },
              { value: "30 X", label: "Faster Transactions" },
              { value: "1 K+", label: "Clients Served Worldwide" },
            ].map((metric, index) => (
              <motion.div 
                key={metric.label}
                className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl lg:text-4xl font-bold text-secondary font-primary">{metric.value}</p>
                <p className="mt-2 text-neutral-400 font-primary">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Global Accounts & Payment Solutions */}
        <motion.div 
          className="animate-fade-in"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          aria-labelledby="global-accounts"
        >
          <h2 id="global-accounts" className="sr-only">Global Accounts and Payment Solutions</h2>
          
          {/* Global Accounts Solutions */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary mb-6">Global Accounts Solutions</h2>
              <p className="text-lg text-neutral-300 max-w-3xl mx-auto font-primary">
                Open multi-currency accounts worldwide without physical presence. Manage your global finances with ease.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                "Multi-currency account management",
                "Local account details in 29+ currencies", 
                "Seamless currency conversion",
                "Real-time balance monitoring",
                "Integrated payment solutions",
                "Global regulatory compliance"
              ].map((feature, index) => (
                <motion.li 
                  key={index}
                  className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-neutral-300 font-primary">{feature}</span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <button 
                onClick={openSalesModal}
                className="px-8 py-4 border-2 border-primary text-primary bg-transparent rounded-full font-medium font-primary shadow-lg hover:scale-105 hover:bg-primary hover:text-neutral-900 hover:shadow-glow-primary transition-all duration-300 group"
              >
                <span className="relative z-10">Get Started Today</span>
              </button>
            </motion.div>
          </div>

          {/* Global Payment Solutions */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary font-primary">Our Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CreditCard className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary font-primary">Pay</h4>
                    <p className="text-neutral-300 font-primary">Send international payments in 130+ currencies with competitive rates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary font-primary">Collect</h4>
                    <p className="text-neutral-300 font-primary">Receive payments from customers worldwide directly into your accounts</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary font-primary">Transact</h4>
                    <p className="text-neutral-300 font-primary">Execute cross-border transactions with enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-secondary font-primary mb-6">Platform Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" },
                  { value: "130+", label: "Countries" },
                  { value: "29+", label: "Currencies" }
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-primary font-primary">{metric.value}</p>
                    <p className="text-sm text-neutral-400 font-primary">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Services;
