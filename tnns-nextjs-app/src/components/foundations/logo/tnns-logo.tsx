import Link from 'next/link';

export const TNNSLogo = ({ className }: { className?: string }) => (
  <Link
    aria-label="Go to homepage"
    href="/"
    className={`rounded-sm outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
  >
    <h1 className="text-xl font-bold text-gray-900">TNNS</h1>
  </Link>
); 