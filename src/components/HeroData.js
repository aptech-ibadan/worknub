export const heroSlides = [
  {
    eyebrow: "No.1 Workspace in Ibadan",
    heading: "Where Ambition\nFinds Its Home",
    sub: "Professional co-working in the heart of Agodi GRA. Flexible, inspiring, fully equipped.",
    accentClass: "bg-worknub-green",
    accentTextClass: "text-worknub-green",
    accentBgClass: "bg-worknub-green/10",
    accentBorderClass: "border-worknub-green/20",
    cta: { label: "Explore Spaces", href: "/spaces" },
    badge: "Workplace like home",
     image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006297/IMG_3624_dddcqq.jpg",
     imageCardText:"Hot Desk",
     imageCardText1:"Available Today",
     imageCardText2:"12 Open desks right now",
    card: {
      label: "Hot Desk",
      tag: "Available Today",
      tagColor: "text-worknub-green bg-worknub-green/10",
      stat: "1",
      statLabel: "Great spaces for you",
      rows: [
        { label: "Daily",   value: "₦3,800",  color: "text-worknub-green" },
        { label: "Weekly",  value: "₦18,900", color: "text-worknub-green" },
        { label: "Monthly", value: "₦75,300", color: "text-worknub-green" },
      ],
      note: "Flexible · No commitment",
    },
  },
  {
    eyebrow: "Freelancers · Startups · Enterprises",
    heading: "Work Smarter,\nGrow Faster",
    sub: "Join Ibadan's fastest-growing community of remote workers and entrepreneurs.",
    accentClass: "bg-worknub-orange",
    accentTextClass: "text-worknub-orange",
    accentBgClass: "bg-worknub-orange/10",
    accentBorderClass: "border-worknub-orange/20",
    cta: { label: "View Pricing", href: "/pricing" },
    badge: "120+ Active Members",
     image:"https://res.cloudinary.com/ddldviftf/image/upload/v1781006321/IMG_3605_cubzx0.jpg",
     imageCardText:"Private Desk",
     imageCardText1:"Your Own Space",
     imageCardText2:"8 Dedicated desks left",
   
    card: {
      label: "Private Desk",
      tag: "Your Own Space",
      tagColor: "text-worknub-orange bg-worknub-orange/10",
      stat: "2",
      statLabel: "Dedicated package",
      rows: [
        { label: "Daily",   value: "₦6,000",   color: "text-worknub-orange" },
        { label: "Weekly",  value: "₦29,600",  color: "text-worknub-orange" },
        { label: "Monthly", value: "₦118,300", color: "text-worknub-orange" },
      ],
      note: "Lockable storage included",
    },
  },
  {
    eyebrow: "Limited Time Offer",
    heading: "Membership That\nGives You More",
    sub: "Save up to 40% with exclusive membership — T-shirt, face cap, and priority booking included.",
    accentClass: "bg-[#47C341]",
    accentTextClass: "text-[#47C341]",
    accentBgClass: "bg-[#47C341]/10",
    accentBorderClass: "border-[#47C341]/20",
    cta: { label: "Join Membership", href: "/membership" },
    badge: "Students Save 40%",
    image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006256/IMG_3611_fqndf9.jpg",
    
    card: {
      label: "Private Office",
      tag: "For Teams",
      tagColor: "text-white bg-[#47C341]",
      stat: "3",
      statLabel: "Tailored offers",
      rows: [
        { label: "Monthly",     value: "₦236,500", color: "text-white" },
        { label: "Seats up to", value: "3 people",  color: "text-white" },
        { label: "Access",      value: "24/7",      color: "text-white" },
      ],
      note: "Business address included",
    },
  },
];

export const stats = [
  { value: "120+", label: "Happy Members" },
  { value: "6", label: "Access Days" },
  { value: "100%", label: "Power Uptime" },
  { value: "5.0★", label: "Member Rating" },
];

export const amenities = [
  { title: "Super fast internet",       desc: "Stronger connectivity, zero throttling" },
  { title: "Stable Power",         desc: "Never see a NEPA outage again" },
  { title: "Lounge Access",        desc: "Coffees and refreshment available" },
  { title: "Print Suite",        desc: "High-resolution colour printing" },
  { title: "Secure Access",      desc: "24/7 CCTV zone, fully secured environment" },
  { title: "Events & Networking",desc: "Regular community programmes" },
];

export const plans = [
  {
    name: "Hot Desk",
    naira: "5,700",
    period: "/ day",
    description: "Flexible open seating, ideal for remote workers & students.",
    features: ["Flexible daily access", " Ergonomics chair", "High-speed WiFi", "Networking opportunities"],
    highlight: false,
  },
  {
    name: "Private Desk",
    naira: "8,900",
    period: "/ day",
    description: "Your own permanent desk in a vibrant shared floor.",
    features: ["Flexible daily access", "High-speed WiFi", "Networking opportunities","Dedicated desk + storage", "Priority support"],
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Private Office",
    naira: "32,300",
    period: "/ day",
    description: "Fully enclosed office for up to 3 team members.",
    features: ["Private lockable office", "Seats up to 3 people", "Business address","Flexible daily access", "High-speed WiFi","Lounge Access", "Complimentary Coffee"],
    highlight: false,
  },
];

export const testimonials = [
  {
    name: "Dr. Bernard",
    title: "Founder",
    text: "Worknub is one of the best convenient workspace in Ibadan. The internet connection is top-notch and the staff are friendly and always ready to help.",
    rating: 5,
    initials: "DB",
  },
  {
    name: "Chidinma Eze",
    title: "Freelance UX Designer",
    text: "Reliable power, blazing internet, and amazing coffee. Everything I need to deliver world-class work to global clients.",
    rating: 5,
    initials: "CE",
  },
  {
    name: "Ibrahim Bello",
    title: "Corp Member — NYSC Oyo State",
    text: "The corper discount made this affordable. I've been more productive here than anywhere else in Ibadan.",
    rating: 5,
    initials: "IB",
  },
];