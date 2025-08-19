import { Question } from "@/types/assessment"

export const assessmentQuestions: Question[] = [
  // Psychometric - Interest & Motivation
  {
    id: "psych_001",
    category: "psychometric",
    subcategory: "interest",
    type: "likert_scale",
    question: "How interested are you in staying updated with data protection regulations and legal frameworks?",
    options: ["Not at all interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"],
    weight: 1.2
  },
  {
    id: "psych_002",
    category: "psychometric",
    subcategory: "personality",
    type: "scenario",
    question: "You discover that your company is processing personal data without proper consent. What is your immediate response?",
    scenarios: {
      situation: "A colleague mentions they've been collecting email addresses from website visitors without clear consent mechanisms.",
      options: [
        { text: "Immediately escalate to management and suggest halting the collection", score: 10 },
        { text: "Research the legal requirements before taking action", score: 8 },
        { text: "Suggest implementing a proper consent mechanism gradually", score: 6 },
        { text: "Wait to see if anyone else notices the issue", score: 2 }
      ]
    },
    weight: 1.5
  },
  {
    id: "psych_003",
    category: "psychometric",
    subcategory: "ethics",
    type: "likert_scale",
    question: "How comfortable are you with having to sometimes say 'no' to business requests that may violate privacy regulations?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"],
    weight: 1.3
  },

  // Technical Readiness
  {
    id: "tech_001",
    category: "technical",
    subcategory: "gdpr_knowledge",
    type: "multiple_choice",
    question: "What does GDPR stand for?",
    options: [
      "General Data Protection Regulation",
      "Global Data Privacy Rules",
      "General Digital Protection Rights",
      "Global Data Processing Regulation"
    ],
    correctAnswer: "General Data Protection Regulation",
    weight: 1.0
  },
  {
    id: "tech_002",
    category: "technical",
    subcategory: "technical_concepts",
    type: "multiple_choice",
    question: "Which of the following is considered personally identifiable information (PII)?",
    options: [
      "IP address and email address",
      "Only social security numbers",
      "Only names and addresses",
      "Only financial information"
    ],
    correctAnswer: "IP address and email address",
    weight: 1.1
  },
  {
    id: "tech_003",
    category: "technical",
    subcategory: "risk_assessment",
    type: "scenario",
    question: "Your company wants to implement a new customer analytics system. What is your first priority as a DPO?",
    scenarios: {
      situation: "The marketing team wants to deploy AI-powered customer behavior tracking across the website.",
      options: [
        { text: "Conduct a Data Protection Impact Assessment (DPIA)", score: 10 },
        { text: "Review the vendor's security certifications", score: 7 },
        { text: "Check if customers have consented to analytics", score: 8 },
        { text: "Ensure the system complies with internal policies", score: 5 }
      ]
    },
    weight: 1.4
  },

  // WISCAR Framework
  {
    id: "wiscar_001",
    category: "wiscar",
    subcategory: "will",
    type: "likert_scale",
    question: "How committed are you to pursuing continuous learning in privacy law and technology?",
    options: ["Not committed", "Slightly committed", "Moderately committed", "Very committed", "Extremely committed"],
    weight: 1.2
  },
  {
    id: "wiscar_002",
    category: "wiscar",
    subcategory: "cognitive_readiness",
    type: "multiple_choice",
    question: "When facing a complex privacy compliance issue, what is your preferred approach?",
    options: [
      "Break it down into smaller, manageable components",
      "Seek expert advice immediately",
      "Apply previous experience and patterns",
      "Research extensively before acting"
    ],
    correctAnswer: "Break it down into smaller, manageable components",
    weight: 1.3
  },
  {
    id: "wiscar_003",
    category: "wiscar",
    subcategory: "ability_to_learn",
    type: "scenario",
    question: "A new privacy regulation has been introduced in your industry. How do you approach learning about it?",
    scenarios: {
      situation: "The government has just announced new AI governance requirements that affect your company's machine learning models.",
      options: [
        { text: "Create a structured learning plan with timelines and resources", score: 10 },
        { text: "Attend industry webinars and conferences", score: 8 },
        { text: "Read the regulation document thoroughly", score: 7 },
        { text: "Wait for legal interpretations to emerge", score: 4 }
      ]
    },
    weight: 1.2
  },
  {
    id: "wiscar_004",
    category: "wiscar",
    subcategory: "real_world_alignment",
    type: "scenario",
    question: "You need to explain GDPR compliance to a non-technical marketing team. How do you approach this?",
    scenarios: {
      situation: "The marketing team is frustrated with privacy restrictions affecting their campaigns and wants to understand 'why all these rules exist'.",
      options: [
        { text: "Use business impact examples and analogies they can relate to", score: 10 },
        { text: "Provide a detailed legal explanation of the regulations", score: 6 },
        { text: "Focus on the penalties and risks of non-compliance", score: 7 },
        { text: "Direct them to read the regulation themselves", score: 3 }
      ]
    },
    weight: 1.4
  },

  // Additional questions for comprehensive assessment
  {
    id: "psych_004",
    category: "psychometric",
    subcategory: "attention_to_detail",
    type: "multiple_choice",
    question: "When reviewing a data processing agreement, what would you prioritize checking first?",
    options: [
      "Data retention periods and deletion procedures",
      "Security measures and encryption requirements",
      "Legal basis for processing and consent mechanisms",
      "All of the above with equal priority"
    ],
    correctAnswer: "All of the above with equal priority",
    weight: 1.1
  },
  {
    id: "tech_004",
    category: "technical",
    subcategory: "logical_reasoning",
    type: "multiple_choice",
    question: "If a data breach affects 500 EU residents, what is the maximum time you have to notify the supervisory authority?",
    options: [
      "24 hours",
      "72 hours", 
      "7 days",
      "30 days"
    ],
    correctAnswer: "72 hours",
    weight: 1.2
  }
]