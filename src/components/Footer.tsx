const Footer = () => {
  return (
    <footer className="flex justify-center items-center p-6">
      <div className="text-xl">System powered by</div>
      <img
        src="/faceup-secondary-logo.svg"
        width={76}
        height={20}
        alt="logo"
        className="max-w-42 max-h-16 ml-2"
      />
    </footer>
  );
};

export default Footer;
