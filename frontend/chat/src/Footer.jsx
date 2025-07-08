const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-8 mt-auto">
            <div className="container">
                <p className="mb-0">&copy; {new Date().getFullYear()} Patronecs. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
