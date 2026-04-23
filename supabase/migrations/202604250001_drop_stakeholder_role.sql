-- Remove stakeholder_role column from stakeholders table
ALTER TABLE stakeholders DROP COLUMN IF EXISTS stakeholder_role;