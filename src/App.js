import './App.css';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Header from './Component/Header';
import Homepages from './Pages/Homepages';
import Coinpage from './Pages/Coinpage';
import {makeStyles} from "@material-ui/core";
import Alert from './Authentication/Alert';

function App() {

  const useStyles=makeStyles(()=>({
    App:{
      backgroundColor: '#14161a',

    },
  }));

  const classes=useStyles();

  return (
    <BrowserRouter>
      <div style={{backgroundColor:'#14161a',color: "white",minHeight:"100vh"}}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Homepages/>}/>
            <Route path="/coins/:id" element={<Coinpage />}/>
            {/* <Alert /> */}
          </Routes>
        </div>
        <Alert/>
      </div>

    </BrowserRouter>
  );
}

export default App;
