import FormButtons from "./components/FormButtons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <FormButtons />
    </div>
  );
}

export default App;
