import Form from "./Components/Form/Form";
import { listData } from "./lib/dummydata";
import { SavetoLS } from "./Components/Save/SavetoLS";
import Cols from "./Components/Cols/Fields";
function App() {

  SavetoLS(listData);

  return (
    <>
      <Form />
    </>

  );
}

export default App;
