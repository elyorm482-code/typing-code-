import { CodeSnippet } from '../types';

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'ts-quick-filter',
    title: 'Array Filter & Deduplicate',
    language: 'typescript',
    difficulty: 'beginner',
    description: 'Generic unique array helper with TypeScript Set',
    code: `const unique = <T>(items: T[]): T[] => {
  return [...new Set(items)];
};`,
    tags: ['typescript', 'generics', 'arrays']
  },
  {
    id: 'js-debounce',
    title: 'Debounce Utility',
    language: 'javascript',
    difficulty: 'intermediate',
    description: 'Rate-limiting function execution with timer cleanup',
    code: `function debounce(fn, delay = 300) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}`,
    tags: ['javascript', 'closures', 'performance']
  },
  {
    id: 'py-list-comp',
    title: 'Fast Matrix Transpose',
    language: 'python',
    difficulty: 'beginner',
    description: 'Pythonic list comprehension for matrix transposition',
    code: `def transpose(matrix):
    return [[row[i] for row in matrix] for i in range(len(matrix[0]))]`,
    tags: ['python', 'algorithms']
  },
  {
    id: 'ts-fetch-hook',
    title: 'Async Data Fetcher',
    language: 'typescript',
    difficulty: 'intermediate',
    description: 'Safe typed fetch wrapper with error handling',
    code: `async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`Status: \${res.status}\`);
  return res.json() as Promise<T>;
}`,
    tags: ['typescript', 'async', 'promises']
  },
  {
    id: 'rust-struct',
    title: 'Rust Point & Distance',
    language: 'rust',
    difficulty: 'intermediate',
    description: 'Euclidean distance calculation on 2D coordinates',
    code: `struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn distance(&self, other: &Point) -> f64 {
        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
    }
}`,
    tags: ['rust', 'math', 'structs']
  },
  {
    id: 'go-goroutine',
    title: 'Go Channel Pipeline',
    language: 'go',
    difficulty: 'intermediate',
    description: 'Buffered concurrent producer-consumer pipeline',
    code: `func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n * 2
        }
        close(out)
    }()
    return out
}`,
    tags: ['go', 'concurrency', 'channels']
  },
  {
    id: 'css-grid-center',
    title: 'Modern CSS Center & Clamp',
    language: 'css',
    difficulty: 'beginner',
    description: 'Fluid typography and modern grid positioning',
    code: `.card-container {
  display: grid;
  place-items: center;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  padding: min(5vw, 2rem);
}`,
    tags: ['css', 'responsive', 'grid']
  }
];

export const INITIAL_LEADERBOARD = [
  {
    rank: 1,
    username: 'alex_syntax',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    wpm: 148,
    accuracy: 99.4,
    language: 'rust' as const,
    matchesPlayed: 482,
    tier: 'Grandmaster',
    country: 'DE'
  },
  {
    rank: 2,
    username: 'dev_sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    wpm: 139,
    accuracy: 98.9,
    language: 'typescript' as const,
    matchesPlayed: 320,
    tier: 'Master',
    country: 'US'
  },
  {
    rank: 3,
    username: 'kenji_code',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    wpm: 134,
    accuracy: 99.1,
    language: 'go' as const,
    matchesPlayed: 295,
    tier: 'Master',
    country: 'JP'
  },
  {
    rank: 4,
    username: 'elena_py',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    wpm: 128,
    accuracy: 97.8,
    language: 'python' as const,
    matchesPlayed: 210,
    tier: 'Diamond',
    country: 'CA'
  },
  {
    rank: 5,
    username: 'marcus_byte',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    wpm: 122,
    accuracy: 98.5,
    language: 'javascript' as const,
    matchesPlayed: 184,
    tier: 'Diamond',
    country: 'GB'
  },
  {
    rank: 6,
    username: 'you (guest)',
    avatar: '',
    wpm: 104,
    accuracy: 96.2,
    language: 'typescript' as const,
    matchesPlayed: 12,
    tier: 'Platinum',
    country: 'GLOBAL'
  }
];
