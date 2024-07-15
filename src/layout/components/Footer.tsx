
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>Copyright &copy; {new Date().getFullYear()} Book Library</p>
    </footer>
  );
};

export default Footer;