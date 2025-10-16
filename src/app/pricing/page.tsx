import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Cadet',
    price: 'Free',
    features: [
      'Access to basic templates',
      'AI content suggestions',
      'Up to 3 resume downloads (MD)',
    ],
    cta: 'Start for Free',
    href: '/builder',
    isFeatured: false,
  },
  {
    name: 'Commander',
    price: '$9.99',
    pricePeriod: '/ month',
    features: [
      'Access to all premium templates',
      'Unlimited AI enhancements',
      'Unlimited PDF and Markdown downloads',
      'Priority ATS checker',
      'Priority support',
    ],
    cta: 'Upgrade Now',
    href: '/signup',
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
        'Team accounts and management',
        'Custom template designs',
        'API access for integrations',
        'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    isFeatured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Pricing Plans</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the right plan to accelerate your career trajectory.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {tiers.map(tier => (
          <Card key={tier.name} className={`bg-secondary/30 border-primary/10 flex flex-col ${tier.isFeatured ? 'border-primary border-2 shadow-xl scale-105' : ''}`}>
            <CardHeader>
              <CardTitle className="text-3xl">{tier.name}</CardTitle>
              <CardDescription className="text-4xl font-bold text-foreground">
                {tier.price}
                {tier.pricePeriod && <span className="text-sm font-normal text-muted-foreground">{tier.pricePeriod}</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className={`w-full ${tier.isFeatured ? 'glow-on-hover' : ''}`} variant={tier.isFeatured ? 'default' : 'outline'}>
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
