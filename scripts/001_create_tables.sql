-- Profiles (auto-created on signup)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions (check-in completions)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name_id INTEGER NOT NULL,
  states TEXT[] DEFAULT '{}',
  source TEXT NOT NULL DEFAULT 'check-in',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goals
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('name_linked', 'pillar', 'freeform')),
  name_id INTEGER,
  pillar TEXT CHECK (pillar IN ('know', 'feel', 'live')),
  title TEXT NOT NULL,
  duration_days INTEGER NOT NULL DEFAULT 7,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  daily_checkins JSONB DEFAULT '[]',
  ai_tags JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Calibration logs
CREATE TABLE IF NOT EXISTS calibrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL,
  matched_name TEXT NOT NULL,
  risk_level TEXT NOT NULL DEFAULT 'none',
  turn_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily check-in tracking (for streaks)
CREATE TABLE IF NOT EXISTS daily_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  name_id INTEGER NOT NULL,
  source TEXT NOT NULL DEFAULT 'check-in',
  UNIQUE(user_id, date, source)
);

-- Engaged names tracking
CREATE TABLE IF NOT EXISTS engaged_names (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name_id INTEGER NOT NULL,
  first_engaged_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, name_id)
);
