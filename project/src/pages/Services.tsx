import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Users, BarChart3, CreditCard, Globe } from 'lucide-react';
import Footer from '../components/Footer';
import { useSalesModalStore } from '../stores/salesModalStore';
import { useTranslation } from 'react-i18next';

function Services() {
  const { t } = useTranslation();
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
              {t('services.paymentsCollections')}
            </h1>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed font-primary">
              {t('services.paymentsCollections.desc')}
            </p>
          </div>

          {/* Feature Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              t('services.cards.1'),
              t('services.cards.2'),
              t('services.cards.3'),
              t('services.cards.4'),
              t('services.cards.5'),
              t('services.cards.6'),
              t('services.cards.7'),
              t('services.cards.8'),
            ].map((text, index) => (
              <motion.li 
                key={text} 
                className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1 h-[140px] w-full flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-secondary font-medium font-primary text-center leading-tight">{text}</h3>
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
              t('services.bullets.1'),
              t('services.bullets.2'),
              t('services.bullets.3'),
              t('services.bullets.4')
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
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary">{t('corporate.title')}</h2>
              <p className="text-neutral-300 leading-relaxed font-primary">
                {t('corporate.subtitle')}
              </p>
              <ol className="list-decimal list-inside text-neutral-300 space-y-3 font-primary">
                <li>{t('services.trade.steps.1')}</li>
                <li>{t('services.trade.steps.2')}</li>
                <li>{t('services.trade.steps.3')}</li>
                <li>{t('services.trade.steps.4')}</li>
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
              <h3 className="text-xl font-semibold text-secondary font-primary mb-4">{t('services.trade.example.title')}</h3>
              <ul className="mt-4 space-y-2 text-neutral-300 font-primary">
                <li>• {t('services.trade.example.loan')}</li>
                <li>• {t('services.trade.example.rate')}</li>
                <li>• {t('services.trade.example.equivalent')}</li>
                <li>• {t('services.trade.example.cost')}</li>
                <li>• {t('services.trade.example.interest')}</li>
              </ul>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="font-medium text-primary font-primary">{t('services.trade.example.ifHeld')}</p>
                <ul className="mt-2 space-y-1 text-neutral-300 font-primary">
                  <li>• {t('services.trade.example.totalInterest')}</li>
                  <li>• {t('services.trade.example.totalRepayment')}</li>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary">{t('corporate.fx.title')}</h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto font-primary">
              {t('corporate.fx.desc')}
            </p>
          </div>

          {/* Solution Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            {[
              { 
                title: t('services.fx.cards.1.title'), 
                desc: t('services.fx.cards.1.desc'),
                icon: Users
              },
              { 
                title: t('services.fx.cards.2.title'), 
                desc: t('services.fx.cards.2.desc'),
                icon: Shield
              },
              { 
                title: t('services.fx.cards.3.title'), 
                desc: t('services.fx.cards.3.desc'),
                icon: Zap
              },
              { 
                title: t('services.fx.cards.4.title'), 
                desc: t('services.fx.cards.4.desc'),
                icon: Globe
              },
            ].map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <motion.li 
                  key={solution.title} 
                  className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1 h-[200px] w-full flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <IconComponent className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-xl font-semibold text-secondary font-primary mb-3">{solution.title}</h4>
                  </div>
                  <p className="text-neutral-300 font-primary leading-relaxed">{solution.desc}</p>
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
            <h3 className="text-xl font-semibold text-secondary font-primary mb-4">{t('services.fx.playbook.title')}</h3>
            <p className="text-neutral-300 font-primary">
              {t('services.fx.playbook.desc')}
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
              <h2 className="text-4xl lg:text-5xl font-bold text-primary font-primary">{t('services.digital.title')}</h2>
              <p className="mt-4 text-neutral-300 leading-relaxed font-primary">
                {t('services.digital.desc')}
              </p>
            </div>
            
            <motion.div 
              className="bg-neutral-800 rounded-2xl p-8 shadow-lg card-hover-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-secondary font-primary mb-4">{t('services.digital.featuresTitle')}</h4>
              <ul className="mt-4 space-y-2 text-neutral-300 font-primary">
                {[
                  t('services.digital.features.1'),
                  t('services.digital.features.2'),
                  t('services.digital.features.3'),
                  t('services.digital.features.4'),
                  t('services.digital.features.5'),
                  t('services.digital.features.6')
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
              { value: "130 B+", label: t('stats.worth') },
              { value: "1 M+", label: t('stats.merchants') },
              { value: "30 X", label: t('stats.faster') },
              { value: "1 K+", label: t('stats.clients') },
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
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary mb-6">{t('institutions.title')}</h2>
              <p className="text-lg text-neutral-300 max-w-3xl mx-auto font-primary">
                {t('institutions.subtitle')}
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[
                  t('institutions.multicurrency.desc'),
                  t('institutions.localaccount.desc'), 
                  t('services.global.features.3'),
                  t('services.global.features.4'),
                  t('institutions.payments.title'),
                  t('services.global.features.6')
                ].map((feature, index) => (
                <motion.li 
                  key={index}
                  className="bg-neutral-800 rounded-2xl p-6 shadow-lg card-hover-glow transition-transform duration-300 hover:-translate-y-1 h-[120px] flex flex-col justify-center"
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
                <span className="relative z-10">{t('cta.getStartedToday')}</span>
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
      <h3 className="text-2xl lg:text-3xl font-bold text-secondary font-primary">{t('services.approach')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CreditCard className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
        <h4 className="font-semibold text-secondary font-primary">{t('labels.pay')}</h4>
        <p className="text-neutral-300 font-primary">{t('services.approach.pay')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
        <h4 className="font-semibold text-secondary font-primary">{t('labels.collect')}</h4>
        <p className="text-neutral-300 font-primary">{t('services.approach.collect')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
        <h4 className="font-semibold text-secondary font-primary">{t('labels.transact')}</h4>
        <p className="text-neutral-300 font-primary">{t('services.approach.transact')}</p>
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
        <h4 className="text-lg font-semibold text-secondary font-primary mb-6">{t('labels.platformMetrics')}</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
          { value: "99.9%", label: t('labels.uptime') },
          { value: "24/7", label: t('labels.support') },
          { value: "130+", label: t('labels.countries') },
          { value: "29+", label: t('labels.currencies') }
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
