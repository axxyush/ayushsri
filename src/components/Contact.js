import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Groot from "../models/Groot";
import toast from "react-hot-toast";

function Contact() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const templateParams = {
      name: form.user_name.value,
      email: form.user_email.value,
      subject: form.subject?.value || "No subject provided",
      message: form.message.value,
      reply_to: form.user_email.value,
    };

    emailjs
      .send(
        "service_eiwta7c",
        "template_ds4qfci",
        templateParams,
        "ZvEOIpC-oM_CV3cDM"
      )
      .then(
        () => toast.success("Email sent!"),
        () => toast.error("Email failed.")
      );
  };

  return (
    <div className="groot-container mx-auto">
      <div className="groot-header">
        <Groot />
      </div>
      <form
        style={{ marginTop: "10px" }}
        ref={formRef}
        onSubmit={sendEmail}
        className="groot-form"
      >
        <input
          className="groot-input"
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
        />
        <input
          className="groot-input"
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
        />
        <textarea
          className="groot-textarea"
          name="message"
          placeholder="Mission Brief"
          required
        ></textarea>
        <button className="groot-button" type="submit">
          Send Signal
        </button>
      </form>
    </div>
  );
}

export default Contact;
