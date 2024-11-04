import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateReport from "./pages/CreateReport";
import ReportSent from "./pages/ReportSent";
import ReportList from "./pages/ReportList";
import ReportDetail from "./pages/ReportDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/reports" element={<ReportList />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/sent" element={<ReportSent />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
