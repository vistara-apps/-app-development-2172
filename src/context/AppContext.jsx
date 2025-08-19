import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { format, addMonths, isAfter, isBefore, addDays } from 'date-fns'

const AppContext = createContext()

const initialState = {
  user: {
    userId: '1',
    email: 'user@example.com',
    subscriptionTier: 'free',
    createdAt: new Date()
  },
  subscriptions: [
    {
      subscriptionId: '1',
      userId: '1',
      serviceName: 'Netflix',
      planType: 'Premium',
      cost: 15.99,
      renewalDate: addDays(new Date(), 5),
      billingCycle: 'monthly'
    },
    {
      subscriptionId: '2',
      userId: '1',
      serviceName: 'Disney+',
      planType: 'Standard',
      cost: 7.99,
      renewalDate: addDays(new Date(), 12),
      billingCycle: 'monthly'
    },
    {
      subscriptionId: '3',
      userId: '1',
      serviceName: 'HBO Max',
      planType: 'Ad-Free',
      cost: 14.99,
      renewalDate: addDays(new Date(), 3),
      billingCycle: 'monthly'
    }
  ],
  watchlistItems: [
    {
      watchlistItemId: '1',
      userId: '1',
      contentTitle: 'The Last of Us',
      contentId: 'tlou-001',
      streamAvailability: ['HBO Max'],
      addedDate: new Date()
    },
    {
      watchlistItemId: '2',
      userId: '1',
      contentTitle: 'Stranger Things',
      contentId: 'st-001',
      streamAvailability: ['Netflix'],
      addedDate: new Date()
    }
  ],
  viewingHabits: [
    {
      habitId: '1',
      userId: '1',
      contentTitle: 'Breaking Bad',
      genre: 'Drama',
      rating: 9.5,
      viewedDate: new Date()
    }
  ],
  recommendations: [
    {
      id: '1',
      title: 'House of the Dragon',
      genre: 'Fantasy',
      rating: 8.5,
      availableOn: ['HBO Max'],
      description: 'Epic fantasy drama set in the world of Westeros'
    },
    {
      id: '2',
      title: 'The Bear',
      genre: 'Comedy-Drama',
      rating: 8.7,
      availableOn: ['Hulu'],
      description: 'A young chef returns to Chicago to run his deceased brother\'s sandwich shop'
    }
  ]
}

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload]
      }
    case 'UPDATE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub =>
          sub.subscriptionId === action.payload.subscriptionId
            ? action.payload
            : sub
        )
      }
    case 'DELETE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          sub => sub.subscriptionId !== action.payload
        )
      }
    case 'ADD_WATCHLIST_ITEM':
      return {
        ...state,
        watchlistItems: [...state.watchlistItems, action.payload]
      }
    case 'REMOVE_WATCHLIST_ITEM':
      return {
        ...state,
        watchlistItems: state.watchlistItems.filter(
          item => item.watchlistItemId !== action.payload
        )
      }
    case 'UPGRADE_USER':
      return {
        ...state,
        user: { ...state.user, subscriptionTier: 'premium' }
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const addSubscription = (subscription) => {
    const newSubscription = {
      ...subscription,
      subscriptionId: Date.now().toString(),
      userId: state.user.userId
    }
    dispatch({ type: 'ADD_SUBSCRIPTION', payload: newSubscription })
  }

  const updateSubscription = (subscription) => {
    dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: subscription })
  }

  const deleteSubscription = (subscriptionId) => {
    dispatch({ type: 'DELETE_SUBSCRIPTION', payload: subscriptionId })
  }

  const addToWatchlist = (content) => {
    const newItem = {
      watchlistItemId: Date.now().toString(),
      userId: state.user.userId,
      contentTitle: content.title,
      contentId: content.id,
      streamAvailability: content.availableOn,
      addedDate: new Date()
    }
    dispatch({ type: 'ADD_WATCHLIST_ITEM', payload: newItem })
  }

  const removeFromWatchlist = (itemId) => {
    dispatch({ type: 'REMOVE_WATCHLIST_ITEM', payload: itemId })
  }

  const upgradeUser = () => {
    dispatch({ type: 'UPGRADE_USER' })
  }

  const getUpcomingRenewals = () => {
    const thirtyDaysFromNow = addDays(new Date(), 30)
    return state.subscriptions.filter(sub =>
      isAfter(sub.renewalDate, new Date()) &&
      isBefore(sub.renewalDate, thirtyDaysFromNow)
    ).sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))
  }

  const getTotalMonthlyCost = () => {
    return state.subscriptions.reduce((total, sub) => {
      if (sub.billingCycle === 'monthly') {
        return total + sub.cost
      } else if (sub.billingCycle === 'yearly') {
        return total + (sub.cost / 12)
      }
      return total
    }, 0)
  }

  const getTotalYearlyCost = () => {
    return state.subscriptions.reduce((total, sub) => {
      if (sub.billingCycle === 'monthly') {
        return total + (sub.cost * 12)
      } else if (sub.billingCycle === 'yearly') {
        return total + sub.cost
      }
      return total
    }, 0)
  }

  const value = {
    ...state,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    addToWatchlist,
    removeFromWatchlist,
    upgradeUser,
    getUpcomingRenewals,
    getTotalMonthlyCost,
    getTotalYearlyCost
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}