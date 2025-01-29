'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription,
} from '@/components/ui/card'

interface Props {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    isPremium?: boolean;
    isHome?: boolean;
}

const PricingCard = ({ title, price, description, features, buttonText, isPremium = false, isHome }: Props) => (
    <Card className={`w-full max-w-sm ${isPremium ? 'border-primary' : ''}`}>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-4">
                <span className="text-4xl font-bold">{price}</span>
                {price !== 'Free' && <span className="text-muted-foreground">/month</span>}
            </div>
            <ul className="space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter>
            <Button className="w-full" variant={isPremium || isHome ? 'default' : 'outline'}>
                {buttonText}
            </Button>
        </CardFooter>
    </Card>
)

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false)
    const pathname = usePathname();
    const isHome = pathname === '/';

    console.log("pathname", isHome);

    return (
        <div id="pricing" className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
                <div className="flex items-center justify-center mt-6">
                    <span className="mr-3">Monthly</span>
                    <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                    <span className="ml-3">Yearly (Save 20%)</span>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:ml-32 justify-center">
                <PricingCard
                    title="Free"
                    price="Free"
                    description="For individuals just getting started"
                    features={[
                        'Basic features',
                        'Up to 1,000 subscribers',
                        'Email support'
                    ]}
                    buttonText={`${isHome}` === "true" ? "Get started" : "Your current plan"}
                    isHome={isHome}
                />
                <PricingCard
                    title="Premium"
                    price={isYearly ? '$79' : '$99'}
                    description="For professionals and growing businesses"
                    features={[
                        'All Free features',
                        'Unlimited subscribers',
                        'Advanced analytics',
                        'Priority support',
                        'Custom branding'
                    ]}
                    buttonText={`${isHome}` === "true" ? "Get started" : "Upgrade to Premium"}
                    isPremium={true}
                />
            </div>
        </div>
    )
}

