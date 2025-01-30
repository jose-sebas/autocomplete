import { useCallback, useState, useRef, useEffect, useMemo, MouseEvent, EventHandler, KeyboardEvent } from "react"
import SelectedItem from "./SelectedItem"
import Option from "./Option"

const Autocomplete: React.FC = () => {
    const inputRef = useRef(null)

    const [selection, setSelection] = useState<string[]>(['Line chart'])
    const [options, setOptions] = useState<string[]>(['Line chart', 'Area chart', 'Column chart', 'Bar chart', 'Pie chart', 'Scatter chart', 'Bubble chart'])
    const [focus, setFocus] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [typing, setTyping] = useState<boolean>(false)
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false)
    const [selecting, setSelecting] = useState<boolean>(false)

    const matchOptions = useMemo(():string[] => {
        if(!searchTerm) return options
        return options.filter(option => RegExp(`${searchTerm}`, 'i').test(option))
    }, [typing, options, searchTerm])

    const handleRemove = useCallback((item: string) => {
        setSelection(oldValue => oldValue.filter(oldItem => oldItem!==item))
    }, [selection])

    const handleClick = useCallback(() =>{
       inputRef.current?.focus()
    }, [])

    const handleFocus = useCallback(() => {
        setFocus(true)
    }, [])

    const handleFocusOut = useCallback(() => {
        setFocus(false)
        setTyping(false)
    }, [])

    const handleChangeSearch = useCallback((e: InputEvent) => {
        setTyping(e?.target?.value ? true : false)
        setSearchTerm(e?.target?.value ?? '')
    }, [searchTerm])

    const handleSelect = useCallback((item: string) => {
        setSelecting(true)
        setSelection(oldValue => {
            if(oldValue.includes(item)) {
                return oldValue.filter(i => i!==item)
            } else {
                return [...oldValue, item]
            }
        })
        setSelecting(false)
    }, [selection])

    const handleSelecting = useCallback((e: MouseEvent) => {
        setSelecting(true)
        e.preventDefault()
        setFocus(true)
    }, [])

    useEffect(() => {
        if(typing || focus){ 
            setOptionsOpen(true)
        } else if(!typing && focus) {
            setOptionsOpen(true)
        } else if(selecting) {
            setSelecting(true)
        }else if(!typing && !focus) {
            setOptionsOpen(false)
        }
    }, [focus, typing, selecting])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.ctrlKey && event.key === "a") {
            event.preventDefault(); 
            setSelection(options)
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);

    return (
        <div onBlur={handleFocusOut}>
            <span className="text-slate-700">
                Chart type
            </span>
            <div className={`w-96 rounded bg-white p-1 border-2 ${focus ? ' border-[#1572A7]':' border-[#9FA9B2]'}`}  onClick={handleClick}>
                <div className="flex flex-wrap">
                    {selection.map(item => <SelectedItem item={item} handleRemove={handleRemove} key={item}/>)}
                    <input type="text" value={searchTerm} className="grow" ref={inputRef} onFocus={handleFocus} onChange={handleChangeSearch}/>
                </div>
            </div>
            {optionsOpen &&
            <div className="border border-[#C3CCD4] mt-1 shadow-md" onMouseDown={handleSelecting}>
                {matchOptions.map(item => <Option item={item} key={item} searchTerm={searchTerm} handleSelect={handleSelect}/>)}
                {!matchOptions.length && typing && <Option item={searchTerm} extraLabel='(new value)' handleSelect={handleSelect} />}
            </div>
            }
        </div>
    )
}

export default Autocomplete