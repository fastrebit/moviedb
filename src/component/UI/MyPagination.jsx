import React from 'react'
import { Pagination } from 'antd'

const MyPagination = ({ total, setPage }) => {
  return (
    <Pagination
      align="center"
      total={total}
      pageSize={20}
      onChange={(page) => {
        setPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' }) // плавная прокрутка вверх
      }}
      showSizeChanger={false}
    />
  )
}

export default MyPagination
