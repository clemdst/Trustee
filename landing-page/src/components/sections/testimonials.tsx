"use client";

import Marquee from "@/components/magicui/marquee";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <Image
        width={40}
        height={40}
        src={img || ""}
        alt={name}
        className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Frequent Leboncoin User",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        Trustee saved me from a fake iPhone listing on Leboncoin.
        <Highlight>
          The trust score and warning about suspicious pricing patterns were spot on.
        </Highlight>{" "}
        Now I feel much safer shopping online.
      </p>
    ),
  },
  {
    name: "Thomas Martin",
    role: "eBay Power Seller",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        As someone who buys and sells on eBay regularly, Trustee has become my essential shopping companion.
        <Highlight>The real-time chat analysis is incredibly accurate!</Highlight> It's helped me avoid several sophisticated scams.
      </p>
    ),
  },
  {
    name: "Sarah Chen",
    role: "Etsy Shop Owner",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        I love how Trustee helps protect both buyers and sellers on Etsy.
        <Highlight>The image verification feature is a game-changer.</Highlight> It helps maintain trust in our community.
      </p>
    ),
  },
  {
    name: "Lucas Silva",
    role: "Vinted Fashion Enthusiast",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        Trustee's price analysis feature is brilliant for fashion items on Vinted.
        <Highlight>It caught several counterfeit listings instantly.</Highlight> Makes shopping for clothes much safer.
      </p>
    ),
  },
  {
    name: "Emma Wilson",
    role: "Online Marketplace Moderator",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        As someone who moderates online marketplaces, I'm impressed by Trustee's accuracy.
        <Highlight>The AI really understands scam patterns.</Highlight> It's become an essential tool for my work.
      </p>
    ),
  },
  {
    name: "David Kim",
    role: "Tech Security Expert",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        From a security perspective, Trustee's approach to protecting users is impressive.
        <Highlight>The multi-layered analysis is comprehensive and effective.</Highlight> Highly recommended for online safety.
      </p>
    ),
  },
  {
    name: "Sophie Laurent",
    role: "Parent & Online Shopper",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        As a parent who shops online, Trustee gives me peace of mind.
        <Highlight>The clear trust scores and explanations are easy to understand.</Highlight> Perfect for keeping my family safe online.
      </p>
    ),
  },
  {
    name: "James Anderson",
    role: "Small Business Owner",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        Trustee has revolutionized how I source products for my business.
        <Highlight>The business plan features are exactly what I needed.</Highlight> Saves me time and prevents costly mistakes.
      </p>
    ),
  },
];

export default function Testimonials() {
  return (
    <Section
      title="Testimonials"
      subtitle="What our customers are saying"
      className="max-w-8xl"
    >
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </Section>
  );
}
