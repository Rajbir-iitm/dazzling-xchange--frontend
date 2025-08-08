import React from 'react';
import { Users, Globe, Shield, Zap, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Footer from '../components/Footer';

function About() {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-neutral-950 w-full">
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
                  About Dazzling Xchange
                </p>
                <h1 className="text-secondary text-5xl lg:text-7xl xl:text-8xl font-bold font-primary leading-tight">
                  Empowering Global Business, Seamlessly
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-neutral-300 text-lg lg:text-xl max-w-2xl font-primary leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                At Dazzling Xchange, we help businesses break barriers and operate confidently on the global stage. Our platform simplifies cross-border transactions, provides transparent currency exchange solutions, and ensures personalized support every step of the way.
              </motion.p>
            </motion.div>

            {/* Right: Simple Visual Element */}
            <motion.div 
              className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                  <Globe className="w-24 h-24 md:w-32 md:h-32 text-primary" />
                </div>
                
                {/* Floating elements */}
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
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      </section>

      {/* Our Mission Section */}
      <section 
        className="py-20 px-6 lg:px-24 bg-neutral-900"
        aria-labelledby="our-mission"
      >
        <h2 id="our-mission" className="sr-only">Our Mission</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Mission Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-6 font-primary">
                Our Mission
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed font-primary">
                  Our mission is to <span className="text-primary font-semibold">empower businesses to operate internationally</span> with the same ease and confidence as domestic operations.
                </p>
                
                <p className="text-neutral-300 leading-relaxed font-primary">
                  From payments and collections to risk management and financing – we provide the complete infrastructure for global commerce. Our technology bridges borders, currencies, and regulations to unlock worldwide growth potential.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { number: "130+", label: "Countries" },
                    { number: "29+", label: "Currencies" },
                    { number: "24/7", label: "Support" },
                    { number: "99.9%", label: "Uptime" }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label}
                      className="text-center p-4 bg-neutral-800 rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-xl font-bold text-primary font-primary">{item.number}</div>
                      <div className="text-sm text-neutral-400 font-primary">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Team collaboration representing global business empowerment" 
                className="w-full rounded-2xl shadow-lg card-hover-glow hover:-translate-y-1 transition-transform duration-300 ease-in-out" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section 
        className="py-20 px-6 lg:px-24 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950"
        aria-labelledby="key-metrics"
      >
        <h2 id="key-metrics" className="sr-only">Company Key Metrics and Achievements</h2>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-lg text-neutral-300 font-primary">
              Our numbers speak to our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center" ref={statsRef}>
            {[
              { value: 204, suffix: " M", prefix: "£", label: "Revenue in FY2023" },
              { value: 1000000, suffix: "+", prefix: "", label: "Payments Processed in the Last 12 Months" },
              { value: 20000, suffix: "+", prefix: "", label: "Clients Served Worldwide" },
              { value: 1600, suffix: "+", prefix: "", label: "Employees in 29+ Countries" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-800 rounded-2xl p-8 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl lg:text-4xl font-bold text-secondary font-primary mb-2">
                  {statsInView ? (
                    <>
                      {stat.prefix}
                      <CountUp 
                        end={stat.value} 
                        duration={2.5}
                        separator=","
                        delay={index * 0.2}
                      />
                      {stat.suffix}
                    </>
                  ) : (
                    `${stat.prefix}0${stat.suffix}`
                  )}
                </div>
                <p className="text-neutral-300 font-primary">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section 
        className="py-20 px-6 lg:px-24 bg-neutral-950"
        aria-labelledby="our-values"
      >
        <h2 id="our-values" className="text-3xl lg:text-4xl font-bold text-secondary mb-16 text-center font-primary">
          Our Values
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Trust & Security",
                description: "We maintain the highest standards of security and regulatory compliance to ensure your transactions are safe and reliable."
              },
              {
                icon: Zap,
                title: "Innovation",
                description: "We continuously evolve our platform with cutting-edge technology to provide the best possible user experience."
              },
              {
                icon: Users,
                title: "Customer Focus",
                description: "Our success is measured by your success. We're committed to providing personalized support and solutions."
              },
              {
                icon: Network,
                title: "Global Impact",
                description: "We're building a connected world where businesses can operate across borders as easily as within their home countries."
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="bg-neutral-800 p-6 rounded-2xl card-hover-glow transition-transform duration-300 ease-in-out hover:-translate-y-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <IconComponent className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-secondary text-xl font-semibold mb-3 font-primary">
                    {value.title}
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-primary">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;