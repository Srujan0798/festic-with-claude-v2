// Fix: Created constants.ts file with mock data.
import { Role, ApplicationStatus, User, Vendor, Event, Application, Community, TeamType, TeamMember } from './types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'IIT Gandhinagar', email: 'admin@iitgn.ac.in', role: Role.Host, avatarUrl: 'https://iitgn.ac.in/assets/logo-192x192.png' },
  { id: 'user-2', name: 'Bob\'s Burgers', email: 'bob@burgers.com', role: Role.Vendor, avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
  { id: 'user-3', name: 'Charlie Davis', email: 'charlie@student.edu', role: Role.Student, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  { id: 'user-4', name: 'Diana Prince', email: 'diana@greenwood.edu', role: Role.Host, avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100' },
  { id: 'user-5', name: 'Alice Johnson', email: 'alice.j@student.iitgn.ac.in', role: Role.Host, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-media-1',
    name: 'Sarah Johnson',
    email: 'sarah@media.team',
    role: Role.Host,
    avatarUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100',
    teamType: TeamType.Media,
    assignedEventId: 'event-4',
    permissions: { canUploadMedia: true, canManageVendors: false, canAccessSecurity: false, canManageLogistics: false, canManageHospitality: false, canManageTechnical: false }
  },
  {
    id: 'team-vendor-1',
    name: 'Mike Brown',
    email: 'mike@vendor.team',
    role: Role.Host,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    teamType: TeamType.VendorManagement,
    assignedEventId: 'event-4',
    permissions: { canUploadMedia: false, canManageVendors: true, canAccessSecurity: false, canManageLogistics: false, canManageHospitality: false, canManageTechnical: false }
  },
  {
    id: 'team-logistics-1',
    name: 'David Chen',
    email: 'david@logistics.team',
    role: Role.Host,
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    teamType: TeamType.Logistics,
    assignedEventId: 'event-4',
    permissions: { canUploadMedia: false, canManageVendors: false, canAccessSecurity: false, canManageLogistics: true, canManageHospitality: false, canManageTechnical: false }
  },
   {
    id: 'team-security-1',
    name: 'Emily White',
    email: 'emily@security.team',
    role: Role.Host,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
    teamType: TeamType.Security,
    assignedEventId: 'event-4',
    permissions: { canUploadMedia: false, canManageVendors: false, canAccessSecurity: true, canManageLogistics: false, canManageHospitality: false, canManageTechnical: false }
  },
   {
    id: 'team-hospitality-1',
    name: 'James Green',
    email: 'james@hospitality.team',
    role: Role.Host,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    teamType: TeamType.Hospitality,
    assignedEventId: 'event-4',
    permissions: { canUploadMedia: false, canManageVendors: false, canAccessSecurity: false, canManageLogistics: false, canManageHospitality: true, canManageTechnical: false }
  },
   {
    id: 'team-technical-1',
    name: 'Linda Taylor',
    email: 'linda@tech.team',
    role: Role.Host,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    teamType: TeamType.Technical,
    assignedEventId: 'event-4',
    permissions: { canUploadMedia: false, canManageVendors: false, canAccessSecurity: false, canManageLogistics: false, canManageHospitality: false, canManageTechnical: true }
  },
];

export const MOCK_COMMUNITIES: Community[] = [
    { id: 'comm-1', name: 'Technology', tag: 'tech', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60' },
    { id: 'comm-2', name: 'Music', tag: 'music', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60' },
    { id: 'comm-3', name: 'Arts', tag: 'art', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60' },
    { id: 'comm-4', name: 'Food', tag: 'food', imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60' },
];

export const MOCK_VENDORS: Vendor[] = [
    {
        id: 'vendor-1',
        businessName: 'The Rolling Taco',
        category: 'Food Truck',
        description: 'Authentic Mexican street tacos, burritos, and quesadillas made with fresh ingredients.',
        imageUrl: 'https://images.unsplash.com/photo-1568202379365-15014389e0b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'vendor-2',
        businessName: 'Craft Corner',
        category: 'Handmade Goods',
        description: 'Unique handmade jewelry, pottery, and art prints from local artists.',
        imageUrl: 'https://images.unsplash.com/photo-1599839578018-8b387220268a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'vendor-3',
        businessName: 'Gamer\'s Paradise',
        category: 'Gaming Zone',
        description: 'Mobile gaming station with the latest consoles, VR experiences, and classic arcade games.',
        imageUrl: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
     {
        id: 'vendor-4',
        businessName: 'Acoustic Vibes',
        category: 'Live Music',
        description: 'Solo and duo acoustic performers playing a mix of popular covers and original music.',
        imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    }
];

const marqueeImageUrls = [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
];

export const MOCK_EVENTS: Event[] = [
    {
        id: 'event-4',
        name: 'Amalthea \'24',
        date: 'Oct 19-20, 2024',
        university: 'IIT Gandhinagar',
        hostId: 'user-1',
        description: 'The annual technical summit of IIT Gandhinagar, a confluence of brilliant minds from all over the nation.',
        expectedFootfall: 15000,
        imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        tags: ['Technology', 'Summit', 'Engineering', 'Robotics'],
        communityTag: 'tech',
        visibility: 'public',
    },
    {
        id: 'event-5',
        name: 'Blithchron \'25',
        date: 'Jan 24-26, 2025',
        university: 'IIT Gandhinagar',
        hostId: 'user-1',
        description: 'The cultural festival of IIT Gandhinagar, featuring Pronites, competitions, and a plethora of events.',
        expectedFootfall: 20000,
        imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        tags: ['Culture', 'Music', 'Dance', 'Pronite'],
        communityTag: 'music',
        visibility: 'public',
    },
    {
        id: 'event-3',
        name: 'Culturama',
        date: 'November 5, 2024',
        university: 'IIT Gandhinagar',
        hostId: 'user-1',
        description: 'A vibrant celebration of diversity and culture. Experience traditions from around the world through food, dance, and music.',
        expectedFootfall: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        tags: ['Culture', 'Diversity', 'Food', 'Dance'],
        communityTag: 'art',
        visibility: 'private',
    },
    {
        id: 'event-1',
        name: 'TechNova 2024',
        date: 'October 26-28, 2024',
        university: 'State University',
        hostId: 'user-4',
        description: 'A three-day celebration of technology and innovation, featuring hackathons, guest speakers, and futuristic exhibits.',
        expectedFootfall: 5000,
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        tags: ['Technology', 'Hackathon', 'Innovation', 'Workshops'],
        communityTag: 'tech',
        visibility: 'public',
    },
    {
        id: 'event-2',
        name: 'Spring Fest',
        date: 'April 15, 2025',
        university: 'Greenwood College',
        hostId: 'user-4', // Another host
        description: 'The annual spring music and arts festival. Join us for live bands, food trucks, and student art showcases.',
        expectedFootfall: 8000,
        imageUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        tags: ['Music', 'Arts', 'Food', 'Live Performances'],
        communityTag: 'music',
        visibility: 'public',
    },
    {
        id: 'event-6',
        name: 'ArtBeat',
        date: 'March 10, 2025',
        university: 'Metro Fine Arts College',
        hostId: 'user-6',
        description: 'A day dedicated to creativity. Live painting, sculpture exhibitions, and interactive art installations.',
        // FIX: Add missing expectedFootfall property.
        expectedFootfall: 6500,
        imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        tags: ['Arts', 'Painting', 'Exhibition'],
        communityTag: 'art',
        visibility: 'public',
    },
    {
        id: 'event-7',
        name: 'Gourmet Gala',
        date: 'September 22, 2024',
        university: 'Culinary Institute of America',
        hostId: 'user-7',
        description: 'A food festival showcasing cuisines from around the globe, with workshops from master chefs.',
        expectedFootfall: 9000,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        tags: ['Food', 'Cuisine', 'Workshops'],
        communityTag: 'food',
        visibility: 'private',
    },
    // Adding more events to reach 25 for marquee
    ...Array.from({ length: 18 }, (_, i) => ({
        id: `event-${8 + i}`,
        name: `SynthWave ${2024 + i}`,
        date: `Nov ${10 + i}, 2024`,
        university: `TechHub Institute ${i + 1}`,
        hostId: `user-${8 + i}`,
        description: `Exploring the future of electronic music and digital art. A fest for the senses.`,
        expectedFootfall: 7500 + i * 500,
        imageUrl: marqueeImageUrls[i],
        tags: ['Music', 'EDM', 'Digital Art'],
        communityTag: 'music',
        visibility: 'public' as 'public' | 'private',
    })),
];

export const MOCK_SUB_EVENTS: Event[] = [
    {
        id: 'sub-event-1',
        name: 'RoboWars Championship',
        date: 'Oct 19, 2024',
        university: 'Amalthea \'24 @ IIT Gandhinagar',
        hostId: 'user-1',
        description: 'Witness the clash of titans as bots battle for supremacy in the RoboWars arena. A spectacle of engineering, strategy, and sheer destruction.',
        expectedFootfall: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1581092921447-4a0b23c58362?auto=format&fit=crop&w=800&q=60',
        tags: ['Robotics', 'Competition', 'Engineering'],
        communityTag: 'tech',
        visibility: 'public',
    },
    {
        id: 'sub-event-2',
        name: 'AI & ML Workshop',
        date: 'Oct 19, 2024',
        university: 'Amalthea \'24 @ IIT Gandhinagar',
        hostId: 'user-1',
        description: 'Dive deep into the world of Artificial Intelligence and Machine Learning with industry experts. A hands-on workshop for beginners and enthusiasts alike.',
        expectedFootfall: 300,
        imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=60',
        tags: ['AI', 'ML', 'Workshop', 'Tech Talk'],
        communityTag: 'tech',
        visibility: 'public',
    },
    {
        id: 'sub-event-3',
        name: 'Step-Up Dance Show',
        date: 'Oct 19, 2024',
        university: 'Amalthea \'24 @ IIT Gandhinagar',
        hostId: 'user-1',
        description: 'Experience a breathtaking evening of rhythm and movement. Various dance troupes will set the stage on fire with their electrifying performances.',
        expectedFootfall: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1508700929628-666d84347069?auto=format&fit=crop&w=800&q=60',
        tags: ['Dance', 'Performance', 'Culture', 'Music'],
        communityTag: 'art',
        visibility: 'public',
    },
    {
        id: 'sub-event-4',
        name: 'Drone Racing',
        date: 'Oct 20, 2024',
        university: 'Amalthea \'24 @ IIT Gandhinagar',
        hostId: 'user-1',
        description: 'The future of racing is here! Pilots will navigate high-speed drones through a challenging obstacle course. High-octane action guaranteed.',
        expectedFootfall: 1000,
        imageUrl: 'https://images.unsplash.com/photo-1519665314-12948d8a7359?auto=format&fit=crop&w=800&q=60',
        tags: ['Drones', 'Racing', 'Competition', 'Tech'],
        communityTag: 'tech',
        visibility: 'public',
    },
     {
        id: 'sub-event-5',
        name: 'Theatrix Drama Night',
        date: 'Oct 20, 2024',
        university: 'Amalthea \'24 @ IIT Gandhinagar',
        hostId: 'user-1',
        description: 'A night dedicated to the art of theatre. Witness captivating stories come to life through powerful performances by talented actors.',
        expectedFootfall: 800,
        imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=60',
        tags: ['Drama', 'Theatre', 'Performance', 'Arts'],
        communityTag: 'art',
        visibility: 'public',
    },
];


export const MOCK_APPLICATIONS: Application[] = [
    { id: 'app-1', vendorId: 'vendor-1', eventId: 'event-4', status: ApplicationStatus.Approved },
    { id: 'app-2', vendorId: 'vendor-3', eventId: 'event-4', status: ApplicationStatus.Approved },
    { id: 'app-3', vendorId: 'vendor-2', eventId: 'event-5', status: ApplicationStatus.Pending },
    { id: 'app-4', vendorId: 'vendor-1', eventId: 'event-2', status: ApplicationStatus.Rejected },
    { id: 'app-5', vendorId: 'vendor-4', eventId: 'event-2', status: ApplicationStatus.Approved },
    { id: 'app-6', vendorId: 'vendor-2', eventId: 'event-3', status: ApplicationStatus.Pending },
    { id: 'app-7', vendorId: 'vendor-4', eventId: 'event-3', status: ApplicationStatus.Approved },
];

// NEW MOCK DATA FOR MOBILE UI
const allPosts = [
    {
        id: 'post-1',
        user: { name: 'State University', avatarUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
        event: MOCK_EVENTS[3],
        imageUrl: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'The hackathon at #TechNova2024 is officially underway! The energy is electric! ⚡️',
        likes: 124,
        comments: 12,
        time: '2h ago'
    },
    {
        id: 'post-2',
        user: { name: 'Greenwood College', avatarUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80' },
        event: MOCK_EVENTS[4],
        imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'Sun is out and the bands are setting up for Spring Fest! You don\'t want to miss this. ☀️🎸',
        likes: 450,
        comments: 56,
        time: '1d ago'
    },
     {
        id: 'post-3',
        user: { name: 'DJ Electra', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
        event: MOCK_EVENTS[3],
        imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'Catch my set tonight at TechNova! We\'re taking innovation to the dance floor. 🕺💻',
        likes: 312,
        comments: 33,
        time: '8h ago'
    },
    {
        id: 'post-4',
        user: { name: 'IIT Gandhinagar', avatarUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
        event: MOCK_EVENTS[1], // Blithchron
        imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
        caption: 'Pronite stage is getting ready for Blithchron! Get ready for an unforgettable night! #Blithchron25',
        likes: 987,
        comments: 112,
        time: '3d ago'
    },
    {
        id: 'post-5',
        user: { name: 'ArtBeat Organizers', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
        event: MOCK_EVENTS[5],
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'Live painting sessions are a huge hit at #ArtBeat! So much talent in one place. 🎨',
        likes: 289,
        comments: 25,
        time: '5h ago'
    },
    {
        id: 'post-6',
        user: { name: 'Gourmet Gala', avatarUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=100&q=80' },
        event: MOCK_EVENTS[6],
        imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'The aroma here is just divine! Come grab a bite at the #GourmetGala. 🌮🍜',
        likes: 672,
        comments: 98,
        time: '1d ago'
    },
    {
        id: 'post-7',
        user: { name: 'IIT Gandhinagar', avatarUrl: MOCK_USERS[0].avatarUrl },
        event: MOCK_EVENTS[0], // Amalthea
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'The robotics competition at Amalthea is mind-blowing! #Amalthea24 #TechSummit',
        likes: 451,
        comments: 23,
        time: '4h ago'
    },
    {
        id: 'post-8',
        user: { name: 'IIT Gandhinagar', avatarUrl: MOCK_USERS[0].avatarUrl },
        event: MOCK_EVENTS[2], // Culturama
        imageUrl: 'https://images.unsplash.com/photo-1543364195-077a16c30ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'So many cultures, one stage. Culturama is a feast for the senses! #Diversity #Culturama',
        likes: 189,
        comments: 15,
        time: '2d ago'
    },
    {
        id: 'post-9',
        user: { name: 'IIT Gandhinagar', avatarUrl: MOCK_USERS[0].avatarUrl },
        event: MOCK_EVENTS[1], // Blithchron
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        caption: 'What a night! The crowd energy at Blithchron Pronite was off the charts. Thank you for coming!',
        likes: 1500,
        comments: 250,
        time: '1w ago'
    },
    {
        id: 'post-10',
        user: { name: 'Amalthea \'24 Team', avatarUrl: MOCK_USERS[0].avatarUrl },
        event: MOCK_SUB_EVENTS[0], // RoboWars
        imageUrl: MOCK_SUB_EVENTS[0].imageUrl,
        caption: 'Sparks are flying at the RoboWars Championship! Who will be the victor? 🤖💥',
        likes: 380,
        comments: 45,
        time: 'Just now'
    }
];

export const MOCK_POSTS_FOR_YOU = [allPosts[0], allPosts[1], allPosts[4], allPosts[5]];
export const MOCK_POSTS_FOLLOWING = [allPosts[2], allPosts[3], allPosts[0], allPosts[4]];
export const MOCK_POSTS = allPosts;

export const MOCK_NOTIFICATIONS = [
    { id: 'notif-1', user: 'State University', text: 'posted a new update about TechNova 2024.', time: '15m ago' },
    { id: 'notif-2', user: 'Acoustic Vibes', text: 'was approved for Spring Fest.', time: '1h ago' },
    { id: 'notif-3', user: null, text: 'Your pass for Culturama has been confirmed!', time: '3h ago' }
];

export const MOCK_MESSAGES = [
    { id: 'msg-1', userName: 'TechNova Team', userImage: MOCK_USERS[0].avatarUrl, lastMessage: 'Hey! Are you excited for the event?', time: '10:42 AM' },
    { id: 'msg-2', userName: 'Campus Creatives', userImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100', lastMessage: 'Let\'s catch up at the Arts fair.', time: 'Yesterday' },
    { id: 'msg-3', userName: 'Spring Fest Volunteers', userImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100', lastMessage: 'Your volunteer schedule is out.', time: '2d ago' },
    { id: 'msg-4', userName: 'Amalthea Queries', userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', lastMessage: 'Thanks for reaching out! We\'ll get back to you.', time: '3d ago' }
];

// NEW MOCK DATA FOR TEAM DASHBOARDS

// Logistics
export const MOCK_INVENTORY_ITEMS = [
  { id: 'item-1', name: 'Canopy (10x10ft)', quantity: 25, status: 'Available', location: 'Warehouse A' },
  { id: 'item-2', name: 'Plastic Chairs', quantity: 500, status: 'In Use', location: 'Main Stage' },
  { id: 'item-3', name: 'Barricades', quantity: 100, status: 'Available', location: 'Warehouse B' },
  { id: 'item-4', name: 'Generator (5kW)', quantity: 4, status: 'Maintenance', location: 'Workshop' },
];
export const MOCK_LOGISTICS_TASKS = [
    { id: 'task-1', title: 'Deploy barricades at main entrance', status: 'Done', assignee: 'Rajesh Kumar' },
    { id: 'task-2', title: 'Set up 15 canopies for vendors', status: 'In Progress', assignee: 'Sunita Patel' },
    { id: 'task-3', title: 'Transport sound system to main stage', status: 'To Do', assignee: 'Amit Singh' },
    { id: 'task-4', title: 'Coordinate waste management bins', status: 'To Do', assignee: 'Priya Sharma' },
];

// Security
export const MOCK_SECURITY_INCIDENTS = [
    { id: 'inc-1', title: 'Minor Injury near Food Court', severity: 'Low', time: 'Oct 19, 4:30 PM', status: 'Resolved' },
    { id: 'inc-2', title: 'Crowd control issue at Pronite entry', severity: 'High', time: 'Oct 19, 7:00 PM', status: 'In Progress' },
    { id: 'inc-3', title: 'Lost Child Reported', severity: 'Medium', time: 'Oct 20, 1:00 PM', status: 'Resolved' },
];
export const MOCK_SECURITY_ROSTER = [
    { id: 'rost-1', officer: 'Anil Kapoor', shift: 'Morning (8am - 4pm)', zone: 'Main Gate' },
    { id: 'rost-2', officer: 'Priya Singh', shift: 'Morning (8am - 4pm)', zone: 'Stage A' },
    { id: 'rost-3', officer: 'Rohan Mehta', shift: 'Evening (4pm - 12am)', zone: 'Main Gate' },
    { id: 'rost-4', officer: 'Sonia Desai', shift: 'Evening (4pm - 12am)', zone: 'Vendor Area' },
];

// Hospitality
export const MOCK_HOSPITALITY_GUESTS = [
    { id: 'guest-1', name: 'Dr. APJ Abdul Kalam (Guest Speaker)', arrival: 'Oct 19, 10:00 AM', transport: 'Car #1', accommodation: 'VIP Suite 1', status: 'Checked In' },
    { id: 'guest-2', name: 'Sunidhi Chauhan (Performer)', arrival: 'Oct 20, 2:00 PM', transport: 'Car #2', accommodation: 'VIP Suite 2', status: 'Confirmed' },
];
export const MOCK_CATERING_SCHEDULE = [
    { id: 'cat-1', meal: 'Lunch for Volunteers', time: '1:00 PM', vendor: 'Campus Cafeteria', status: 'Delivered' },
    { id: 'cat-2', meal: 'Dinner for VIPs', time: '8:00 PM', vendor: 'The Grand Hotel', status: 'Confirmed' },
];

// Technical
export const MOCK_TECH_EQUIPMENT = [
    { id: 'tech-1', name: 'Shure SM58 Mic', type: 'Audio', status: 'Working', location: 'Stage A' },
    { id: 'tech-2', name: 'LED Par Light', type: 'Lighting', status: 'Faulty', location: 'Storage' },
    { id: 'tech-3', name: 'BenQ Projector', type: 'Video', status: 'In Use', location: 'Auditorium' },
];
export const MOCK_TECH_ISSUES = [
    { id: 'iss-1', title: 'Stage B left speaker not working', priority: 'High', status: 'Open', reportedBy: 'Event Crew' },
    { id: 'iss-2', title: 'Flickering light on main stage', priority: 'Medium', status: 'In Progress', reportedBy: 'Anil Kapoor' },
];
