import type { Fields, Occasion, Template } from "./InvitelyBuilder.types";

export const occasionDefaults: Record<Occasion, Fields> = {
  birthday: {
    title: "50th Birthday Gala",
    host: "The Johnson Family",
    subtitle: "Join us for an evening of celebration",
    date: "Saturday, 14 June 2025",
    time: "7:00 PM onwards",
    location: "The Grand Hall, London",
    dress: "Black Tie",
    rsvp: "sarah@email.com · by 1 June",
  },
  wedding: {
    title: "Wedding Celebration",
    host: "Emma & James",
    subtitle: "Together with their families",
    date: "Sunday, 20 July 2025",
    time: "3:00 PM",
    location: "Rosewood Manor, Kent",
    dress: "Formal",
    rsvp: "rsvp@emmaandjames.com · by 1 June",
  },
  dinner: {
    title: "Dinner Party",
    host: "Clara & Tom",
    subtitle: "An intimate evening of good food & company",
    date: "Friday, 5 September 2025",
    time: "7:30 PM",
    location: "12 Kensington Gardens",
    dress: "Smart Casual",
    rsvp: "clara@email.com · by 28 Aug",
  },
  baby: {
    title: "Baby Shower",
    host: "Friends of Sophie",
    subtitle: "Come celebrate the new arrival!",
    date: "Saturday, 3 August 2025",
    time: "2:00 PM",
    location: "The Old Barn, Surrey",
    dress: "Casual",
    rsvp: "lucy@email.com · by 25 July",
  },
  corporate: {
    title: "Annual Gala Dinner",
    host: "Acme Corporation",
    subtitle: "Celebrating 10 years of innovation",
    date: "Thursday, 16 October 2025",
    time: "6:30 PM",
    location: "The Shard, London",
    dress: "Business Formal",
    rsvp: "events@acme.com · by 1 October",
  },
  graduation: {
    title: "Graduation Party",
    host: "The Williams Family",
    subtitle: "Celebrating Class of 2025",
    date: "Saturday, 28 June 2025",
    time: "4:00 PM",
    location: "Victoria Park, Manchester",
    dress: "Smart Casual",
    rsvp: "kate@email.com · by 20 June",
  },
};

export const occasionTabs: Array<{ key: Occasion; label: string }> = [
  { key: "birthday", label: "🎂 Birthday" },
  { key: "wedding", label: "💍 Wedding" },
  { key: "dinner", label: "🍷 Dinner Party" },
  { key: "baby", label: "🍼 Baby Shower" },
  { key: "corporate", label: "💼 Corporate" },
  { key: "graduation", label: "🎓 Graduation" },
];

export const templates: Array<{
  key: Template;
  name: string;
  thumb: string;
  tag?: string;
}> = [
  {
    key: "elegant",
    name: "Elegant",
    thumb: "An Evening Affair",
    tag: "Popular",
  },
  { key: "minimal", name: "Minimal", thumb: "Clean & Classic" },
  { key: "bold", name: "Bold", thumb: "THE EVENT", tag: "Modern" },
  { key: "whimsy", name: "Whimsy", thumb: "Come Celebrate!" },
  { key: "botanical", name: "Botanical", thumb: "Garden Party" },
  { key: "editorial", name: "Editorial", thumb: "SOIRÉE" },
];

export const thumbClasses: Record<Template, string> = {
  elegant:
    "bg-linear-[160deg,#2c1810,#4a2818] font-['Playfair_Display'] italic text-[#d4a853]",
  minimal:
    "bg-[#f5f0e8] border-b border-[rgba(74,55,40,0.1)] font-['Playfair_Display'] text-[0.75rem] text-[#4a3728]",
  bold: "bg-[#1a1612] font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#c9a84c]",
  whimsy:
    "bg-[#fdf5ee] font-['Cormorant_Garamond'] text-[0.9rem] italic text-[#b85c38]",
  botanical:
    "bg-linear-[135deg,#3d4f2e,#5a6e4a] font-['Cormorant_Garamond'] text-[0.8rem] italic text-[#e8f0d8]",
  editorial:
    "border-b-[3px] border-b-[#1a1612] bg-white font-['Bebas_Neue'] text-base tracking-[0.1em] text-[#1a1612]",
};

export const cardClasses: Record<Template, string> = {
  elegant:
    "relative flex min-h-[540px] w-[400px] flex-col items-center justify-center overflow-hidden bg-linear-[170deg,#2c1810_0%,#3e2015_50%,#2c1810_100%] px-10 py-12 text-center transition-all duration-300 before:pointer-events-none before:absolute before:inset-[14px] before:border before:border-[rgba(201,168,76,0.3)] after:pointer-events-none after:absolute after:inset-[20px] after:border after:border-[rgba(201,168,76,0.1)]",
  minimal:
    "flex min-h-[540px] w-[400px] flex-col justify-between overflow-hidden bg-white px-12 py-14 transition-all duration-300",
  bold: "flex min-h-[540px] w-[400px] flex-col overflow-hidden border-2 border-[#1a1612] bg-[#f5f0e8] transition-all duration-300",
  whimsy:
    "flex min-h-[540px] w-[400px] flex-col items-center overflow-hidden bg-[#fdf8f2] px-10 py-12 text-center transition-all duration-300",
  botanical:
    "relative flex min-h-[540px] w-[400px] flex-col items-center overflow-hidden bg-linear-[160deg,#3d4f2e,#4e6038_50%,#3d4f2e] px-10 py-12 text-center transition-all duration-300 before:pointer-events-none before:absolute before:inset-3 before:border before:border-[rgba(200,220,170,0.2)]",
  editorial:
    "flex min-h-[540px] w-[400px] flex-col overflow-hidden bg-white transition-all duration-300",
};
