import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Users, TrendingUp, Clock, Target } from "lucide-react"

interface AssessmentIntroProps {
  onStartAssessment: () => void
}

export function AssessmentIntro({ onStartAssessment }: AssessmentIntroProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 animate-pulse-glow">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Are You Ready to Become a Data Privacy Officer?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover your fit for a career in data protection and privacy compliance through our comprehensive assessment
        </p>
      </div>

      {/* Assessment Overview */}
      <Card className="mb-8 border-0 shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Assessment Overview
          </CardTitle>
          <CardDescription>
            This assessment evaluates your psychological fit, technical readiness, and career alignment for becoming a Data Privacy Officer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">25-30 minutes</div>
                <div className="text-sm text-muted-foreground">Total time</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">12 questions</div>
                <div className="text-sm text-muted-foreground">Comprehensive evaluation</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">Detailed results</div>
                <div className="text-sm text-muted-foreground">With career guidance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What is a DPO */}
      <Card className="mb-8 border-0 shadow-card-hover">
        <CardHeader>
          <CardTitle>What is a Data Privacy Officer?</CardTitle>
          <CardDescription>
            A Data Privacy Officer ensures compliance with data protection regulations and protects organizational and customer data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Key Responsibilities</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm">Ensure GDPR, CCPA compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm">Conduct privacy impact assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm">Train staff on data protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm">Handle data breach responses</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Career Opportunities</h4>
              <div className="space-y-2">
                <Badge variant="secondary">Data Privacy Officer</Badge>
                <Badge variant="secondary">Compliance Analyst</Badge>
                <Badge variant="secondary">Privacy Consultant</Badge>
                <Badge variant="secondary">Legal-Tech Advisor</Badge>
                <Badge variant="secondary">Cybersecurity Governance</Badge>
              </div>
              <div className="mt-4 p-3 bg-success/10 rounded-lg">
                <div className="text-sm font-medium text-success">Average Salary Range</div>
                <div className="text-lg font-bold text-success">$90K - $150K+</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Components */}
      <Card className="mb-8 border-0 shadow-card-hover">
        <CardHeader>
          <CardTitle>What We'll Evaluate</CardTitle>
          <CardDescription>
            Our assessment uses the WISCAR framework to provide comprehensive insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">Psychometric Fit</h4>
              <p className="text-sm text-muted-foreground">
                Personality traits, ethics, motivation, and natural alignment with DPO responsibilities
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">Technical Readiness</h4>
              <p className="text-sm text-muted-foreground">
                Knowledge of data protection laws, technical concepts, and logical reasoning skills
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">WISCAR Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button 
          onClick={onStartAssessment}
          size="lg"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
        >
          Start Assessment
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          Your responses are private and used only for generating your personalized results
        </p>
      </div>
    </div>
  )
}