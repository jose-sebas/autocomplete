import { useCallback } from "react"

interface SelectedItemProps {
    item: string,
    handleRemove: (item:string) => void 
}
const SelectedItem: React.FC<SelectedItemProps> = (props: SelectedItemProps) => {
    const handleRemove = useCallback(() => {
        props.handleRemove(props.item)
    }, [props.item])

    return <div className="flex rounded bg-[#E1E6EB] py-2 px-3 mr-1 mb-1">
            <p className="text-sm">{props.item}</p>
            <div className="ml-2 text-sm text-[#76818E] cursor-pointer font-mono" onClick={handleRemove}>x</div>
        </div>
} 

export default SelectedItem