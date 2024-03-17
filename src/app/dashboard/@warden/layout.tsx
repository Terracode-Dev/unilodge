import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex">
      <Link href="/dashboard/pending" legacyBehavior passHref>
        <a className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-l">
          Pending
        </a>
      </Link>
      <Link href="/dashboard/approved" legacyBehavior passHref>
        <a className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-l-0 border-gray-300">
          Accepted
        </a>
      </Link>
      <Link href="/dashboard/rejected" legacyBehavior passHref>
        <a className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-l-0 rounded-r border-gray-300">
          Rejected
        </a>
      </Link>
    </nav>
      <div>{children}</div>
    </>
  )
}
