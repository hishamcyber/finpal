// src/utils/formatters.js
export const formatCurrency = (amount, currency = 'JPY') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (dateString, options = {}) => {
  const defaultOptions = { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

export const formatNumber = (num, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}