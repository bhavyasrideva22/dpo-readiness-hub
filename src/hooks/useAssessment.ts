import { useState, useCallback } from 'react'
import { AssessmentState, AssessmentResponse, AssessmentResults, WiscarScores } from '@/types/assessment'
import { assessmentQuestions } from '@/data/questions'

export function useAssessment() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentQuestionIndex: 0,
    responses: [],
    isComplete: false
  })

  const getCurrentQuestion = useCallback(() => {
    if (assessmentState.currentQuestionIndex >= assessmentQuestions.length) {
      return null
    }
    return assessmentQuestions[assessmentState.currentQuestionIndex]
  }, [assessmentState.currentQuestionIndex])

  const submitAnswer = useCallback((answer: string | number) => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return

    let score = 0
    
    // Calculate score based on question type
    if (currentQuestion.type === 'multiple_choice') {
      score = answer === currentQuestion.correctAnswer ? 10 : 0
    } else if (currentQuestion.type === 'likert_scale') {
      // Convert likert scale to 0-10 score
      const scaleValue = typeof answer === 'number' ? answer : parseInt(answer as string)
      score = ((scaleValue - 1) / 4) * 10
    } else if (currentQuestion.type === 'scenario' && currentQuestion.scenarios) {
      const selectedOption = currentQuestion.scenarios.options[parseInt(answer as string)]
      score = selectedOption ? selectedOption.score : 0
    }

    // Apply question weight
    score *= currentQuestion.weight

    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer,
      score
    }

    setAssessmentState(prev => {
      const newResponses = [...prev.responses, response]
      const isLastQuestion = prev.currentQuestionIndex >= assessmentQuestions.length - 1
      
      if (isLastQuestion) {
        const results = calculateResults(newResponses)
        return {
          ...prev,
          responses: newResponses,
          isComplete: true,
          results
        }
      }

      return {
        ...prev,
        responses: newResponses,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }
    })
  }, [getCurrentQuestion])

  const calculateResults = useCallback((responses: AssessmentResponse[]): AssessmentResults => {
    // Calculate category scores
    const psychometricResponses = responses.filter(r => {
      const question = assessmentQuestions.find(q => q.id === r.questionId)
      return question?.category === 'psychometric'
    })
    
    const technicalResponses = responses.filter(r => {
      const question = assessmentQuestions.find(q => q.id === r.questionId)
      return question?.category === 'technical'
    })
    
    const wiscarResponses = responses.filter(r => {
      const question = assessmentQuestions.find(q => q.id === r.questionId)
      return question?.category === 'wiscar'
    })

    const psychometricScore = calculateCategoryScore(psychometricResponses)
    const technicalScore = calculateCategoryScore(technicalResponses)
    
    // Calculate WISCAR scores
    const wiscarScores: WiscarScores = {
      will: calculateWiscarSubcategoryScore(wiscarResponses, 'will'),
      interest: calculateWiscarSubcategoryScore(responses, 'interest'),
      skill: technicalScore, // Technical score represents skill
      cognitiveReadiness: calculateWiscarSubcategoryScore(wiscarResponses, 'cognitive_readiness'),
      abilityToLearn: calculateWiscarSubcategoryScore(wiscarResponses, 'ability_to_learn'),
      realWorldAlignment: calculateWiscarSubcategoryScore(wiscarResponses, 'real_world_alignment')
    }

    // Calculate overall score (weighted average)
    const overallScore = (
      psychometricScore * 0.3 +
      technicalScore * 0.3 +
      Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.4
    )

    // Generate recommendation
    let recommendation: 'yes' | 'maybe' | 'no' = 'no'
    let confidence = overallScore
    
    if (overallScore >= 80) {
      recommendation = 'yes'
    } else if (overallScore >= 50) {
      recommendation = 'maybe'
    }

    // Generate next steps and career matches
    const nextSteps = generateNextSteps(recommendation, psychometricScore, technicalScore, wiscarScores)
    const careerMatches = generateCareerMatches(overallScore, psychometricScore, technicalScore)

    return {
      userId: 'user-' + Date.now(),
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      confidence,
      nextSteps,
      careerMatches,
      generatedAt: new Date().toISOString()
    }
  }, [])

  const calculateCategoryScore = (responses: AssessmentResponse[]): number => {
    if (responses.length === 0) return 0
    const totalScore = responses.reduce((sum, response) => sum + response.score, 0)
    const maxPossibleScore = responses.length * 10 // Assuming max score per question is 10
    return Math.min(100, (totalScore / maxPossibleScore) * 100)
  }

  const calculateWiscarSubcategoryScore = (responses: AssessmentResponse[], subcategory: string): number => {
    const subcategoryResponses = responses.filter(r => {
      const question = assessmentQuestions.find(q => q.id === r.questionId)
      return question?.subcategory === subcategory
    })
    return calculateCategoryScore(subcategoryResponses)
  }

  const generateNextSteps = (
    recommendation: 'yes' | 'maybe' | 'no',
    psychometricScore: number,
    technicalScore: number,
    wiscarScores: WiscarScores
  ): string[] => {
    const steps: string[] = []
    
    if (recommendation === 'yes') {
      steps.push('Enroll in advanced GDPR certification program')
      steps.push('Gain hands-on experience with privacy impact assessments')
      steps.push('Network with data protection professionals')
    } else if (recommendation === 'maybe') {
      if (technicalScore < 70) {
        steps.push('Complete foundational data protection law courses')
        steps.push('Study GDPR and CCPA requirements in detail')
      }
      if (psychometricScore < 70) {
        steps.push('Develop analytical and critical thinking skills')
        steps.push('Practice ethical decision-making scenarios')
      }
      steps.push('Consider starting with compliance analyst role')
    } else {
      steps.push('Explore related careers in cybersecurity or legal technology')
      steps.push('Build foundational IT and legal knowledge')
      steps.push('Consider data analyst or business analyst roles as stepping stones')
    }
    
    return steps
  }

  const generateCareerMatches = (
    overallScore: number,
    psychometricScore: number,
    technicalScore: number
  ): string[] => {
    const careers: string[] = []
    
    if (overallScore >= 80) {
      careers.push('Data Privacy Officer', 'Chief Privacy Officer', 'Privacy Consultant')
    } else if (overallScore >= 60) {
      careers.push('Compliance Analyst', 'Privacy Specialist', 'Legal Technology Analyst')
    } else if (technicalScore >= 60) {
      careers.push('Cybersecurity Analyst', 'Information Security Specialist')
    } else if (psychometricScore >= 60) {
      careers.push('Business Analyst', 'Risk Management Specialist')
    }
    
    if (careers.length === 0) {
      careers.push('Data Analyst', 'Project Coordinator', 'Administrative Specialist')
    }
    
    return careers
  }

  const getProgress = useCallback(() => {
    return (assessmentState.currentQuestionIndex / assessmentQuestions.length) * 100
  }, [assessmentState.currentQuestionIndex])

  const resetAssessment = useCallback(() => {
    setAssessmentState({
      currentQuestionIndex: 0,
      responses: [],
      isComplete: false
    })
  }, [])

  return {
    assessmentState,
    getCurrentQuestion,
    submitAnswer,
    getProgress,
    resetAssessment,
    totalQuestions: assessmentQuestions.length
  }
}