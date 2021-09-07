import React from 'react'
import SearchBlock from './SearchBlock'

function Header({searchBooks}) {
    return (
        <div className="header">
            <div className="header__inner">
                <h1 className="header__title">Book finder</h1>
                <SearchBlock searchBooks={searchBooks} />
            </div>

        </div>
    )
}

export default Header
