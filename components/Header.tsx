import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <a href="/" className="header__logo">
          Streak<span className="header__logo-accent">y</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
