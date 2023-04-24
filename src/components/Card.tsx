type cardProps = {
    title: string,
    info: string,
    description: string
}

const Card = ({ title, info, description }: cardProps) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{info}</p>
            <p>{description}</p>
        </div>
    )
}

export default Card