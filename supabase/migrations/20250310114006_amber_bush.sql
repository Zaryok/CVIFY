/*
  # Create CVs table and setup security

  1. New Tables
    - `cvs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `template_id` (text)
      - `title` (text)
      - `content` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `cvs` table
    - Add policies for authenticated users to:
      - Create their own CVs
      - Read their own CVs
      - Update their own CVs
      - Delete their own CVs

  3. Triggers
    - Add updated_at trigger to automatically update the timestamp
*/

-- Create the CVs table if it doesn't exist
CREATE TABLE IF NOT EXISTS cvs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  template_id text NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can create own CVs" ON cvs;
    DROP POLICY IF EXISTS "Users can view own CVs" ON cvs;
    DROP POLICY IF EXISTS "Users can update own CVs" ON cvs;
    DROP POLICY IF EXISTS "Users can delete own CVs" ON cvs;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create policies
CREATE POLICY "Users can create own CVs"
  ON cvs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own CVs"
  ON cvs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
  ON cvs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
  ON cvs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_cvs_updated_at ON cvs;

-- Create trigger
CREATE TRIGGER update_cvs_updated_at
  BEFORE UPDATE ON cvs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();