export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span className="site-footer__brand">Studio</span>
        <span className="site-footer__copy">
          © {year} Studio. All rights reserved.
        </span>
        <div className="site-footer__links">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a key={item} href="#" className="site-footer__link">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
