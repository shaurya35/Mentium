"use client";
import { useEffect, useState, FormEvent } from "react";
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

export default function WaitlistPage() {
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const placeholders = ["Join waitlist", "Enter your Email"];

  const navigationLinks = [
    {
      title: "Home",
      icon: <IconHome className="text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: <IconExchange className="text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const response = await fetch("/api/waitlist");
        const { count } = await response.json();
        setWaitlistCount(count);
      } catch (error) {
        console.error("Failed to load waitlist count:", error);
      }
    };
    fetchInitialCount();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || isSubmitting) return; // Add validation

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Submission failed");

      const { count } = await response.json();
      setWaitlistCount(count);
      setEmail(""); // Reset email state after successful submission
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="h-screen w-full flex md:items-center md:justify-center relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <nav className="fixed top-0 w-full flex justify-center bg-slate-50">
          <FloatingDock
            desktopClassName="fixed top-20"
            mobileClassName="fixed top-20"
            items={navigationLinks}
          />
        </nav>

        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Your all-in-one <br /> Productivity tool.
          </h1>

          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Manage your busy student life with smart scheduling, reminders,
            calendar sync, personalized docs, creative drawing, and a
            collaboration hub for everyday tasks.
          </p>

          <div className="mt-10 space-y-6">
            <div className="text-center">
              <p className="text-neutral-300 font-bold">Join waitlist</p>
              <div className="w-full pt-3 max-w-md mx-auto">
                <PlaceholdersAndVanishInput
                  placeholders={["Join waitlist", "Enter your Email"]}
                  onSubmit={handleSubmit}
                  onChange={setEmail}
                  value={email}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl font-medium text-neutral-400">
                {waitlistCount.toLocaleString()} people already joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
