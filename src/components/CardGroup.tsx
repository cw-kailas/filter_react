
const CardGroup = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="card_group">
            {children}
        </div>
    )
}

export default CardGroup