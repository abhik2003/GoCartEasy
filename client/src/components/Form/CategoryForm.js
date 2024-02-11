import React from 'react'

function CategoryForm({ handleSubmit, value, setValue, submitType }) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 text-center">
                    <input type="text" className="form-control" placeholder='Enter new category name' value={value} onChange={(e) => { setValue(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">{submitType}</button>
            </form>

        </>
    )
}

export default CategoryForm