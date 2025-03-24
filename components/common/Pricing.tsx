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
import Link from 'next/link'

interface Props {
    title: string;
    href: string;
    price: string;
    isHome?: boolean;
    features: string[];
    buttonText: string;
    description: string;
    isPremium?: boolean;
}

interface Props {
    title: string;
    href: string;
    price: string;
    isHome?: boolean;
    features: string[];
    buttonText: string;
    description: string;
    isPremium?: boolean;
}

const PricingCard = ({ href, title, price, description, features, buttonText, isPremium = false, isHome }: Props) => (
    <Card className={`w-full max-w-sm bg-black/[0.96] ${isPremium ? 'border-purple-400' : ''}`}>
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
            <Link
                href={href}
                className="w-full p-2 rounded text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
                {buttonText}
            </Link>
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
                <h2 className="text-3xl text-gray-300 font-bold mb-4">Simple, transparent pricing</h2>
                <div className="flex items-center justify-center mt-6">
                    <span className="mr-3 text-gray-400">Monthly</span>
                    <Switch className='text-gray-300' checked={isYearly} onCheckedChange={setIsYearly} />
                    <span className="ml-3 text-gray-400">Yearly (Save 20%)</span>
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
                    href='#'
                />
                <PricingCard
                    title="Premium"
                    price={isYearly ? 'Ksh 140' : 'ksh 150'}
                    description="For professionals and growing businesses"
                    features={[
                        'Unlimited timetables',
                        'Advanced analytics',
                        'Priority support',
                        'Custom branding'
                    ]}
                    buttonText={`${isHome}` === "true" ? "Get started" : "Upgrade to Premium"}
                    isPremium={true}
                    href={`/dashboard/subscribe?yearly=${isYearly}`}
                />
            </div>
        </div>
    )
}

