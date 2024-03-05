import Image from 'next/image'

import React from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { ITodo } from '@/types/todo'

interface ImgTodoProps {
  imgData?: Partial<ITodo>
  forForm?: string
}

const ImgTodo = ({ imgData, forForm }: ImgTodoProps) => {
  //@ts-ignore
  const { todoImg, title, altTodo, titleImg } = imgData || {}

  return (
    <>
      <AspectRatio ratio={224 / 120}>
        {todoImg || forForm ? (
          <Image
            className="h-full w-full object-cover"
            src={forForm ? forForm : `${todoImg}?${new Date().getTime()}`}
            alt={altTodo ? altTodo : `${title} image`}
            title={titleImg}
            fill
          />
        ) : null}
      </AspectRatio>
    </>
  )
}

export default ImgTodo
