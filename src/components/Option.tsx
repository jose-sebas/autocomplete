import { useCallback, useEffect, useRef } from "react"

interface OptionProps {
    item: string
    extraLabel?: string
    searchTerm?: string
    handleSelect: (item:string) => void 
}

const Option: React.FC<OptionProps> = (props: OptionProps) => {
    const itemRef = useRef(null)
    const handleSelect = useCallback(() => {
        props.handleSelect(props.item)
    }, [props.item])

    useEffect(() => {
        if(props.searchTerm) {
            const newItemValue = (props?.item.toLowerCase() ?? '').replace(props?.searchTerm ?? '', `<span class='underline decoration-solid'>${props.searchTerm}</span>`)
            itemRef.current.innerHTML = newItemValue
        } else {
            itemRef.current.innerHTML = props.item
        }
    }, [props.searchTerm, itemRef])

    return <div className="w-full p-2 bg-white hover:bg-[#E1E6EB] hover:cursor-pointer" onClick={handleSelect}>
            <div className="flex justify-between">
                <div ref={itemRef}>
                    {props.item}
                </div>
                <div className="text-[#6B7785]">{props.extraLabel}</div>
            </div>
        </div>
}

export default Option