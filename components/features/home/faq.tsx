import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
const FaqSection = () => {
  return (
    <section id="faq" className="w-full bg-muted/40 py-20 md:py-32">
      <div className="container w-[95%] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <p className="max-w-200 text-muted-foreground md:text-lg">
            Find answers to common questions about the 5Stars platform.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "How do I register my team?",
                answer:
                  "Click 'Become a Coach' to open the registration modal and sign up as a coach or manager.",
              },
              {
                question: "Is there a fee to join?",
                answer:
                  "No, registration is free. Participate in various leagues comes at a cost though.",
              },
              {
                question: "How can I track live matches?",
                answer:
                  "Once registered, access the dashboard for real-time scores and updates.",
              },
              {
                question:
                  "What regions are eligible for the 5stars football Consultancy leagues?",
                answer:
                  "Currently focused on Nigeria, with teams from Abuja, Lagos, and more.",
              },
              {
                question: "How secure is my account?",
                answer:
                  "We use secure authentication and encryption to protect your data.",
              },
              {
                question: "What kind of support do you offer?",
                answer:
                  "Email support and community forums are available for all users.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className=""
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="py-2 bg-white shadow-sm  mb-4  px-5"
                >
                  <AccordionTrigger className="text-left font-bold hover:no-underline uppercase">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
