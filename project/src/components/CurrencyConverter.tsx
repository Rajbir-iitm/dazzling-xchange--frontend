import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

// Popular currency pairs
const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
];

interface ExchangeRateData {
  rate: number;
  timestamp: number;
  change24h: number;
}

interface HistoricalDataPoint {
  date: string;
  rate: number;
}

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'7D' | '30D'>('7D');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; rate: number; date: string } | null>(null);

  // Fetch current exchange rate
  const fetchExchangeRate = async (from: string, to: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();
      const rate = data.rates[to];
      
      // Calculate mock 24h change (in production, you'd fetch this from historical data)
      const change24h = (Math.random() - 0.5) * 2; // Random change between -1% and +1%

      setExchangeRate({
        rate,
        timestamp: Date.now(),
        change24h,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rates');
      console.error('Error fetching exchange rate:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch historical data
  const fetchHistoricalData = async (from: string, to: string, period: '7D' | '30D') => {
    try {
      // Generate mock historical data
      // In production, you'd use a service like https://exchangerate.host/ or CoinAPI
      const days = period === '7D' ? 7 : 30;
      const data: HistoricalDataPoint[] = [];
      const baseRate = exchangeRate?.rate || 1;
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate realistic-looking fluctuations
        const variance = baseRate * 0.05; // 5% variance
        const fluctuation = (Math.random() - 0.5) * variance;
        const rate = baseRate + fluctuation;
        
        data.push({
          date: date.toISOString().split('T')[0],
          rate: parseFloat(rate.toFixed(4)),
        });
      }
      
      setHistoricalData(data);
    } catch (err) {
      console.error('Error fetching historical data:', err);
    }
  };

  // Initial fetch and refetch when currencies change
  useEffect(() => {
    fetchExchangeRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  // Fetch historical data when rate is loaded or period changes
  useEffect(() => {
    if (exchangeRate) {
      fetchHistoricalData(fromCurrency, toCurrency, selectedPeriod);
    }
  }, [exchangeRate?.rate, selectedPeriod]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchExchangeRate(fromCurrency, toCurrency);
    }, 60000);

    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  const toCurrencyData = currencies.find(c => c.code === toCurrency);

  // Handle mouse move over chart
  const handleChartMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (historicalData.length === 0) return;

    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - padding.left;
    const mouseY = event.clientY - rect.top - padding.top;

    if (mouseX < 0 || mouseX > innerWidth || mouseY < 0 || mouseY > innerHeight) {
      setHoveredPoint(null);
      return;
    }

    // Find closest data point
    const index = Math.round((mouseX / innerWidth) * (historicalData.length - 1));
    const dataPoint = historicalData[index];

    if (dataPoint) {
      const minRate = Math.min(...historicalData.map(d => d.rate));
      const maxRate = Math.max(...historicalData.map(d => d.rate));
      const rateRange = maxRate - minRate || 1;
      const paddingFactor = 0.2;
      const paddedMin = minRate - (rateRange * paddingFactor);
      const paddedMax = maxRate + (rateRange * paddingFactor);
      const paddedRange = paddedMax - paddedMin;

      const x = (index / (historicalData.length - 1)) * innerWidth;
      const y = innerHeight - ((dataPoint.rate - paddedMin) / paddedRange) * innerHeight;

      setHoveredPoint({
        x: x + padding.left,
        y: y + padding.top,
        rate: dataPoint.rate,
        date: dataPoint.date,
      });
    }
  };

  const handleChartMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Calculate chart dimensions
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Generate SVG path for the chart with smooth curves
  const generateChartPath = () => {
    if (historicalData.length === 0) return '';

    const minRate = Math.min(...historicalData.map(d => d.rate));
    const maxRate = Math.max(...historicalData.map(d => d.rate));
    const rateRange = maxRate - minRate || 1;
    
    // Add 20% padding to top and bottom for better visualization
    const paddingFactor = 0.2;
    const paddedMin = minRate - (rateRange * paddingFactor);
    const paddedMax = maxRate + (rateRange * paddingFactor);
    const paddedRange = paddedMax - paddedMin;

    const points = historicalData.map((point, index) => {
      const x = (index / (historicalData.length - 1)) * innerWidth;
      const y = innerHeight - ((point.rate - paddedMin) / paddedRange) * innerHeight;
      return { x, y };
    });

    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x},${points[0].y}`;
    
    // Create smooth curve using cubic bezier curves (Catmull-Rom style)
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      
      // Calculate control points for smooth curve
      const tension = 0.3; // Adjust this for more/less curve smoothness
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;
      
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return path;
  };

  // Generate gradient fill path
  const generateFillPath = () => {
    if (historicalData.length === 0) return '';
    
    const path = generateChartPath();
    return `${path} L ${innerWidth},${innerHeight} L 0,${innerHeight} Z`;
  };

  return (
    <div className="w-full space-y-12">
      {/* Currency Pair Display Card */}
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Currency Selectors */}
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* From Currency Box */}
          <div className="flex-1 max-w-xs">
            <label className="block text-neutral-400 text-xs mb-2 font-primary uppercase tracking-wide">From</label>
            <div className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/50 rounded-xl p-4 hover:border-primary/50 transition-all">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-transparent text-white font-primary text-lg border-0 focus:outline-none cursor-pointer appearance-none"
                style={{ colorScheme: 'dark' }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapCurrencies}
            className="p-3 bg-primary hover:bg-primary/80 rounded-full transition-all duration-300 hover:scale-110 group mb-1"
            aria-label="Swap currencies"
          >
            <svg
              className="w-6 h-6 text-neutral-900 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>

          {/* To Currency Box */}
          <div className="flex-1 max-w-xs">
            <label className="block text-neutral-400 text-xs mb-2 font-primary uppercase tracking-wide">To</label>
            <div className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/50 rounded-xl p-4 hover:border-primary/50 transition-all">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-transparent text-white font-primary text-lg border-0 focus:outline-none cursor-pointer appearance-none"
                style={{ colorScheme: 'dark' }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Exchange Rate Display */}
        {loading && !exchangeRate ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-neutral-400 mt-4 font-primary">Loading exchange rate...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 font-primary">{error}</p>
            <button
              onClick={() => fetchExchangeRate(fromCurrency, toCurrency)}
              className="mt-4 px-6 py-2 bg-primary text-neutral-900 rounded-full font-primary hover:bg-primary/80 transition-all"
            >
              Retry
            </button>
          </div>
        ) : exchangeRate ? (
          <div className="text-center space-y-4">
            {/* Rate */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${fromCurrency}-${toCurrency}-${exchangeRate.rate}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <div className="text-primary text-6xl font-extrabold font-primary">
                  <CountUp
                    end={exchangeRate.rate}
                    decimals={4}
                    duration={1}
                    separator=","
                    preserveValue
                  />
                </div>
                <p className="text-neutral-400 text-lg font-primary">
                  1 {fromCurrencyData?.symbol} {fromCurrency} = {exchangeRate.rate.toFixed(4)} {toCurrencyData?.symbol} {toCurrency}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 24h Change */}
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold font-primary ${
                exchangeRate.change24h >= 0
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span>{exchangeRate.change24h >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(exchangeRate.change24h).toFixed(2)}% today</span>
            </motion.div>

            {/* Last Updated */}
            <p className="text-neutral-500 text-sm font-primary">
              Last updated: {new Date(exchangeRate.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ) : null}
      </motion.div>

      {/* Historical Rates Chart */}
      <motion.div
        className="bg-gradient-to-br from-emerald-950/30 to-slate-900/30 rounded-2xl p-6 border border-emerald-900/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white text-2xl font-bold font-primary">Historical Rates</h2>
            <p className="text-neutral-400 text-sm font-primary">
              {fromCurrency} to {toCurrency} exchange rate trend
            </p>
          </div>

          {/* Time Period Selector */}
          <div className="flex gap-2">
            {(['7D', '30D'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 font-primary font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-primary text-neutral-900 rounded-lg'
                    : 'bg-transparent text-neutral-400 hover:text-primary border-0'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="w-full overflow-x-auto">
          {historicalData.length > 0 ? (
            <svg
              width="100%"
              height={chartHeight}
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="xMidYMid meet"
              className="min-w-full"
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <g transform={`translate(${padding.left}, ${padding.top})`}>
                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                  <line
                    key={ratio}
                    x1="0"
                    y1={innerHeight * ratio}
                    x2={innerWidth}
                    y2={innerHeight * ratio}
                    stroke="#065f46"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.2"
                  />
                ))}
                
                {/* Vertical Grid lines */}
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio) => (
                  <line
                    key={`v-${ratio}`}
                    x1={innerWidth * ratio}
                    y1="0"
                    x2={innerWidth * ratio}
                    y2={innerHeight}
                    stroke="#065f46"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.2"
                  />
                ))}

                {/* Area fill */}
                <path
                  d={generateFillPath()}
                  fill="url(#chartGradient)"
                />

                {/* Line */}
                <path
                  d={generateChartPath()}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 0 4px rgba(16, 185, 129, 0.6))"
                />

                {/* Y-axis labels */}
                {historicalData.length > 0 && (() => {
                  const minRate = Math.min(...historicalData.map(d => d.rate));
                  const maxRate = Math.max(...historicalData.map(d => d.rate));
                  const rateRange = maxRate - minRate || 1;
                  const paddingFactor = 0.2;
                  const paddedMin = minRate - (rateRange * paddingFactor);
                  const paddedMax = maxRate + (rateRange * paddingFactor);
                  const midRate = (paddedMin + paddedMax) / 2;
                  
                  return [paddedMin, midRate, paddedMax].map((value, index) => (
                    <text
                      key={index}
                      x="-10"
                      y={innerHeight - (index * innerHeight / 2)}
                      fill="#9ca3af"
                      fontSize="12"
                      textAnchor="end"
                      dominantBaseline="middle"
                    >
                      {value.toFixed(2)}
                    </text>
                  ));
                })()}

                {/* X-axis labels */}
                {[0, Math.floor(historicalData.length / 2), historicalData.length - 1].map((index) => {
                  if (!historicalData[index]) return null;
                  return (
                    <text
                      key={index}
                      x={(index / (historicalData.length - 1)) * innerWidth}
                      y={innerHeight + 20}
                      fill="#9ca3af"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {new Date(historicalData[index].date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </text>
                  );
                })}
              </g>

              {/* Hover indicator and tooltip */}
              {hoveredPoint && (() => {
                const tooltipWidth = 120;
                const tooltipHeight = 50;
                const tooltipPadding = 10;
                
                // Calculate tooltip position to keep it within bounds
                let tooltipX = hoveredPoint.x;
                let tooltipY = hoveredPoint.y - tooltipHeight - 15;
                
                // Prevent tooltip from going off left edge
                if (tooltipX - tooltipWidth / 2 < tooltipPadding) {
                  tooltipX = tooltipWidth / 2 + tooltipPadding;
                }
                
                // Prevent tooltip from going off right edge
                if (tooltipX + tooltipWidth / 2 > chartWidth - tooltipPadding) {
                  tooltipX = chartWidth - tooltipWidth / 2 - tooltipPadding;
                }
                
                // If tooltip would go off top, show it below the point instead
                if (tooltipY < padding.top) {
                  tooltipY = hoveredPoint.y + 15;
                }
                
                return (
                  <g>
                    {/* Vertical line */}
                    <line
                      x1={hoveredPoint.x}
                      y1={padding.top}
                      x2={hoveredPoint.x}
                      y2={chartHeight - padding.bottom}
                      stroke="#10b981"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    
                    {/* Dot on line */}
                    <circle
                      cx={hoveredPoint.x}
                      cy={hoveredPoint.y}
                      r="5"
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    
                    {/* Tooltip */}
                    <g transform={`translate(${tooltipX}, ${tooltipY})`}>
                      <rect
                        x={-tooltipWidth / 2}
                        y="0"
                        width={tooltipWidth}
                        height={tooltipHeight}
                        rx="8"
                        fill="#1f2937"
                        stroke="#10b981"
                        strokeWidth="2"
                        filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))"
                      />
                      {/* Rate */}
                      <text
                        x="0"
                        y="20"
                        fill="#10b981"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {hoveredPoint.rate.toFixed(4)}
                      </text>
                      {/* Date */}
                      <text
                        x="0"
                        y="38"
                        fill="#9ca3af"
                        fontSize="12"
                        textAnchor="middle"
                      >
                        {new Date(hoveredPoint.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </text>
                    </g>
                  </g>
                );
              })()}
            </svg>
          ) : (
            <div className="flex items-center justify-center h-48">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CurrencyConverter;

