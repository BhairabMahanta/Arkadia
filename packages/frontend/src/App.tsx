import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/socketContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { GameHub } from './pages/GameHub';
import { TriviaPage } from './pages/games/TriviaPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { AuthProvider } from './context/AuthContext';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/games" 
                element={
                  <ProtectedRoute>
                    <GameHub />
                  </ProtectedRoute>
                } 
              />
              <Route path="/games/trivia" element={<TriviaPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/tournaments" 
                element={
                  <PlaceholderPage 
                    title="Tournaments" 
                    description="Compete in exciting tournaments and climb the leaderboards! This feature is coming soon with prize pools and seasonal competitions."
                  />
                } 
              />
              <Route 
                path="/leaderboard" 
                element={
                  <PlaceholderPage 
                    title="Leaderboard" 
                    description="View global rankings and see how you stack up against other players. Detailed statistics and achievements coming soon!"
                  />
                } 
              />
              <Route 
                path="/community" 
                element={
                  <PlaceholderPage 
                    title="Community" 
                    description="Connect with fellow gamers, join discussions, and share your gaming experiences. Social features are in development!"
                  />
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PlaceholderPage 
                    title="Profile" 
                    description="Customize your gaming profile, track your achievements, and showcase your favorite games. Profile system coming soon!"
                  />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <PlaceholderPage 
                    title="Settings" 
                    description="Personalize your GameForge experience with custom themes, notifications, and privacy controls."
                  />
                } 
              />
            </Routes>
          </Layout>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
