"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Contact = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const contactInfo = [
    {
      icon: HiMail,
      label: "Email",
      value: "mohammad-elprince@proton.me",
      href: "mailto:mohammad-elprince@proton.me"
    },
    {
      icon: HiLocationMarker,
      label: "Location",
      value: "Milton, ON, Canada",
      href: null
    },
    {
      icon: HiPhone,
      label: "Available",
      value: "Mon - Fri, 9AM - 6PM EST",
      href: null
    }
  ];

  function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm("service_qes66hs", "template_uxvoebn", formRef.current, {
        publicKey: "XHM38tfM4cFjaIgaE",
      })
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          formRef.current.reset();
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          setError(true);
          setLoading(false);
          setTimeout(() => setError(false), 5000);
        }
      );
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-stone-900 dark:to-stone-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to discuss opportunities or collaborate on exciting projects?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I&apos;m always interested in hearing about new opportunities, 
                especially ambitious or large-scale projects. Let&apos;s build something amazing together!
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-stone-700 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 dark:text-white">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-stone-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Follow me on</p>
                <div className="flex space-x-4">
                  <a href="https://github.com/elprince-dev" target="_blank" className="group">
                    <div className="p-3 bg-gray-100 dark:bg-stone-700 rounded-full group-hover:bg-teal-100 dark:group-hover:bg-teal-900 transition-colors duration-300">
                      <AiOutlineGithub className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300" />
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/in/elprince93/" target="_blank" className="group">
                    <div className="p-3 bg-gray-100 dark:bg-stone-700 rounded-full group-hover:bg-teal-100 dark:group-hover:bg-teal-900 transition-colors duration-300">
                      <AiOutlineLinkedin className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Send me a message
              </h2>
              
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="user_name"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-stone-600 rounded-xl bg-white dark:bg-stone-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      name="user_email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-stone-600 rounded-xl bg-white dark:bg-stone-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    required
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-stone-600 rounded-xl bg-white dark:bg-stone-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <HiMail className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                  >
                    <HiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-200 font-medium">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                  >
                    <HiExclamationCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="text-red-800 dark:text-red-200 font-medium">
                      Failed to send message. Please try again or email me directly.
                    </span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
