import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/HomePage";
import GetCertificates from "./components/pages/GetCertificates";
import IssueCertificates from "./components/pages/IssueCertificates";
import RevokeCertificate from "./components/pages/RevokeCertificate";
import ShareCertificate from "./components/pages/ShareCertificate";
import PendingVerify from "./components/pages/PendingVerify";
import CertificateDetail from "./components/pages/CertificateDetail";
import pdfUrl from "./assets/pdf/toeic.pdf";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get" element={<GetCertificates />} />
          <Route path="/issue" element={<IssueCertificates />} />
          <Route path="/revoke/:address?" element={<RevokeCertificate />} />
          <Route path="/share/:address?" element={<ShareCertificate />} />
          <Route path="/pending" element={<PendingVerify />} />
          <Route
            path="/get/:address"
            element={<CertificateDetail pdfUrl={pdfUrl} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
