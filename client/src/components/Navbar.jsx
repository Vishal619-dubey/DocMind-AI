import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
      <h1 className="text-3xl font-bold">
        <span className="text-indigo-500">Doc</span>Mind AI
      </h1>

      <div className="hidden md:flex gap-8 text-gray-300">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <Button>Get Started</Button>
    </nav>
  );
}