import { useEffect, useState } from "react";
import { mapArrType } from "./types/type";


const dataFromAPI = [
    { body: "cruiser", power: "150cc", seater: "7 seater" },
    { body: "retro", power: "200cc", seater: "5 seater" },
    { body: "retro", power: "150cc", seater: "2 seater" },
    { body: "cruiser", power: "150cc", seater: "2 seater" },
    { body: "cruiser", power: "300cc", seater: "3 seater" },
    { body: "sports", power: "150cc", seater: "5 seater" },
    { body: "retro", power: "300cc", seater: "3 seater" },
    { body: "classic", power: "200cc", seater: "3 seater" },
];

function mockAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataFromAPI)
        }, 1000)
    })
}

function App() {
    const [store, setStore] = useState<Array<object>>([]);
    const [storeMain, setStoreMain] = useState<Array<object>>([]);
    const [filterKeys, setFilterKeys] = useState<Array<string>>([]);
    const [filterLength, setFilterLength] = useState<number>(0);
    const [filters, setFilters] = useState<mapArrType<string>>({});
    const [appliedFilters, setAppliedFilters] = useState<mapArrType<string>>({});


    function filterData(filters: mapArrType<string>, keyName: string, valueName: any) {
        if (!filters[keyName]) {
            filters[keyName] = [];
            console.log(filters);
        }

        if (!filters[keyName]?.includes(valueName)) {
            filters[keyName].push(valueName);
            setFilterLength(filterLength + 1)
        } else {
            filters[keyName] = filters[keyName].filter((item) => item !== valueName);
            setFilterLength(filterLength - 1)
        }

        const resultStore = storeMain.filter((car: any) => {
            let answer = true;
            for (let i = 0; i < filterKeys.length; i++) {
                const currentCheck =
                    filters[filterKeys[i]].length === 0 ||
                    filters[filterKeys[i]].includes(
                        car[filterKeys[i]]
                    );
                if (!currentCheck) {
                    answer = false;
                    break;
                }
            }

            return answer;
        });

        return resultStore;
    }

    // get data from mockAPI and set to store
    useEffect(() => {
        mockAPI().then((dataFromAPI: any) => {
            if (dataFromAPI.length > 0) {
                const filterKeys = Object.keys(dataFromAPI[0]);
                setFilterKeys(filterKeys);
            }
            setStore(dataFromAPI);
            setStoreMain(dataFromAPI);
        })
    }, [])


    // get all unique values from store and set to filters
    useEffect(() => {
        if (storeMain.length > 0) {
            const _filters: mapArrType<string> = {};
            const _appliedFilter: mapArrType<string> = {}

            for (let i = 0; i < filterKeys.length; i++) {
                const values = [...new Set(storeMain?.map((item: any) => item[filterKeys[i]]))];
                if (!filters[filterKeys[i]]) {
                    _filters[filterKeys[i]] = values;
                }

                if (!appliedFilters[filterKeys[i]]) {
                    _appliedFilter[filterKeys[i]] = [];
                }
            }

            setFilters(_filters);
            setAppliedFilters(_appliedFilter);
        }
    }, [store])


    return (
        <main className="test">
            {
                filterKeys.map((key, index) => {
                    return <div
                        key={index}
                    >
                        <label htmlFor={key}>{key}</label>
                        <div>
                            {
                                filters[key]?.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={(e: any) => {
                                                e.preventDefault();
                                                e.target.classList.toggle("active");

                                                let newFilters;
                                                if (appliedFilters[key].includes(item)) {
                                                    newFilters = {
                                                        ...appliedFilters,
                                                        [key]: appliedFilters[key].filter((x) => x !== item)
                                                    }
                                                } else {
                                                    newFilters = {
                                                        ...appliedFilters,
                                                        [key]: [...appliedFilters[key], item]
                                                    }
                                                }


                                                const newState = filterData(newFilters, key, item);
                                                console.log("newState -->", newState)
                                                setAppliedFilters(newFilters);
                                                // setStore(newState);

                                                return;
                                            }}
                                        >
                                            {item}
                                        </button>

                                    )
                                })
                            }
                        </div>
                    </div>
                })
            }


            <div className="flex card_group">
                {
                    store.length > 0 && store.map((item: any, index: number) => {
                        return (
                            <div className="card" key={index}>
                                <p>{item.body}</p>
                                <p>{item.power}</p>
                                <p>{item.seater}</p>
                            </div>
                        )
                    })
                }
            </div>

        </main>
    )
}

export default App
