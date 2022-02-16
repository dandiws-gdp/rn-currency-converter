import { createContext, useCallback, useContext, useState } from 'react'

const useConversion = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [targetCurrency, setTargetCurrency] = useState('IDR')
  const [conversionRate, setConversionRate] = useState(14000)

  const swapCurrencies = useCallback(() => {
    setBaseCurrency(targetCurrency)
    setTargetCurrency(baseCurrency)
    setConversionRate((c) => 1 / c)
  }, [baseCurrency, targetCurrency])

  return {
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
    swapCurrencies,
    conversionRate
  }
}

type ConversionStore = ReturnType<typeof useConversion>
export const ConversionContext = createContext<ConversionStore>({} as ConversionStore)
export const useConversionContext = () => useContext(ConversionContext)
export const ConversionContextProvider: React.FC = ({ children }) => {
  const store = useConversion()
  return <ConversionContext.Provider value={store}>{children}</ConversionContext.Provider>
}
