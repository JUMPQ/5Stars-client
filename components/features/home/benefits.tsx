import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Users, Shield, Layers, BarChart, Star } from "lucide-react";
const features = [
  {
    title: "Team Management",
    description: "Manage your roster, players, and team details efficiently.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Live Scoring",
    description: "Track real-time scores, fixtures, and match updates.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Competition Analytics",
    description: "Get insights into team performance and league standings.",
    icon: <BarChart className="size-5" />,
  },
  {
    title: "Secure Registration",
    description: "Register as a coach or manager with secure authentication.",
    icon: <Shield className="size-5" />,
  },
  {
    title: "Integration with Socials",
    description: "Share highlights and connect with fans via social media.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "24/7 Support",
    description: "Get help from our team for any league-related queries.",
    icon: <Star className="size-5" />,
  },
];
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Benefits = () => {
  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container w-[95%] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-center space-y-4  mb-12"
        >
          <span className="text-lg  font-bold tracking-tight text-primary">
            Everything You Need
          </span>
          <p className="max-w-200  text-3xl md:text-4xl uppercase font-extrabold ">
            Elite team management
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-linear-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-extrabold mb-2 uppercase">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
