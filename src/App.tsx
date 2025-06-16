import BingoBoard from './components/BingoBoard';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 Remote Work Buzzword Bingo</h1>
        <BingoBoard />
      </div>
    </div>
  )
}

export default App
