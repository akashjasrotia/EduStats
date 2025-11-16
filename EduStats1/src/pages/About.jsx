import { motion } from "framer-motion";
import { useThemeStore } from "../stores/ThemeStore";
import { BarChart3, UploadCloud, Eye, ShieldCheck, LineChart } from "lucide-react";

export default function About() {
  const darkMode = useThemeStore((s) => s.darkMode);

  const text = darkMode ? "text-gray-200" : "text-gray-800";
  const subText = darkMode ? "text-gray-400" : "text-gray-600";
  const bg = darkMode ? "bg-slate-950" : "bg-gray-50";

  return (
    <div className={`${bg} min-h-screen px-6 lg:px-24 py-16 transition-all`}>
      
      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-6xl font-bold mb-4 ${text}`}
        >
          Empowering Education Through Data
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-lg ${subText}`}
        >
          EduStats transforms raw academic data into beautiful, meaningful, and easy-to-understand insights.
        </motion.p>
      </section>

      {/* MISSION SECTION */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl p-10 shadow-xl ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <h2 className={`text-2xl font-semibold mb-4 ${text}`}>Our Mission</h2>
          <p className={`${subText} leading-relaxed`}>
            We’re building a simplified platform where students and educators 
            can visualize performance, track growth, upload data, and convert it into powerful insights —
            all without the complexity of traditional analytics tools.
          </p>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className={`text-3xl font-semibold text-center mb-12 ${text}`}>
          What Makes EduStats Different?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className={`p-8 rounded-2xl shadow-lg text-center ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <BarChart3 className="mx-auto text-mainBlue" size={42} />
            <h3 className={`mt-4 text-xl font-semibold ${text}`}>Data Visualization</h3>
            <p className={`${subText} mt-2`}>
              Transform your numbers into clean charts and dashboards instantly.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03 }}
            className={`p-8 rounded-2xl shadow-lg text-center ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <UploadCloud className="mx-auto text-mainBlue" size={42} />
            <h3 className={`mt-4 text-xl font-semibold ${text}`}>Upload Anything</h3>
            <p className={`${subText} mt-2`}>
              Import CSV, Excel, or text data — we turn it into insights.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03 }}
            className={`p-8 rounded-2xl shadow-lg text-center ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <Eye className="mx-auto text-mainBlue" size={42} />
            <h3 className={`mt-4 text-xl font-semibold ${text}`}>Insights at a Glance</h3>
            <p className={`${subText} mt-2`}>
              Understand trends, performance and improvements with ease.
            </p>
          </motion.div>

        </div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className={`text-3xl font-semibold text-center mb-12 ${text}`}>
          Our Journey
        </h2>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-xl shadow ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <h4 className={`text-xl font-semibold ${text}`}>📌 The Idea</h4>
            <p className={`${subText} mt-1`}>
              EduStats began as a simple concept to help students visualize progress without complicated tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-xl shadow ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <h4 className={`text-xl font-semibold ${text}`}>⚙ Building the Platform</h4>
            <p className={`${subText} mt-1`}>
              We crafted a modern UI, secure login system, dark mode, dashboards, and upload tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-xl shadow ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <h4 className={`text-xl font-semibold ${text}`}>🚀 The Future</h4>
            <p className={`${subText} mt-1`}>
              AI insights, prediction models, trend forecasting — coming soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="text-center max-w-3xl mx-auto mt-10">
        <h2 className={`text-2xl font-semibold mb-4 ${text}`}>
          Ready to Explore Your Data?
        </h2>
        <p className={`${subText} mb-6`}>
          Start your journey with beautiful dashboards and clean insights.
        </p>

        <a
          href="/home"
          className="
            inline-block bg-mainBlue text-white px-8 py-3 rounded-xl 
            hover:bg-mainBlue/90 transition-all shadow-md
          "
        >
          Get Started →
        </a>
      </section>
    </div>
  );
}
