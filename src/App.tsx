'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

const pricingTiers = [
  { pageviews: 10000, price: 8 },
  { pageviews: 50000, price: 12 },
  { pageviews: 100000, price: 16 },
  { pageviews: 500000, price: 24 },
  { pageviews: 1000000, price: 36 },
]

export default function App() {
  const [pageviews, setPageviews] = useState(100000)
  const [isYearly, setIsYearly] = useState(false)
  const [price, setPrice] = useState(16)

  useEffect(() => {
    const tier = pricingTiers.find(tier => tier.pageviews === pageviews)
    if (tier) {
      setPrice(isYearly ? tier.price * 0.75 : tier.price)
    }
  }, [pageviews, isYearly])

  const handleSliderChange = (value: number[]) => {
    const nearestTier = pricingTiers.reduce((prev, curr) => 
      Math.abs(curr.pageviews - value[0]) < Math.abs(prev.pageviews - value[0]) ? curr : prev
    )
    setPageviews(nearestTier.pageviews)
  }

  const formatPageviews = (views: number) => {
    return views >= 1000000 ? `${views / 1000000}M` : `${views / 1000}K`
  }

  return (
    <div className="min-h-screen bg-[hsl(228,10%,52%)] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[hsl(227,35%,25%)] mb-2">
          Simple, traffic-based pricing
        </h1>
        <p className="text-center text-[hsl(225,20%,60%)] mb-8">
          Sign-up for our 30-day trial. No credit card required.
        </p>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[hsl(225,20%,60%)] uppercase tracking-wider text-sm md:text-base">
              {formatPageviews(pageviews)} Pageviews
            </p>
            <p className="text-3xl font-bold text-[hsl(227,35%,25%)] flex items-center mt-4 md:mt-0">
              ${price.toFixed(2)} <span className="text-[hsl(225,20%,60%)] text-sm ml-2">/ month</span>
            </p>
          </div>
          <Slider
            value={[pageviews]}
            max={1000000}
            min={10000}
            step={1000}
            onValueChange={handleSliderChange}
            className="[&_[role=slider]]:bg-[hsl(174,86%,45%)] [&_[role=slider]]:hover:bg-[hsl(174,77%,80%)]"
          />
          <div className="flex items-center justify-end space-x-2 text-sm">
            <span className="text-[hsl(225,20%,60%)]">Monthly Billing</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className="text-[hsl(225,20%,60%)]">Yearly Billing</span>
            <span className="bg-[hsl(14,92%,95%)] text-[hsl(15,100%,70%)] text-xs font-bold px-2 py-1 rounded-full">
              -25%
            </span>
          </div>
          <div className="border-t pt-8">
            <ul className="space-y-2 mb-8">
              <li className="flex items-center text-[hsl(225,20%,60%)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(174,86%,45%)] mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Unlimited websites
              </li>
              <li className="flex items-center text-[hsl(225,20%,60%)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(174,86%,45%)] mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                100% data ownership
              </li>
              <li className="flex items-center text-[hsl(225,20%,60%)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(174,86%,45%)] mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Email reports
              </li>
            </ul>
            <Button className="w-full bg-[hsl(227,35%,25%)] hover:bg-[hsl(227,35%,35%)] text-[hsl(226,100%,87%)]">
              Start my trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
