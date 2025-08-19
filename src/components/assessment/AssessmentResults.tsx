import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AssessmentResults as Results } from "@/types/assessment"
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Users,
  Target,
  Award,
  Briefcase,
  Download
} from "lucide-react"

interface AssessmentResultsProps {
  results: Results
  onRestart: () => void
}

export function AssessmentResults({ results, onRestart }: AssessmentResultsProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="w-8 h-8 text-success" />
      case 'maybe':
        return <AlertCircle className="w-8 h-8 text-warning" />
      case 'no':
        return <XCircle className="w-8 h-8 text-destructive" />
    }
  }

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'text-success'
      case 'maybe':
        return 'text-warning'
      case 'no':
        return 'text-destructive'
    }
  }

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'Highly Recommended'
      case 'maybe':
        return 'Recommended with Preparation'
      case 'no':
        return 'Consider Alternative Paths'
    }
  }

  const getRecommendationDescription = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'You show strong alignment with DPO responsibilities and have the foundational skills to succeed in this career path.'
      case 'maybe':
        return 'You have potential for this role but would benefit from additional preparation in key areas before pursuing DPO positions.'
      case 'no':
        return 'Your profile suggests exploring related careers might be more suitable. Consider the alternative paths we\'ve suggested.'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6">
          <Award className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Your DPO Readiness Results</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive analysis of your fit for becoming a Data Privacy Officer
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className="mb-8 border-0 shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getRecommendationIcon()}
            <div>
              <div className={`text-2xl ${getRecommendationColor()}`}>
                {getRecommendationText()}
              </div>
              <div className="text-lg font-normal text-muted-foreground">
                {Math.round(results.confidence)}% Overall Match
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-base">
            {getRecommendationDescription()}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Score Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-dpo-accent" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-dpo-accent mb-2">
              {Math.round(results.psychometricScore)}%
            </div>
            <Progress value={results.psychometricScore} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Personality, ethics, and natural alignment with DPO responsibilities
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-dpo-primary" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-dpo-primary mb-2">
              {Math.round(results.technicalScore)}%
            </div>
            <Progress value={results.technicalScore} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Knowledge of data protection laws and technical concepts
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dpo-secondary" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-dpo-secondary mb-2">
              {Math.round(results.overallScore)}%
            </div>
            <Progress value={results.overallScore} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Combined assessment of all factors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Analysis */}
      <Card className="mb-8 border-0 shadow-card-hover">
        <CardHeader>
          <CardTitle>WISCAR Framework Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of your readiness across six key dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Will</span>
                  <span className="text-sm text-muted-foreground">{Math.round(results.wiscarScores.will)}%</span>
                </div>
                <Progress value={results.wiscarScores.will} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Interest</span>
                  <span className="text-sm text-muted-foreground">{Math.round(results.wiscarScores.interest)}%</span>
                </div>
                <Progress value={results.wiscarScores.interest} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Skill</span>
                  <span className="text-sm text-muted-foreground">{Math.round(results.wiscarScores.skill)}%</span>
                </div>
                <Progress value={results.wiscarScores.skill} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Cognitive Readiness</span>
                  <span className="text-sm text-muted-foreground">{Math.round(results.wiscarScores.cognitiveReadiness)}%</span>
                </div>
                <Progress value={results.wiscarScores.cognitiveReadiness} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Ability to Learn</span>
                  <span className="text-sm text-muted-foreground">{Math.round(results.wiscarScores.abilityToLearn)}%</span>
                </div>
                <Progress value={results.wiscarScores.abilityToLearn} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Real-World Alignment</span>
                  <span className="text-sm text-muted-foreground">{Math.round(results.wiscarScores.realWorldAlignment)}%</span>
                </div>
                <Progress value={results.wiscarScores.realWorldAlignment} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Matches & Next Steps */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-0 shadow-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Career Matches
            </CardTitle>
            <CardDescription>
              Roles that align with your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.careerMatches.map((career, index) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-2">
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Next Steps
            </CardTitle>
            <CardDescription>
              Recommended actions to advance your career goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 shrink-0" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          Take Assessment Again
        </Button>
        <Button 
          size="lg"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Full Report
        </Button>
      </div>
    </div>
  )
}