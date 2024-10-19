

interface Props<T>{
    items:T[]
    renderItem:(item:T,index:number)=>React.ReactNode
    keyExtractor:(item:T)=>number
    className:string
}

export function List<T>({items,className,renderItem,keyExtractor}:Props<T>) {
    return (
        <div className={className}>
            {
                items?items.map((item,index)=>(
                    <div key={keyExtractor(item)}>
                        {renderItem(item,index)}
                    </div>
                )):<></>
            }
        </div>
    )
}