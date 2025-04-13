/*
  # Create CVs table and related security policies

  1. New Tables
    - `cvs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `template_id` (text)
      - `title` (text)
      - `content` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `cvs` table
    - Add policies for:
      - Users can read their own CVs
      - Users can create their own CVs
      - Users can update their own CVs
      - Users can delete their own CVs
*/

CREATE TABLE IF NOT EXISTS cvs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  template_id text NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own CVs"
  ON cvs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own CVs"
  ON cvs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cvs_updated_at
  BEFORE UPDATE ON cvs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();