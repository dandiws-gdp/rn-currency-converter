import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api from './api'

const DEFAULT_BASE_CURRENCY = 'USD'
const DEFAULT_TARGET_CURRENCY = 'IDR'

const useConversion = () => {
  const [baseCurrency, _setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY)
  const [targetCurrency, setTargetCurrency] = useState(DEFAULT_TARGET_CURRENCY)
  const [rates, setRates] = useState<Record<string, number>>()
  const [date, setDate] = useState<string>()
  const [loading, setLoading] = useState(true)

  const conversionRate = useMemo(() => {
    if (targetCurrency === baseCurrency) {
      return 1
    }
    return rates && rates[targetCurrency]
  }, [targetCurrency, baseCurrency, rates])

  const setBaseCurrency = useCallback((currency) => {
    setLoading(true)
    api
      .latestRates(currency)
      .then((json) => {
        _setBaseCurrency(currency)
        setRates(json.rates)
        setDate(json.date)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setBaseCurrency(DEFAULT_BASE_CURRENCY)
  }, [])

  const swapCurrencies = useCallback(() => {
    setBaseCurrency(targetCurrency)
    setTargetCurrency(baseCurrency)
  }, [baseCurrency, targetCurrency])

  const convert = useCallback(
    (amount: number) => (conversionRate ? amount * conversionRate : null),
    [conversionRate]
  )

  return {
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
    swapCurrencies,
    conversionRate,
    convert,
    rates,
    date,
    loading
  }
}

type ConversionStore = ReturnType<typeof useConversion>
export const ConversionContext = createContext<ConversionStore>({} as ConversionStore)
export const useConversionContext = () => useContext(ConversionContext)
export const ConversionContextProvider: React.FC = ({ children }) => {
  const store = useConversion()
  return <ConversionContext.Provider value={store}>{children}</ConversionContext.Provider>
}
