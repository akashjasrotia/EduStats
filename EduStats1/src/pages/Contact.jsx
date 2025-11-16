import { useThemeStore } from "../stores/ThemeStore";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const darkMode = useThemeStore((s) => s.darkMode);

  const bg = darkMode
    ? "bg-slate-950"
    : "bg-white";

  const text = darkMode ? "text-gray-100" : "text-gray-900";
  const subtle = darkMode ? "text-gray-400" : "text-gray-600";
  const card = darkMode
    ? "bg-white/5 border-white/10"
    : "bg-white shadow-lg border-gray-200";

  const input = darkMode
    ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500"
    : "bg-gray-50 border-gray-300 placeholder:text-gray-400";

  const sendMessage = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      style: { background: "#0B82F0", color: "white" },
    });
  };

  return (
    <div className={`${bg} font-Raleway min-h-screen px-6 lg:px-24 py-20 transition-all duration-300`}>

      <div className="grid border-2 border-gray-300 p-12 md:p-24 rounded-3xl grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{duration:0.5}}
          className="flex flex-col gap-10"
        >
          <div>
            <h2 className={`text-5xl md:text-7xl font-semibold mb-4 ${text}`}>
              Get in, <br/> Touch with us.
            </h2>
            <p className={`text-lg ${subtle}`}>
              We're here to help! Whether you have a question about our services, need assistance with your account, or want to provide feedback, our team is ready to assist you.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-lg">
            <div className="flex items-center gap-4">
              <Mail className="text-mainBlue" />
              <span className={subtle}>akashjasrotia2005@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-mainBlue" />
              <span className={subtle}>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-mainBlue" />
              <span className={subtle}>Jalandhar, India</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{duration:0.5}}
          onSubmit={sendMessage}
          className={`p-10 rounded-2xl border ${card} backdrop-blur-xl flex flex-col gap-6`}
        >
          <input
            type="text"
            placeholder="Your name"
            required
            className={`p-4 rounded-xl border ${input} focus:ring-2 ring-mainBlue outline-none`}
          />

          <input
            type="email"
            placeholder="Your email"
            required
            className={`p-4 rounded-xl border ${input} focus:ring-2 ring-mainBlue outline-none`}
          />

          <textarea
            placeholder="Your message..."
            rows="5"
            required
            className={`p-4 rounded-xl border ${input} focus:ring-2 ring-mainBlue outline-none`}
          ></textarea>

          <button
            type="submit"
            className="
              flex items-center justify-center gap-3 bg-mainBlue text-white 
              py-3 rounded-xl font-medium text-lg
              hover:bg-mainBlue/90 transition-all
            "
          >
            Send Message <Send size={20} />
          </button>
        </motion.form>
      </div>

      <p className={`text-center mt-10 text-sm ${subtle}`}>
        We reply within 24 hours.
      </p>
    </div>
  );
}