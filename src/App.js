import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import MenuBar from "./components/menubar";
import Logare from "./pages/logare";
import Registrare from "./pages/registrare";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import BrandList from "./pages/BrandList";
import Appointment from './pages/appointment';
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App flex">
        <MenuBar />

        <Routes>
          <Route path="/" element={<Logare />} />
          <Route path="/logare" element={<Logare />} />
          <Route path="/registrare" element={<Registrare />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/appointment" element={<Appointment/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
