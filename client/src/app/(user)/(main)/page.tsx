import React, { Suspense } from 'react'

import TodoContent from './_components/TodoContent'

const page = () => {
  return (
    <div>
      <Suspense>
        <TodoContent />
      </Suspense>
    </div>
  )
}

export default page
