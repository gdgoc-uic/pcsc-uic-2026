insert into public.evaluation_questions (question_text, question_type, question_key, is_required, display_order, meta)
values
  ('The conference was well organized.', 'rating', 'conference_well_organized', true, 4, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('Overall, this conference was worthwhile.', 'rating', 'conference_worthwhile', true, 5, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('I want to try to implement the knowledge learned in this conference.', 'rating', 'implement_knowledge', true, 6, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The conference topic was of interest to me.', 'rating', 'topic_interest', true, 7, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The conference presenter was prepared.', 'rating', 'presenter_prepared', true, 8, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The conference presenter kept the presentation interesting and lively.', 'rating', 'presenter_interesting', true, 9, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The methodologies employed by the conference presenter was effective.', 'rating', 'presenter_methodologies_effective', true, 10, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The conference presenter effectively answered questions.', 'rating', 'presenter_answered_questions', true, 11, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The conference presenter communicated in a clear, understandable manner.', 'rating', 'presenter_communicated_clear', true, 12, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The conference moderator was prepared.', 'rating', 'moderator_prepared', true, 13, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The moderator introduced the conference in a clear manner.', 'rating', 'moderator_introduced_clear', true, 14, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('The moderator communicated in a clear, understandable manner.', 'rating', 'moderator_communicated_clear', true, 15, '{"min": 1, "max": 5, "min_label": "1", "max_label": "5 (Strongly Agree)", "show_numbers": true}'),
  ('If this conference was repeated, would you recommend it?', 'select', 'recommend_repeat', true, 16, '{"options": ["Yes", "No"]}'),
  ('Do you feel the conference met its aims and objectives?', 'select', 'met_aims_objectives', true, 17, '{"options": ["Yes", "No"]}'),
  ('Would you attend the PCSC next year?', 'select', 'attend_next_year', true, 18, '{"options": ["Yes", "No"]}'),
  ('What was the one thing from the conference that you feel will help you the most?', 'textarea', 'most_helpful_thing', false, 19, '{"rows": 4, "placeholder": "Enter your answer..."}'),
  ('Comments/Suggestions:', 'textarea', 'comments_suggestions', false, 20, '{"rows": 4, "placeholder": "Enter your comments or suggestions..."}')
on conflict (question_key) do nothing;