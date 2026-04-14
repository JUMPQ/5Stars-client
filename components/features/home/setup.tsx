import { motion } from "framer-motion";
import { Badge } from "lucide-react";
const Setup = () => {
  return (
    <section className="w-full py-20 md:py-32  relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      <div className="container w-[95%] mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-center space-y-4  mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
            How it <span className="text-primary">works</span>
          </h2>
          <p className="max-w-lg text-muted-foreground md:text-lg">
            Three steps to professional glory. Start journey from the grassroots
            today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-16 ">
          {[
            {
              step: "1",
              title: "Register as Coach",
              description:
                "Sign up as a head coach or team manager with your details.",
            },
            {
              step: "2",
              title: "Build Your Team",
              description:
                "Add players, customize your roster, and prepare for matches.",
            },
            {
              step: "3",
              title: "Compete & Track",
              description:
                "Participate in tournaments and monitor live scores and standings.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="  flex flex-col items-start "
            >
              <span className="text-6xl md:text-7xl font-extrabold text-primary/20">
                {step.step}
              </span>
              <div className="px-4">
                <h3 className="text-xl font-extrabold uppercase">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Setup;
