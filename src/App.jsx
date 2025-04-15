import Forms from "./components/forms/Forms";
import Header from "./components/header/Header";
import QRcode from "./components/qr-code/QRcode";
import './style/global.css';
import './style/reset.css';

function App() {

  return (
    <>
      <Header />
      <div className="container-geral">
        <Forms />
        <QRcode />
      </div>
    </>
  );
}

export default App;
