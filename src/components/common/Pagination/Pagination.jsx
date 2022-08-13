import React from 'react'
import './_Pagination.scss'

const Pagination = ({ page,pages,changePage }) => {
  return (
    <div className='pagination'>
        <ul className="pagination-list">
            {[...Array(pages).keys()].map((item => {
                return (
                    <li onClick={() => changePage(item + 1)} className={page === item + 1 ? 'pagination-item active' : 'pagination-item'}>{item + 1}</li>
                )
            }))}
        </ul>
    </div>
  )
}

export default Pagination