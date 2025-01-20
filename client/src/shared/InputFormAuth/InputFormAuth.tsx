import styles from '../../pages/LoginPage/LoginPage.module.css'

interface InputFormAuthProps{
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>) : void
}


function InputFormAuth({type, name, placeholder, value, onChange}: InputFormAuthProps){
    return(
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={styles.form_input}
            value={value}
            onChange={(e) => onChange(e)}
        />
    )
}

export default InputFormAuth