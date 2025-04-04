"use client"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import SeccionPrincipal from "@/components/home/SeccionPrincipal";
import SeccionParticipacion from "@/components/home/SeccionParticipacion";
import SeccionPropuestas from "@/components/home/SeccionPropuestas";
import SeccionNoticias from "@/components/home/SeccionNoticias";
import SeccionPerfil from "@/components/home/SeccionPerfil";
import RedesSociales from "@/components/RedesSociales";

// Carga dinámica de framer-motion solo en el cliente
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

// Animaciones
const fadeInUp = { /* ... */ };
const fadeInLeft = { /* ... */ };
const fadeInRight = { /* ... */ };
const zoomIn = { /* ... */ };
const fadeInWithShadow = { /* ... */ };
const socialBarAnimation = { /* ... */ };

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [showParticipacion, setShowParticipacion] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAnimationComplete = () => {
    setShowParticipacion(true);
  };

  if (!isClient) {
    return (
      <Layout hasHero={true}>
        <div className="overflow-x-hidden w-full">
          <RedesSociales />
          <SeccionPrincipal />
          <SeccionParticipacion />
          <SeccionPropuestas />
          <SeccionNoticias />
          <SeccionPerfil />
        </div>
      </Layout>
    );
  }

  return (
    <Layout hasHero={true}>
      <div className="overflow-x-hidden w-full">
        <MotionDiv
          initial="hidden"
          animate="visible"
          variants={socialBarAnimation}
          className="z-20"
        >
          <RedesSociales />
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          animate="visible"
          variants={zoomIn}
          onAnimationComplete={handleAnimationComplete}
          className="w-full"
        >
          <SeccionPrincipal />
        </MotionDiv>

        {showParticipacion && (
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4   }}
            variants={fadeInLeft}
            className="w-full"
          >
            <SeccionParticipacion />
          </MotionDiv>
        )}

        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={fadeInWithShadow}
          className="w-full"
        >
          <SeccionPropuestas />
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={fadeInRight}
          className="w-full"
        >
          <SeccionNoticias />
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={fadeInUp}
          className="w-full"
        >
          <SeccionPerfil />
        </MotionDiv>
      </div>
    </Layout>
  );
}