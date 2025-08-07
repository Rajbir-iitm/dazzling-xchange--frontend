import React, { useState, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { useSalesModalStore } from '../stores/salesModalStore';
import ComingSoonModal from '../components/ComingSoonModal';

// Lazy load the currency animation for performance
const CurrencyAnimation = lazy(() => import('../components/CurrencyAnimation'));

function Home() {
  const { t } = useTranslation();
  const openSalesModal = useSalesModalStore((state) => state.openModal);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah M.",
      text: "Dazzling Xchange made my international transfers so easy and fast! Highly recommended.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "John D.",
      text: "Excellent customer support and great rates. I use it for all my business payments.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Priya S.",
      text: "The app is super intuitive and the process is seamless. Love the cashback rewards!",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Carlos R.",
      text: "Fast transfers and no hidden fees. My go-to for sending money abroad.",
      image: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
      name: "Emily T.",
      text: "I referred my friends and earned rewards. Great experience overall!",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    }
  ];

  // Create multiple sets for seamless infinite loop
  // We need at least 3 full sets to ensure smooth looping with 33.33% scroll
  const allTestimonials = [
    ...testimonials.map((t, i) => ({ ...t, id: `set1-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `set2-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `set3-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `set4-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `set5-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `set6-${i}` }))
  ];

  return (
    <>
      {/* Top Right Login Button */}
      <motion.div 
        className="absolute top-4 right-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          className="px-6 py-3 bg-secondary text-neutral-900 rounded-full font-medium font-primary shadow-lg hover:scale-105 hover:shadow-glow-primary transition-all duration-300 animate-pulse-subtle"
          onClick={() => window.open('https://odazzlingxchangeptyltd.ebury.com/login/?next=/', '_blank')}
        >
          {t('hero.login')}
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center w-full overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div 
              className="space-y-6 md:space-y-8 z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="text-primary text-lg lg:text-xl font-medium font-primary tracking-wide mb-4 uppercase">
                  Dazzling Xchange
                </p>
                <h1 className="text-secondary text-5xl lg:text-7xl xl:text-8xl font-bold font-primary leading-tight">
            {t('hero.title')}
          </h1>
              </motion.div>
              
              <motion.p 
                className="text-neutral-300 text-lg lg:text-xl max-w-2xl font-primary leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
            {t('hero.description')}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
            <button
              onClick={openSalesModal}
              className="
                    px-8 py-4 border-2 border-primary text-primary bg-transparent
                    rounded-full font-medium font-primary shadow-lg
                    hover:scale-105 hover:bg-primary hover:text-neutral-900
                    hover:shadow-glow-primary
                    transition-all duration-300 group
                  "
                >
                  <span className="relative z-10">{t('hero.sales')}</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right: Currency Animation */}
            <motion.div 
              className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 animate-pulse flex items-center justify-center">
                    <div className="text-primary text-4xl font-bold">$€¥£</div>
                  </div>
                </div>
              }>
                <CurrencyAnimation />
              </Suspense>
              
              {/* Floating elements around globe */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full blur-sm"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.div
                className="absolute top-3/4 right-1/4 w-2 h-2 bg-accent rounded-full blur-sm"
                animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 right-1/6 w-1 h-1 bg-secondary rounded-full blur-sm"
                animate={{ x: [0, 5, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      </section>

      {/* Testimonials Section - Continuous Scroll */}
      <section className="testimonials bg-neutral-900 py-16 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-secondary text-3xl lg:text-4xl font-bold font-primary mb-16 text-center px-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>

          {/* Continuous scroll container */}
          <div className="testimonial-carousel-wrapper">
            <div className="testimonial-scroll-container">
              <div className="testimonial-scroll-track">
                {allTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-primary shadow-lg mx-auto"
                    />
                    <p className="text-neutral-300 text-lg font-primary leading-relaxed mb-6 text-center italic">
                      "{testimonial.text}"
                    </p>
                    <h3 className="text-secondary text-lg font-medium font-primary text-center">{testimonial.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Trade Payment Made Easy - Hero Copy */}
      <section 
        className="w-full py-20 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950"
        aria-labelledby="trade-payment-hero"
      >
        <h2 id="trade-payment-hero" className="sr-only">International Trade Payment Solutions</h2>
        <div className="max-w-4xl mx-auto text-center space-y-6 px-6">
          <motion.h2 
            className="text-3xl lg:text-4xl font-semibold text-white font-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            International Trade Payment Made Easy.
            <br />
            Global Business Payment Made Easy.
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-300 leading-relaxed font-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Unleash your global growth. From payments and collections, to tailored risk management and unsecured financing.
            DAZZLING XCHANGE is your
            <strong className="text-primary"> one-stop shop for all your international trade needs.</strong>
          </motion.p>
          <motion.button 
            className="px-8 py-4 border-2 border-primary text-primary bg-transparent rounded-full font-medium font-primary shadow-lg hover:scale-105 hover:bg-primary hover:text-neutral-900 hover:shadow-glow-primary transition-all duration-300 group mt-4"
            onClick={openSalesModal}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            aria-label="Get started with international trade payments"
          >
            <span className="relative z-10">Ready to Get Started?</span>
          </motion.button>
        </div>
      </section>



      {/* Smart Global Financial Solutions */}
      <section 
        className="py-20 px-6 lg:px-24 bg-neutral-900"
        aria-labelledby="global-solutions"
      >
        <h2 id="global-solutions" className="sr-only">Smart Global Financial Solutions</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl lg:text-4xl font-semibold text-white font-primary">
                Smart Global Financial Solutions for Modern Businesses
              </h3>
              <p className="text-lg text-neutral-300 leading-relaxed font-primary">
                We simplify cross-border commerce by providing intelligent financial solutions that adapt to your business needs. 
                From instant payments to comprehensive risk management, we're your partner in global expansion.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-neutral-300 font-primary">Instant Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-neutral-300 font-primary">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-neutral-300 font-primary">Global Reach</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image Placeholder */}
            <motion.div 
              className="w-full h-80 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-700"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary text-2xl">🌐</span>
                </div>
                <p className="text-neutral-400 font-primary">Global Network Visualization</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section 
        className="py-20 px-6 lg:px-24 bg-neutral-950"
        aria-labelledby="company-stats"
      >
        <h2 id="company-stats" className="sr-only">Company Statistics and Achievements</h2>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-12 py-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-white font-primary">$130B+</p>
              <p className="text-neutral-400 font-primary">Worth of Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white font-primary">1M+</p>
              <p className="text-neutral-400 font-primary">Merchants Joined</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white font-primary">30X</p>
              <p className="text-neutral-400 font-primary">Faster Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white font-primary">1K+</p>
              <p className="text-neutral-400 font-primary">Clients Served Worldwide</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Businesses Trust - Cards */}
      <section 
        className="py-20 px-6 lg:px-24 bg-neutral-900"
        aria-labelledby="why-trust"
      >
        <h2 id="why-trust" className="text-3xl lg:text-4xl font-semibold text-white text-center font-primary mb-16">
          Why Businesses Trust Dazzling Xchange
        </h2>

        {/* Trust Cards Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Trusted Regulatory Compliance",
                description: "Fully licensed and regulated by financial authorities worldwide",
                icon: "🛡️",
                bgGradient: "from-blue-500/20 to-primary/20"
              },
              {
                title: "Fast and Flexible Financing",
                description: "Quick access to funding with flexible terms tailored to your needs",
                icon: "⚡",
                bgGradient: "from-yellow-500/20 to-primary/20"
              },
              {
                title: "Tailored Business Solutions",
                description: "Customized financial solutions designed for your specific industry",
                icon: "🎯",
                bgGradient: "from-purple-500/20 to-primary/20"
              },
              {
                title: "Global Partnership Network",
                description: "Extensive network of banking partners across 130+ countries",
                icon: "🌐",
                bgGradient: "from-green-500/20 to-primary/20"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-all duration-300 hover:-translate-y-2 border border-neutral-700 overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-50`}></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-primary/20">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 font-primary">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-neutral-300 text-sm font-primary leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Check Icon */}
                  <div className="mt-4 flex items-center">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-neutral-900 text-sm font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-primary text-sm font-medium font-primary">Verified</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <button 
            className="px-8 py-4 bg-primary text-neutral-900 rounded-full font-medium font-primary shadow-lg hover:scale-105 hover:shadow-glow-primary transition-all duration-300"
            onClick={openSalesModal}
            aria-label="Start your business journey with Dazzling Xchange"
          >
            Start Your Journey
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
    </>
  );
}

export default Home;