const regex = /^[^\s]*\s/gm

export default function liner(sentence) {
 const firstWord = sentence.match(regex)
 const otherWords = sentence.replace(firstWord, '')
 return (
  <>
   <p className='cart-item-info-first-word'>
    {!firstWord ? sentence : firstWord}
   </p>
   <p className='cart-item-info-soft-text'>{!firstWord ? '' : otherWords}</p>
  </>
 )
}
