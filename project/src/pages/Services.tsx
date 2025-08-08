import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Users, BarChart3, CreditCard, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import { useSalesModalStore } from '../stores/salesModalStore';

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
              {t('services.payments.title')}
            </h1>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed font-primary">
              {t('services.payments.description')}
            </p>
          </div>

          {/* Feature Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              t('services.payments.features.global'),
              t('services.payments.features.fast'),
              t('services.payments.features.seamless'),
              t('services.payments.features.platform'),
              t('services.payments.features.integrated'),
              t('services.payments.features.effortless'),
              t('services.payments.features.solution'),
              t('services.payments.features.currencies'),
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
              t('services.payments.bullets.accounts'),
              t('services.payments.bullets.receive'),
              t('services.payments.bullets.convert'),
              t('services.payments.bullets.payments')
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
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary">{t('services.trade.title')}</h2>
              <p className="text-neutral-300 leading-relaxed font-primary">
                {t('services.trade.description')}
              </p>
              <ol className="list-decimal list-inside text-neutral-300 space-y-3 font-primary">
                <li>{t('services.trade.step1')}</li>
                <li>{t('services.trade.step2')}</li>
                <li>{t('services.trade.step3')}</li>
                <li>{t('services.trade.step4')}</li>
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
                <li>• {t('services.trade.example.funding')}</li>
                <li>• {t('services.trade.example.interest')}</li>
              </ul>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="font-medium text-primary font-primary">{t('services.trade.example.held')}</p>
                <ul className="mt-2 space-y-1 text-neutral-300 font-primary">
                  <li>• {t('services.trade.example.total')}</li>
                  <li>• {t('services.trade.example.repayment')}</li>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary">{t('services.fx.title')}</h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto font-primary">
              {t('services.fx.description')}
            </p>
          </div>

          {/* Solution Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            {[
              { 
                title: t('services.fx.manager.title'),
                desc: t('services.fx.manager.description'),
                icon: Users
              },
              { 
                title: t('services.fx.fixed.title'),
                desc: t('services.fx.fixed.description'),
                icon: Shield
              },
              { 
                title: t('services.fx.window.title'),
                desc: t('services.fx.window.description'),
                icon: Zap
              },
              { 
                title: t('services.fx.nondeliverable.title'),
                desc: t('services.fx.nondeliverable.description'),
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
              {t('services.fx.playbook.description')}
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
                {t('services.digital.description')}
              </p>
            </div>
            
            <motion.div 
              className="bg-neutral-800 rounded-2xl p-8 shadow-lg card-hover-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-secondary font-primary mb-4">{t('services.digital.features.title')}</h4>
              <ul className="mt-4 space-y-2 text-neutral-300 font-primary">
                {[
                  t('services.digital.features.convert'),
                  t('services.digital.features.book'),
                  t('services.digital.features.manage'),
                  t('services.digital.features.pay'),
                  t('services.digital.features.track'),
                  t('services.digital.features.view')
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
              { value: t('services.digital.metrics.transactions.value'), label: t('services.digital.metrics.transactions.label') },
              { value: t('services.digital.metrics.merchants.value'), label: t('services.digital.metrics.merchants.label') },
              { value: t('services.digital.metrics.speed.value'), label: t('services.digital.metrics.speed.label') },
              { value: t('services.digital.metrics.clients.value'), label: t('services.digital.metrics.clients.label') },
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
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary font-primary mb-6">{t('services.accounts.title')}</h2>
              <p className="text-lg text-neutral-300 max-w-3xl mx-auto font-primary">
                {t('services.accounts.description')}
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                t('services.accounts.features.multi_currency'),
                t('services.accounts.features.local_details'),
                t('services.accounts.features.conversion'),
                t('services.accounts.features.monitoring'),
                t('services.accounts.features.integrated'),
                t('services.accounts.features.compliance')
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
                <span className="relative z-10">{t('services.accounts.cta')}</span>
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
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary font-primary">{t('services.accounts.approach.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CreditCard className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary font-primary">{t('services.accounts.approach.pay.title')}</h4>
                    <p className="text-neutral-300 font-primary">{t('services.accounts.approach.pay.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary font-primary">{t('services.accounts.approach.collect.title')}</h4>
                    <p className="text-neutral-300 font-primary">{t('services.accounts.approach.collect.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary font-primary">{t('services.accounts.approach.transact.title')}</h4>
                    <p className="text-neutral-300 font-primary">{t('services.accounts.approach.transact.description')}</p>
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
              <h4 className="text-lg font-semibold text-secondary font-primary mb-6">{t('services.accounts.platform.title')}</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: t('services.accounts.platform.uptime.value'), label: t('services.accounts.platform.uptime.label') },
                  { value: t('services.accounts.platform.support.value'), label: t('services.accounts.platform.support.label') },
                  { value: t('services.accounts.platform.countries.value'), label: t('services.accounts.platform.countries.label') },
                  { value: t('services.accounts.platform.currencies.value'), label: t('services.accounts.platform.currencies.label') }
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
