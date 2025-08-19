export interface Question {
  id: string
  category: 'psychometric' | 'technical' | 'wiscar'
  subcategory: string
  type: 'multiple_choice' | 'likert_scale' | 'scenario' | 'ranking'
  question: string
  options?: string[]
  scenarios?: {
    situation: string
    options: Array<{
      text: string
      score: number
    }>
  }
  correctAnswer?: string
  weight: number
}

export interface AssessmentResponse {
  questionId: string
  answer: string | number
  score: number
}

export interface WiscarScores {
  will: number
  interest: number
  skill: number
  cognitiveReadiness: number
  abilityToLearn: number
  realWorldAlignment: number
}

export interface AssessmentResults {
  userId: string
  psychometricScore: number
  technicalScore: number
  wiscarScores: WiscarScores
  overallScore: number
  recommendation: 'yes' | 'maybe' | 'no'
  confidence: number
  nextSteps: string[]
  careerMatches: string[]
  generatedAt: string
}

export interface AssessmentState {
  currentQuestionIndex: number
  responses: AssessmentResponse[]
  isComplete: boolean
  results?: AssessmentResults
}