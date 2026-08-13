import Image from 'next/image'


const Logo = () => {
return ( 
<div className="flex items-center gap-3 cursor-pointer select-none">
  <Image
    src="/images/logo.png"
    alt="Strimo Logo"
    width={100}
    height={100}
    priority
    className="object-contain"
  />
</div>
)
}

export default Logo
