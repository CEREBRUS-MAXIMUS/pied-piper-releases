import Head from 'next/head';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Surfer - AI-Powered Web Browser</title>
        <meta name="description" content="Surfer: An AI web browser that surfs the internet for you and completes actions automatically." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <Features />
      </main>

      <footer className="bg-background text-center py-4 text-sm text-muted-foreground">
        <p>&copy; 2024 Surfer. All rights reserved.</p>
      </footer>
    </div>
  );
}