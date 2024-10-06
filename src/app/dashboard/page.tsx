import Dashboard from '@/components/dashboard/dashboard'
import { ListProjects } from '@/server/actions/docs'

export default async function DashboardAll() {
  const response = await ListProjects()

  if (response.error) {
    return (
      <section className='bg-white shadow-2xl rounded-lg'>
        <div className='p-8 text-center'>
          <h1 className='text-2xl font-bold text-gray-800'>{response.error}</h1>
        </div>
      </section>
    )
  }
  
  const projects = response.data ?? []

  return (
    <section className='bg-white h-full shadow-2xl rounded-lg'>
      <Dashboard projects={projects}/>
    </section>
  )
}
