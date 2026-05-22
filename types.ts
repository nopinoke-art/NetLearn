
export enum TopologyType {
  STAR = 'STAR',
  BUS = 'BUS',
  RING = 'RING',
  MESH = 'MESH',
  TREE = 'TREE'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ProsConsItem {
  feature: string;
  advantage: string;
  disadvantage: string;
}

export interface TopologyInfo {
  id: TopologyType;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  implementation: string;
  caseStudy: {
    title: string;
    scenario: string;
    solution: string;
  };
  comparisonTable: ProsConsItem[];
  questions: QuizQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}