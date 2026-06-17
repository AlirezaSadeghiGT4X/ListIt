export default function Logo(){
    return(
        <div className="flex">
            <img src="/public/Images/ListItIcon.webp" alt="ListIt icon" className="w-12" />
            <img src="/public/Images/ListItLogo.webp" alt="ListIt logo" className="w-28 hidden dark:flex" />
            <img src="/public/Images/ListItLogoLight.webp" alt="ListIt logo" className="w-28 flex dark:hidden" />
        </div>
    )
}