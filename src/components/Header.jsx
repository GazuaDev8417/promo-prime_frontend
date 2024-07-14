import './Header.css'

export default function Header({leftItem, rightItem}){
    return(
        <header>
            <span>{leftItem}</span>
            <div>Contratos</div>
            {/* <img src="https://www.promoprime.com.br/promo/wp-content/themes/promo-prime/img/promo-prime.png" alt="Logo"/> */}
            <span>{rightItem}</span>
        </header>
    )
}