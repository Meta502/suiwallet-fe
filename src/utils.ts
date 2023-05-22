export const copyID = (text: string, toast: any) => {
  toast({
    title: 'VA Number Copied',
    status: 'success',
    duration: 9000,
    position: 'top',
    isClosable: true,
  })
  window.navigator.clipboard.writeText(text)
}

export const copyAccount = (text: string, toast: any) => {
  window.navigator.clipboard.writeText(text)
  toast({
    title: 'Account Number Copied',
    status: 'success',
    duration: 9000,
    position: 'top',
    isClosable: true,
  })
}

export const hideText = (text: string, hidden: boolean) => {
  if(!hidden){
    return text
  } 
  return text.replaceAll(/./g,"*")
}