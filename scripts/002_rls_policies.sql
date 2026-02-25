-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE calibrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE engaged_names ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Sessions
CREATE POLICY "sessions_select_own" ON sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sessions_insert_own" ON sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Goals
CREATE POLICY "goals_select_own" ON goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "goals_insert_own" ON goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "goals_update_own" ON goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "goals_delete_own" ON goals FOR DELETE USING (auth.uid() = user_id);

-- Calibrations
CREATE POLICY "calibrations_select_own" ON calibrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "calibrations_insert_own" ON calibrations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily checkins
CREATE POLICY "checkins_select_own" ON daily_checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "checkins_insert_own" ON daily_checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Engaged names
CREATE POLICY "engaged_select_own" ON engaged_names FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "engaged_insert_own" ON engaged_names FOR INSERT WITH CHECK (auth.uid() = user_id);
