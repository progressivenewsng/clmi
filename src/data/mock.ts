// Mock data. In production this will be served from the /login-managed
// backend (news, gallery, testimonies, publications) — see README for the
// suggested data model.
import founderImage from "../assets/clmiFounder.jpeg";

export type Publication = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  pdfUrl?: string;
  pageImageUrls?: string[];
  publicationType?: "ktc" | "leadership_nuggets" | "word_for_you";
  verseText?: string;
  verseReference?: string;
  date: string;
  author: string;
  body: string[];
  videoUrl?: string;
  links?: { label: string; href: string }[];
};

export const publications: Publication[] = [
  {
    slug: "kingdom-agenda-and-the-political-office",
    title: "The Kingdom Agenda and the Political Office",
    excerpt:
      "What does it mean to hold public office as an assignment from God rather than a personal ambition?",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
    date: "June 14, 2026",
    author: "Folorunso S. Aluko",
    body: [
      "Every generation is entrusted with leaders who carry more than a title — they carry an assignment. This edition of Kingdom Testament Chronicles examines the political office not as a prize to be won, but as a post to be occupied faithfully.",
      "We trace the biblical pattern of Joseph, Daniel and Esther — believers who rose to public influence without losing their covenant identity — and ask what their example demands of leaders today.",
      "The piece closes with a practical framework for leaders seeking to align policy decisions with kingdom principles, without compromising the secular nature of public office.",
    ],
    links: [{ label: "Download study guide (PDF)", href: "#" }],
  },
  {
    slug: "faith-in-the-public-square",
    title: "Faith in the Public Square",
    excerpt:
      "A reflection on carrying conviction into rooms that were never built to welcome it.",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop",
    date: "May 2, 2026",
    author: "Pastor Ifeoma Balogun",
    body: [
      "Public life rewards compromise and punishes conviction — or so it seems. This publication argues the opposite: that quiet, consistent faith is the rarest form of leadership currency available today.",
      "Drawing from interviews with sitting legislators and civil servants within the CLMI network, we outline three habits that keep leaders anchored under pressure.",
    ],
  },
  {
    slug: "raising-saints-to-be-kings",
    title: "Raising Saints to Be Kings",
    excerpt: "An introduction to CLMI's mandate and the theology behind it.",
    image:
      "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?q=80&w=1200&auto=format&fit=crop",
    date: "March 21, 2026",
    author: "CLMI Editorial Team",
    body: [
      "'Raising saints to be kings' is more than a slogan for CLMI — it is a mandate grounded in Revelation's promise that believers are made 'kings and priests unto God.'",
      "This foundational publication unpacks what that promise means practically for a believer sitting in a boardroom, a chamber, or a governor's office.",
    ],
  },
  {
    slug: "leadership-as-calling",
    title: "Leadership as Calling, Not Career",
    excerpt: "Why CLMI insists that leadership and politics are a gifting of God.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    date: "February 9, 2026",
    author: "Elder Chidi Nwafor",
    body: [
      "When leadership is treated as a career, ambition sets the agenda. When it is received as a calling, God does.",
      "This piece walks through the spiritual gifts associated with governance and leadership, and how CLMI members are equipped to steward them.",
    ],
  },
];

export type NewsItem = {
  slug: string;
  title: string;
  type: "image" | "video";
  image: string;
  videoUrl?: string;
  date: string;
  body: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "national-leadership-convention-2026",
    title: "National Leadership Convention 2026 Draws Record Attendance",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    date: "July 18, 2026",
    body: "Leaders and politicians from across the nation gathered for CLMI's third-quarter National Leadership Convention, themed 'Governance and the Glory of God.'",
  },
  {
    slug: "monthly-fellowship-lagos-chapter",
    title: "Monthly Fellowship Holds Across Lagos Chapters",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    date: "July 5, 2026",
    body: "Members across Lagos gathered on the third Sunday for prayer, worship and a message on righteous leadership from the CLMI Board of Directors.",
  },
  {
    slug: "public-lecture-recap",
    title: "Biannual Public Lecture: 'Scripture and the State'",
    type: "video",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    date: "June 20, 2026",
    body: "Watch highlights from this quarter's public lecture, where panelists discussed the application of scripture to modern statecraft.",
  },
  {
    slug: "mercy-reach-outreach-benue",
    title: "Mercy Reach Outreach Touches Displaced Families in Benue",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1200&auto=format&fit=crop",
    date: "June 2, 2026",
    body: "Volunteers under CLMI's Mercy Reach arm distributed food, clothing and medical supplies to displaced families in Benue State.",
  },
  {
    slug: "believers-in-politics-roundtable",
    title: "Believers in Politics Hosts Closed-Door Roundtable",
    type: "video",
    image:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    date: "May 14, 2026",
    body: "Serving legislators met for a closed-door roundtable on scriptural approaches to policy-making, hosted by the Believers in Politics ministry arm.",
  },
  {
    slug: "international-convention-save-the-date",
    title: "Save the Date: Biennial International Leadership Convention",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    date: "April 30, 2026",
    body: "CLMI announces dates for the next International Leadership Convention, bringing together leaders from across nations.",
  },
];

