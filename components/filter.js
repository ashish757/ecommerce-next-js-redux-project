export default function Filter({ filter, handler }) {
    
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

            <button onClick={() => handler(filter)}>{filter.filter}</button>
        </div>
    )

}