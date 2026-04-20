const Footer = () => {
  return (
    <footer className="px-4 pb-8 pt-4">
      <div className="terminal-frame shell-footer mx-auto max-w-7xl rounded-[22px]">
        <span className="text-[var(--yellow)]">UJJWAL</span>
        <span className="text-center text-[var(--ink-dim)]">
          built on Fedora, shipped with Next.js, wired for motion
        </span>
        <span className="justify-self-end text-[var(--ink-mute)]">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
