import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-r from-red-100 to-blue-100 min-h-screen py-7 px-4">
        <Routes>
          <Route index element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
