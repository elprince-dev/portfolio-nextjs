"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm("service_qes66hs", "template_uxvoebn", formRef.current, {
        publicKey: "XHM38tfM4cFjaIgaE",
      })
      .then(
        () => {
          setSuccess(true);
          formRef.current.reset();
        },
        (error) => {
          setError(true);
        }
      );
  }

  return (
    <motion.section
      id="contact"
      className="my-12 pb-12 md:pt-16 md:pb-48 px-12"
      initial={{ opacity: 0, translateY: 200 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-center font-bold text-4xl">
        Contact
        <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
      </h1>

      <div className="line"></div>

      <form ref={formRef} onSubmit={sendEmail}>
        <div className=" flex flex-col justify-center items-center space-y-6  ">
          <div className=" w-3/5 lg:max-w-xl">
            <label className="">
              Name: <br />
            </label>
            <input
              type="text"
              required
              name="user_name"
              placeholder="Your name"
              className="w-full rounded p-2 border-stone-700 border-2"
            />
          </div>

          <div className="w-3/5 lg:max-w-xl">
            <label>
              Email Address: <br />
            </label>
            <input
              type="email"
              required
              name="user_email"
              placeholder="Email address"
              className="w-full rounded p-2  border-stone-700 border-2"
            />
          </div>

          <div className="w-3/5 lg:max-w-xl">
            <label>
              Your Message: <br />
            </label>
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              className="w-full rounded-lg p-2 border-2 border-stone-700 resize-none"
            />
          </div>
        </div>
        <div className="w-full flex mt-4">
          <button className="text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700 cursor-pointer mx-auto transition ease-out duration-200">
            Submit
          </button>
        </div>

        <div className="flex justify-center mt-3">
          {error && "Error! Please try again"}
          {success && "Thank you! I will get back to you so soon!"}
        </div>
      </form>
    </motion.section>
  );
};

export default Contact;
