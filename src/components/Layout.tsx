import Header from "./Header";
import Footer from "./Footer";
import PageContainer from "./PageContainer";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </div>
  );
};

export default Layout;
