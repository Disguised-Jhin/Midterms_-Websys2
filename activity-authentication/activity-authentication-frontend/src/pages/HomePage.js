import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();

  function goToLoginPage() {
    navigate('/');
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
      <div className="text-3xl font-bold text-slate-500 text-center">Welcome to this generic app!</div>
    </div>
  );
}

export default HomePage;