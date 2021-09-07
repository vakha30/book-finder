import React from 'react'

function SearchBlock({ searchBooks }) {

    const [inputText, setInputText] = React.useState('');
    const [category, setCategory] = React.useState('all');
    const [sortBy, setSortBy] = React.useState('relevance');

    const handleChange = (e) => {
        switch (e.target.name) {
            case "categories":
                setCategory(e.target.value)
                break
            case "sort-by":
                setSortBy(e.target.value)
                break
            case "text":
                setInputText(e.target.value)
                break
            default:
                console.log("----");
                break
        }
    }

    const handleClick = () => {
        if (inputText.length > 0) {
            searchBooks({
                inputText,
                category,
                sortBy
            })
        } else {
            alert("Enter text...")
        }

    }

    return (
        <div className="search-block">
            <div className="search-input">
                <input type="text" name="text" onChange={handleChange} value={inputText} />
                <button onClick={handleClick}>Search</button>
            </div>
            <label>
                <span>Categories</span>
                <select name="categories" onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="art">Art</option>
                    <option value="biography">Biography</option>
                    <option value="computers">Computers</option>
                    <option value="history">History</option>
                    <option value="medical">Medical</option>
                    <option value="poetry">Poetry</option>
                </select>
            </label>

            <label>
                <span>Sorting by</span>
                <select name="sort-by" onChange={handleChange}>
                    <option value="relevance">Relevance</option>
                    <option value="newest">newest</option>
                </select>
            </label>
        </div>
    )
}

export default SearchBlock
