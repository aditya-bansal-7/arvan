'use client';

import dynamic from "next/dynamic";
import { FC } from "react";

const Testimonials = dynamic(() => import("@/components/Sections/Testimonials"));
const ContactForm = dynamic(() => import("@/components/Sections/ContactUs"));
const Footer = dynamic(() => import("@/components/Footer"));

const ClientOnlyContent: FC = () => {
  return (
    <>
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
};

export default ClientOnlyContent;
