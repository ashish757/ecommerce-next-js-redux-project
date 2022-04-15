export default function Filter({ filter, handler, categoryId, category }) {

    return (
        <div className={filter.active ? "filter active" : "filter"}>

            <style jsx> {`

                .filter button {
                    border: 1px solid rgb(212, 212, 212);
                    background-color: rgb(241, 241, 241);
                    padding: .3rem .5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .filter button:hover {
                    border: 1px solid rgb(109, 109, 109);
                    background-color: rgb(218, 218, 218);
                    color: rgb(66, 66, 66);
                }

                .filter.active button {
                    border: 1px solid rgb(168, 168, 168);
                    background-color: rgb(218, 218, 218);
                }

            `}</style>

            <button onClick={() => handler(filter._id, categoryId)}>{filter.name}
                {
                    category === "rating" ? (
                            
                        <svg viewBox="0 0 20 20" fill="currentColor" style={{transform: "translateY(.1rem)",width: '1rem', marginLeft: '.3rem'}}>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ) : ""
                }
            </button>
        </div>
    )

}