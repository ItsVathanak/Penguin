import { Link } from 'react-router-dom';
import Antigravity from '../components/AntiGravity';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden">

      {/* The physics bg */}
      <div className="absolute inset-0 w-full h-full">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#A2AADB"
          autoAnimate={true}
          particleVariance={1}
          particleShape="capsule"
        />
      </div>


      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] text-center px-4 pointer-events-none">
            
        <div className="pointer-events-auto max-w-2xl bg-white/50 dark:bg-gray-900/30 backdrop-blur-md p-8 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl">
          <h1 className="text-6xl font-bold font-display text-gray-900 dark:text-white mb-6 tracking-tight">
            Penguin 
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
            The distraction-free, local-first markdown editor.<br/>
            <span className="text-lg text-gray-500 dark:text-gray-400 font-code mt-2 block">
              Built for speed. Designed for focus.
            </span>
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              to="/editor" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Start Writing
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}