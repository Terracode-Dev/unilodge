import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/dashboard/pending">Pending</Link>
        <Link href="/dashboard/approved">Accepted</Link>
        <Link href="/dashboard/rejected">Rejected</Link>
      </nav>
      <div>{children}</div>
    </>
  )
}
