export function GroupMessage({data}) {
    console.log(data);
    function formateDate(data) {
        let date = new Date(data);
        // date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        return date;
       
    }
    const date = formateDate(data.timestamp).toString();
    return (
        <div
        style={{
            border: "1px solid black",
            padding: "1px 2px 3px",
            margin:'5px 5px'
        }}
        >
             <div
             style={{
                float:'right',
                padding:'10px 20px'
             }}
             >
             <button>Edit</button>
             <button>Delete</button>
             </div>
            <label
                style={{
                    textDecoration:'underline',
                    color:'blue',
                    margin:'0 0 2px'
                }}
            >{data.sender}</label>
            <h3
                style={{ margin:'0', padding:"0 30px", background:data.color, opacity:'0.90'}}
            >{data.content.text}</h3>
             <p>{date}</p>
            
            
        </div>
    );
}