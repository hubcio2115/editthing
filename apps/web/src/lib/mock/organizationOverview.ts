interface MockData {
  orgId: string;
  projects: ProjectMockData[];
}

interface ProjectMockData {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  uploaded: string;
  editor: string;
}

const mockdata1: ProjectMockData[] = [
  {
    title: "We kidnapped children!",
    description: "Learn how to create a stunning website from scratch.",
    thumbnail: "https://i.ytimg.com/vi/vlL-o5DGiY8/maxresdefault.jpg",
    duration: "12:30",
    uploaded: "2 days ago",
    editor: "John Doe",
  },
  {
    title: "We kidnapped children!",
    description:
      "Get started with React and build interactive web applications.",
    thumbnail: "https://i.ytimg.com/vi/TAX6LESYSbA/maxresdefault.jpg",
    duration: "20:15",
    uploaded: "1 week ago",
    editor: "Jane Smith",
  },
  {
    title: "I left my friend to freeze alive",
    description: "Learn how to create a stunning website from scratch.",
    thumbnail: "https://i.ytimg.com/vi/vlL-o5DGiY8/maxresdefault.jpg",
    duration: "12:30",
    uploaded: "2 days ago",
    editor: "John Doe",
  },
  {
    title: "We kidnapped children!",
    description:
      "Get started with React and build interactive web applications.",
    thumbnail: "https://i.ytimg.com/vi/TAX6LESYSbA/maxresdefault.jpg",
    duration: "20:15",
    uploaded: "1 week ago",
    editor: "Jane Smith",
  },
  {
    title: "I left my friend to freeze alive",
    description: "Learn how to create a stunning website from scratch.",
    thumbnail: "https://i.ytimg.com/vi/vlL-o5DGiY8/maxresdefault.jpg",
    duration: "12:30",
    uploaded: "2 days ago",
    editor: "John Doe",
  },
  {
    title: "We kidnapped children!",
    description:
      "Get started with React and build interactive web applications.",
    thumbnail: "https://i.ytimg.com/vi/TAX6LESYSbA/maxresdefault.jpg",
    duration: "20:15",
    uploaded: "1 week ago",
    editor: "Jane Smith",
  },
  {
    title: "I left my friend to freeze alive",
    description: "Learn how to create a stunning website from scratch.",
    thumbnail: "https://i.ytimg.com/vi/vlL-o5DGiY8/maxresdefault.jpg",
    duration: "12:30",
    uploaded: "2 days ago",
    editor: "John Doe",
  },
  {
    title: "We kidnapped children!",
    description:
      "Get started with React and build interactive web applications.",
    thumbnail: "https://i.ytimg.com/vi/TAX6LESYSbA/maxresdefault.jpg",
    duration: "20:15",
    uploaded: "1 week ago",
    editor: "Jane Smith",
  },
  {
    title: "I left my friend to freeze alive",
    description: "Learn how to create a stunning website from scratch.",
    thumbnail: "https://i.ytimg.com/vi/vlL-o5DGiY8/maxresdefault.jpg",
    duration: "12:30",
    uploaded: "2 days ago",
    editor: "John Doe",
  },
  {
    title: "We kidnapped children!",
    description:
      "Get started with React and build interactive web applications.",
    thumbnail: "https://i.ytimg.com/vi/TAX6LESYSbA/maxresdefault.jpg",
    duration: "20:15",
    uploaded: "1 week ago",
    editor: "Jane Smith",
  },
];

const orgs: MockData[] = [
  {
    orgId: "7b74f4d5-ef62-4c55-91fc-73eeb6a2f700",
    projects: mockdata1,
  },
  {
    orgId: "a1742b12-40a0-48bb-8c42-02d1680c5d0a",
    projects: [
      {
        title: "How to get a girlfriend guide",
        description: "unregistered hypercam edition",
        thumbnail: "https://i.ytimg.com/vi/pV0dCyO3Jps/maxresdefault.jpg",
        duration: "21:07",
        uploaded: "11 days ago",
        editor: "TheLegend2137",
      },
    ],
  },
];

export default orgs;
