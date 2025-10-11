import { useNavigate } from 'react-router';
import { UseAuthentication } from '../hooks/useAuthentication';

function LoginPage() {
  const navigate = useNavigate();
  const authenticationService = UseAuthentication();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onLoginClick() {
    // Complete something here
    authenticationService.login('username', 'password')
      .then(res => {
        goToHomePage();
      })
      .catch(err => {
        // show an error
        alert("Login failed. Please try again.");
      });
  }

  function goToHomePage() {
    navigate('home');
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-violet-200 to-rose-200 flex p-20 items-center">
      <div className="bg-white rounded-2xl shadow-2xl shadow-rose-600/20 ml-auto p-8 min-w-[520px]">
        <div className="mb-8">
          <div className="text-3xl font-bold text-pink-500">Welcome!</div>
          <div className="font-medium text-slate-400">Login below to get started</div>
        </div>

        {/* Complete something here */}
        <div className="mb-4 w-full">
          <label className="block mb-1 font-bold text-slate-600">Username</label>
          <input className="border-[1px] border-slate-200 w-full rounded px-2 py-1 bg-slate-50 focus:outline-pink-400" />
              value={'username'}
              onChange={(e) => setUsername(e.target.value)}        
        </div>

        {/* Complete something here */}
        <div className="mb-2 w-full">
          <label className="block mb-1 font-bold text-slate-600">Password</label>
          <input 
              type="password"
              className="border-[1px] border-slate-200 w-full rounded px-2 py-1 bg-slate-50 focus:outline-pink-400" />
              value={'password'}
              onChange={(e) => setPassword(e.target.value)}
        </div>

        {/* Complete something here */}
        <button 
          onClick={onLoginClick}
          className="font-bold tracking-wider mt-10 text-white bg-pink-400 rounded-lg w-full p-3 hover:bg-pink-300 active:bg-pink-200 transition-colors">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;