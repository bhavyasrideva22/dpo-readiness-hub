import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Question } from "@/types/assessment"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Badge } from "@/components/ui/badge"

interface QuestionCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  progress: number
  onAnswer: (answer: string | number) => void
}

export function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  progress, 
  onAnswer 
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer)
      setSelectedAnswer("")
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'psychometric':
        return 'bg-dpo-accent/20 text-dpo-accent'
      case 'technical':
        return 'bg-dpo-primary/20 text-dpo-primary'
      case 'wiscar':
        return 'bg-dpo-secondary/20 text-dpo-secondary'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const renderQuestionContent = () => {
    if (question.type === 'multiple_choice' && question.options) {
      return (
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`}
                  className="cursor-pointer flex-1 p-3 rounded-lg border hover:bg-muted transition-colors"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      )
    }

    if (question.type === 'likert_scale' && question.options) {
      return (
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`likert-${index}`} />
                <Label 
                  htmlFor={`likert-${index}`}
                  className="cursor-pointer flex-1 p-3 rounded-lg border hover:bg-muted transition-colors"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      )
    }

    if (question.type === 'scenario' && question.scenarios) {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Scenario:</h4>
            <p className="text-muted-foreground">{question.scenarios.situation}</p>
          </div>
          
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-3">
              {question.scenarios.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`scenario-${index}`} />
                  <Label 
                    htmlFor={`scenario-${index}`}
                    className="cursor-pointer flex-1 p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      )
    }

    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <ProgressBar progress={progress} className="mb-4" showPercentage />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge className={getCategoryBadgeColor(question.category)}>
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </Badge>
        </div>
      </div>

      <Card className="border-0 shadow-card-hover">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
          {question.subcategory && (
            <CardDescription>
              Evaluating: {question.subcategory.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {renderQuestionContent()}
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              {questionNumber === totalQuestions ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}