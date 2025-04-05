import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { Shield, MessageSquare, Image, AlertTriangle, Scale, Brain } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Real-time Scam Detection",
    content: "Instantly analyze marketplace listings and messages for suspicious patterns and red flags.",
    image: "/dashboard.png",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Conversation Analysis",
    content: "AI-powered analysis of seller messages to detect inconsistencies and suspicious language patterns.",
    image: "/dashboard.png",
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Image Verification",
    content: "Detect duplicate, stolen, or AI-generated images using advanced visual analysis.",
    image: "/dashboard.png",
    icon: <Image className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Price Analysis",
    content: "Identify suspicious pricing patterns and outliers that may indicate fraudulent listings.",
    image: "/dashboard.png",
    icon: <Scale className="h-6 w-6 text-primary" />,
  },
  {
    id: 5,
    title: "Legal Compliance",
    content: "Cross-reference seller demands with legal requirements to ensure safe transactions.",
    image: "/dashboard.png",
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
  },
  {
    id: 6,
    title: "Smart Suggestions",
    content: "Get AI-powered recommendations for safe buying practices and verification questions.",
    image: "/dashboard.png",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="Protect Yourself from Online Scams">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
