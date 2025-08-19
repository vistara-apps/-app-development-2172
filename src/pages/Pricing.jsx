import React from 'react'
import { Check, Crown, Star } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { useApp } from '../context/AppContext'

function Pricing() {
  const { user, upgradeUser } = useApp()

  const plans = [
    {
      name: 'Free',
      price: '$0',
      billing: 'forever',
      description: 'Basic subscription tracking and alerts',
      features: [
        'Track up to 5 subscriptions',
        'Basic renewal alerts',
        'Monthly spending overview',
        'Simple dashboard'
      ],
      limitations: [
        'Limited to 5 subscriptions',
        'Basic alerts only',
        'No content discovery',
        'No watchlist sync'
      ],
      current: user.subscriptionTier === 'free'
    },
    {
      name: 'Premium',
      price: '$5',
      billing: 'per month',
      yearlyPrice: '$50',
      description: 'Advanced discovery engine and unlimited tracking',
      features: [
        'Unlimited subscription tracking',
        'Advanced renewal alerts',
        'Cross-platform content discovery',
        'Unified watchlist synchronization',
        'Personalized recommendations',
        'Detailed spending analytics',
        'Priority customer support',
        'Ad-free experience'
      ],
      popular: true,
      current: user.subscriptionTier === 'premium'
    }
  ]

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-display text-text-primary mb-4">Choose Your Plan</h1>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          Start with our free plan or unlock advanced features with Premium. 
          Take control of your entertainment subscriptions today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`relative ${plan.popular ? 'border-accent border-2' : ''} ${plan.current ? 'ring-2 ring-primary' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-accent text-bg px-3 py-1 rounded-full text-caption font-medium flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            {plan.current && (
              <div className="absolute -top-3 right-4">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-caption font-medium">
                  Current Plan
                </div>
              </div>
            )}

            <Card.Header>
              <div className="text-center">
                <h3 className="text-heading1 text-text-primary">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-display text-accent">{plan.price}</span>
                  <span className="text-body text-text-secondary">/{plan.billing}</span>
                </div>
                {plan.yearlyPrice && (
                  <p className="text-caption text-text-secondary mt-2">
                    or {plan.yearlyPrice}/year (save $10)
                  </p>
                )}
                <p className="text-body text-text-secondary mt-4">{plan.description}</p>
              </div>
            </Card.Header>

            <Card.Content>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-body text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.limitations && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-caption text-text-secondary mb-3">Limitations:</p>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-start space-x-3">
                        <span className="text-red-400 mt-0.5">×</span>
                        <span className="text-body text-text-secondary">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Content>

            <Card.Footer>
              {plan.current ? (
                <Button variant="secondary" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : plan.name === 'Premium' ? (
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={upgradeUser}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              ) : (
                <Button variant="secondary" className="w-full" disabled>
                  Free Plan
                </Button>
              )}
            </Card.Footer>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-heading1 text-text-primary text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {[
            {
              question: "Can I cancel my subscription anytime?",
              answer: "Yes, you can cancel your Premium subscription at any time. You'll continue to have access to Premium features until the end of your billing period."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, PayPal, and other secure payment methods through our payment processor."
            },
            {
              question: "How does the content discovery feature work?",
              answer: "Our Premium discovery engine analyzes your viewing habits and subscription services to recommend relevant content available across your platforms."
            },
            {
              question: "Is my subscription data secure?",
              answer: "Yes, we use industry-standard encryption to protect your data. We never store your streaming service passwords or payment information."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <Card.Content>
                <h3 className="text-heading2 text-text-primary mb-2">{faq.question}</h3>
                <p className="text-body text-text-secondary">{faq.answer}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing