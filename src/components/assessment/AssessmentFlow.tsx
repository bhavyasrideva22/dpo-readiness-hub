import { useAssessment } from "@/hooks/useAssessment"
import { AssessmentIntro } from "./AssessmentIntro"
import { QuestionCard } from "./QuestionCard"
import { AssessmentResults } from "./AssessmentResults"
import { useState } from "react"

export function AssessmentFlow() {
  const [hasStarted, setHasStarted] = useState(false)
  const { 
    assessmentState, 
    getCurrentQuestion, 
    submitAnswer, 
    getProgress,
    resetAssessment,
    totalQuestions
  } = useAssessment()

  const handleStartAssessment = () => {
    setHasStarted(true)
  }

  const handleRestart = () => {
    resetAssessment()
    setHasStarted(false)
  }

  const handleAnswer = (answer: string | number) => {
    submitAnswer(answer)
  }

  // Show intro if not started
  if (!hasStarted) {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />
  }

  // Show results if complete
  if (assessmentState.isComplete && assessmentState.results) {
    return (
      <AssessmentResults 
        results={assessmentState.results} 
        onRestart={handleRestart}
      />
    )
  }

  // Show current question
  const currentQuestion = getCurrentQuestion()
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Complete</h2>
          <p className="text-muted-foreground">Processing your results...</p>
        </div>
      </div>
    )
  }

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={assessmentState.currentQuestionIndex + 1}
      totalQuestions={totalQuestions}
      progress={getProgress()}
      onAnswer={handleAnswer}
    />
  )
}