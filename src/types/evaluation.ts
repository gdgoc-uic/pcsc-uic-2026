export type QuestionType = "rating" | "text" | "textarea" | "select" | "multiple";

export interface RatingMeta {
  min: number;
  max: number;
  min_label: string;
  max_label: string;
  show_numbers: boolean;
}

export interface TextMeta {
  placeholder: string;
  max_length: number;
}

export interface TextareaMeta {
  placeholder: string;
  max_length: number;
  rows: number;
}

export interface SelectMeta {
  options: string[];
  allow_other: boolean;
}

export interface MultipleMeta {
  options: string[];
  min_select: number;
  max_select: number;
}

export type QuestionMeta =
  | RatingMeta
  | TextMeta
  | TextareaMeta
  | SelectMeta
  | MultipleMeta;

export interface EvaluationQuestion {
  id: string;
  question_text: string;
  question_type: QuestionType;
  question_key: string;
  is_required: boolean;
  display_order: number;
  meta: QuestionMeta;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FormSubmission {
  email: string;
  fullName: string;
  answers: Record<string, unknown>;
  comment?: string;
}

export interface EvaluationStakeholder {
  fullName: string;
}

export interface EvaluationValidationResponse {
  allowed: boolean;
  alreadySubmitted: boolean;
  message?: string;
  stakeholder?: EvaluationStakeholder;
}

export interface EvaluationSubmissionResponse {
  success?: boolean;
  submissionId?: string;
  message?: string;
  detail?: string;
}