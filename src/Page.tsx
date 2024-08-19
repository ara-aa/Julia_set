import { Layout, Button } from '@/components'

function Page() {
  return (
    <Layout>
      <h2>Vite + React</h2>
      <div className='card'>
        <Button variant='outline'>Button</Button>
        <p>
          Edit <code>src/Page.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </Layout>
  )
}

export default Page
