"use client";
import React, { useState, FormEvent } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function Home() {
  const [waitlistCount, setWaitlistCount] = useState(0);
  const placeholders = ["Join waitlist", "Enter your Email"];

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const email = formData.get('email') as string;
    
    // try {
    //   const response = await fetch("/api/waitlist", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Email stored successfully", data);
    //     setWaitlistCount((prev) => prev + 1);
    //   } else {
    //     const errorData = await response.json();
    //     console.error("Error storing email:", errorData.error);
    //   }
    // } catch (error) {
    //   console.error("Error storing email:", error);
    // }
  };

  return (
    <>
      <main>
        <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-center bg-slate-50 flex-shrink">
            <FloatingDock
              desktopClassName="fixed top-20 z-50"
              mobileClassName="fixed top-20 z-50"
              items={links}
            />
          </nav>
          <div className="p-4 max-w-7xl mx-auto relative z-10  w-full pt-20 md:pt-0 ">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Your all-in-one <br /> Productivity tool.
            </h1>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              Manage your busy student life with smart scheduling, reminders,
              calendar sync, personalized docs, creative drawing, and a
              collaboration hub for everyday tasks.
            </p>
            <div className="text-neutral-300 font-bold mt-10 text-center ">
              <p>Join waitlist</p>
            </div>
            <div className="w-full pt-3">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onSubmit={handleSubmit}
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-4xl lg:text-xl font-semibold max-w-7xl mx-auto text-center relative z-20 pt-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                {waitlistCount} people signed up to the waitlist
              </h1>
            </div>
          </div>
        </div>
        asdasd
      </main>
    </>
  );
}
