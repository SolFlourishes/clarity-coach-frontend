// src/pages/CompanyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HearthArch from '../components/HearthArch';
import { Button } from '@/components/ui/button'; // Assumes shadcn/ui setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const CompanyPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-brand-cream p-4 sm:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center my-12">
          <HearthArch className="w-24 h-12 text-brand-terracotta mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-charcoal tracking-tight">
            Hearthside Works
          </h1>
          <p className="font-sans text-lg text-brand-charcoal/80 mt-2">
            Building tools for warmth, connection, and understanding.
          </p>
        </header>
        <section className="text-center my-16">
          <h2 className="text-3xl font-serif text-brand-terracotta">
            "Hear Me, See Me, Know Me."
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-brand-charcoal/90">
            Our work is guided by a simple belief: that the best technology helps us connect more deeply with one another. Like a hearth, our tools are designed to be a safe, central place for gathering and mutual understanding.
          </p>
        </section>
        <section className="my-12">
          <Card className="w-full shadow-lg border-brand-terracotta/20 text-center">
            <CardHeader><CardTitle className="text-2xl">Our Flagship Product</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-6 max-w-prose">
                Clarity Coach is a communication tool designed to help you speak with intention and listen with empathy.
              </p>
              <Link to="/app">
                <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-base py-6 px-8">
                  Open Clarity Coach <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="text-center mt-16 mb-8 w-full">
        <p className="text-brand-charcoal/70">&copy; {new Date().getFullYear()} Hearthside Works, LLC.</p>
      </footer>
    </div>
  );
};

export default CompanyPage;