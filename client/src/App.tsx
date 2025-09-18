import { Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layout/Layout";
import { AuthPage, HomePage, ProfilePage } from "@/pages";
import { CLIENT_ROUTES } from "@/shared";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={CLIENT_ROUTES.AUTH} element={<AuthPage />} />
        <Route path={CLIENT_ROUTES.PROFILE} element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
