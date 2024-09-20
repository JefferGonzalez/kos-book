import ThemeProvider from '@/context/ThemeContext'
import Auth from '@/pages/auth'
import Upload from '@/pages/docs/Upload'
import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'

import { Route, Routes } from 'react-router-dom'

export default function Root() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/docs/upload' element={<Upload />} />
        <Route path='auth' element={<Auth />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}
