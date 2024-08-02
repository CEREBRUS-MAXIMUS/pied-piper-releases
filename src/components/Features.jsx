import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    title: "Automated Form Filling",
    description: "Save time with AI-powered form completion across the web."
  },
  {
    title: "Privacy-Focused",
    description: "Your data stays local, ensuring maximum privacy and security."
  },
  {
    title: "Lightning-Fast",
    description: "Experience blazing-fast browsing and task completion."
  },
  {
    title: "Authenticated Scraping",
    description: "Access and interact with authenticated content seamlessly."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card text-card-foreground h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}