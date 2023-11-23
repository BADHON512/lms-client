import React from 'react'
import {FC} from 'react'

interface Props{
    title:string;
    description:string,
    keyword:string;
}

const Heading:FC<Props> = ({title,description,keyword}) => {
  return (
    <>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </>
  )
}

export default Heading
