import { Article, Category } from './types';

// Helper to generate random consistent images
const getImg = (id: string, width = 800, height = 600) => 
  `https://picsum.photos/seed/${id}/${width}/${height}`;

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: "Global Summit Reaches Historic Agreement on Climate Action Goals",
    summary: "World leaders have unanimously agreed to accelerate net-zero targets by 2035, marking a significant turning point in international environmental policy.",
    category: Category.World,
    imageUrl: getImg('climate'),
    author: "Sarah Jenkins",
    timestamp: "2 hours ago",
    isBreaking: true
  },
  {
    id: '2',
    title: "Tech Giant Unveils Revolutionary Quantum Processor",
    summary: "The new Q-Core chip promises to solve complex problems millions of times faster than current supercomputers, potentially revolutionizing medicine and cryptography.",
    category: Category.Tech,
    imageUrl: getImg('quantum'),
    author: "David Chen",
    timestamp: "4 hours ago",
    isBreaking: false
  },
  {
    id: '3',
    title: "Markets Rally as Inflation Shows Signs of Cooling",
    summary: "Major indices hit record highs today as the latest consumer price index report came in lower than expected, signaling relief for the economy.",
    category: Category.Business,
    imageUrl: getImg('market'),
    author: "Amanda Williams",
    timestamp: "30 mins ago",
    isBreaking: true
  },
  {
    id: '4',
    title: "Championship Finals: Underdog Team Secures Stunning Victory",
    summary: "In a match that will go down in history, the city's beloved underdogs defeated the defending champions 3-2 in overtime.",
    category: Category.Sports,
    imageUrl: getImg('soccer'),
    author: "Marcus Johnson",
    timestamp: "1 hour ago",
    isBreaking: false
  },
  {
    id: '5',
    title: "New Mars Rover Sends Back Breathtaking Panorama",
    summary: "NASA's latest explorer has captured high-resolution images of the Martian surface, revealing potential signs of ancient riverbeds.",
    category: Category.Tech,
    imageUrl: getImg('mars'),
    author: "Elena Rodriguez",
    timestamp: "5 hours ago",
    isBreaking: false
  },
  {
    id: '6',
    title: "Award-Winning Actor Announces Surprise Retirement",
    summary: "After a 40-year career spanning over 50 films, the legendary screen icon says it's time to focus on family and philanthropy.",
    category: Category.Entertainment,
    imageUrl: getImg('actor'),
    author: "Tom Baker",
    timestamp: "6 hours ago",
    isBreaking: false
  },
  {
    id: '7',
    title: "Breakthrough Study Links Sleep Patterns to Long-term Memory",
    summary: "Scientists have discovered a specific phase of deep sleep that is critical for consolidating memories and learning new skills.",
    category: Category.Health,
    imageUrl: getImg('sleep'),
    author: "Dr. Jennifer Wu",
    timestamp: "8 hours ago",
    isBreaking: false
  },
  {
    id: '8',
    title: "The Top 10 Hidden Gems to Visit in Southeast Asia",
    summary: "From secluded beaches to ancient temples, discover the less-traveled destinations that offer authentic experiences away from the crowds.",
    category: Category.Travel,
    imageUrl: getImg('travel'),
    author: "Mike Stevens",
    timestamp: "1 day ago",
    isBreaking: false
  },
  {
    id: '9',
    title: "Senate Passes Controversial Infrastructure Bill",
    summary: "After weeks of intense debate, the Senate has voted 52-48 to approve the new infrastructure package, sending it to the House.",
    category: Category.Politics,
    imageUrl: getImg('senate'),
    author: "Rachel Green",
    timestamp: "3 hours ago",
    isBreaking: true
  },
  {
    id: '10',
    title: "Fashion Week: Minimalist Designs Dominate the Runway",
    summary: "This season's collections focus on sustainability and clean lines, moving away from the bold prints of last year.",
    category: Category.Style,
    imageUrl: getImg('fashion'),
    author: "Coco Lee",
    timestamp: "12 hours ago",
    isBreaking: false
  }
];