export type GalleryItem = {
  id: string;
  image: string;
  caption: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=900&auto=format&fit=crop", caption: "Delegates in worship at the National Convention" },
  { id: "g2", image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=900&auto=format&fit=crop", caption: "Prayer session at the monthly fellowship" },
  { id: "g3", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=900&auto=format&fit=crop", caption: "Mercy Reach outreach distribution day" },
  { id: "g4", image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=900&auto=format&fit=crop", caption: "Board of Directors in session" },
  { id: "g5", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=900&auto=format&fit=crop", caption: "Leadership development workshop" },
  { id: "g6", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=900&auto=format&fit=crop", caption: "Believers in Politics roundtable" },
  { id: "g7", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop", caption: "Public lecture attendees" },
  { id: "g8", image: "https://images.unsplash.com/photo-1560439514-07d5fbeb0c30?q=80&w=900&auto=format&fit=crop", caption: "Choir ministration at the convention" },
  { id: "g9", image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=900&auto=format&fit=crop", caption: "International delegates fellowship dinner" },
];

export type Testimony = {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
};

export const testimonies: Testimony[] = [
  {
    id: "t1",
    name: "Hon. Grace Adeyemi",
    role: "State Legislator",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    quote:
      "CLMI helped me see my seat in the assembly as a pulpit, not a prize. My approach to policy has never been the same.",
  },
  {
    id: "t2",
    name: "Engr. Daniel Chukwu",
    role: "Local Government Chairman",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    quote:
      "The leadership development sessions gave me a scriptural framework for decisions I used to make on instinct alone.",
  },
  {
    id: "t3",
    name: "Barr. Ngozi Eze",
    role: "Corporate Executive",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    quote:
      "I came in as a skeptic about mixing faith and public life. CLMI's teaching answered every objection I had, with scripture and with results.",
  },
  {
    id: "t4",
    name: "Dr. Emeka Obi",
    role: "Ministry Director, Health",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
    quote:
      "Mercy Reach gave my team a practical outlet for compassion. We now run quarterly outreaches inspired directly by CLMI's model.",
  },
];

export type Review = {
  id: string;
  name: string;
  organization: string;
  image: string;
  quote: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Dr. Chioma Okonkwo",
    organization: "National Institute for Democratic Excellence",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote:
      "CLMI stands out as a unique platform bridging faith and public service with intellectual rigor and integrity. Their leadership model is redefining governance in West Africa.",
  },
  {
    id: "r2",
    name: "Prof. Adebayo Soyinka",
    organization: "Center for Civic Leadership",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote:
      "The caliber of leaders CLMI produces is evident in their approach to policy and community engagement. They are raising a generation of principled public servants.",
  },
  {
    id: "r3",
    name: "Ade Osineye",
    organization: "Leadership Africa Magazine",
    image: "https://images.unsplash.com/photo-1517849845537-1d51a20414de?q=80&w=400&auto=format&fit=crop",
    quote:
      "What CLMI represents is rare in today's political landscape — leaders who refuse to compromise on values while delivering real results for their constituencies.",
  },
  {
    id: "r4",
    name: "Rev. Dr. Kabiru Gata",
    organization: "West African Pastoral Alliance",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    quote:
      "CLMI's work in reconciling faith with governance is not just important — it is prophetic. They are answering a call many churches have abandoned.",
  },
];

type LeadershipPerson = {
  name: string;
  role: string;
  image: string;
};

export const leadershipData = {
  president: {
    name: "Pastor Folorunso S. Aluko",
    title: "President & Founder",
    image: founderImage,
    bio: [
      "Folorunso S. Aluko is the President of Covenant Leadership Ministry International (CLMI), a ministry committed to promoting exemplary and righteous leadership anchored in Kingdom principles.",
      "Also, he is an Associate Pastor with Living Faith Church. He is passionate about soul-winning, spiritual growth, leadership development and advancing God's Kingdom. He is happily married and blessed with three lovely children.",
    ],
  },
  executiveCouncil: [] as LeadershipPerson[],
  directors: [] as LeadershipPerson[],
};

export const ministries = {
  mercyReach: {
    name: "Mercy Reach",
    tagline: "Compassion in action, across every nation we serve.",
    description:
      "Mercy Reach is CLMI's humanitarian arm, organising outreaches, medical missions and relief efforts for underserved and displaced communities. It exists to demonstrate the practical love of Christ alongside the ministry's teaching mandate.",
    activities: [
      "Quarterly food and medical relief outreaches",
      "Support for displaced and disaster-affected families",
      "Partnerships with local churches for community relief",
    ],
  },
  leadershipDevelopment: {
    name: "Leadership Development",
    tagline: "Equipping leaders with kingdom principles for practical governance.",
    description:
      "This arm runs trainings, seminars and mentorship programmes designed to help leaders and politicians apply scriptural principles to real leadership realities — from ethics in office to servant leadership in the workplace.",
    activities: [
      "Executive leadership seminars and workshops",
      "One-on-one and group mentorship for emerging leaders",
      "Publication of leadership training materials",
    ],
  },
  believersInPolitics: {
    name: "Believers in Politics (BiP)",
    tagline: "Reconciling our kind to God’s agenda",
    description:
      "Believers in Politics is CLMI's dedicated platform for politicians and public office holders, offering fellowship, prayer and scriptural grounding for the unique pressures of public life.",
    activities: [
      "Closed-door fellowship for sitting and aspiring politicians",
      "Prayer covering for elections and legislative sessions",
      "Roundtables on scripture-informed policy making",
    ],
  },
};
