import { toast } from 'react-toastify'

const reportError = (message: string) => {
  toast(message, {
    position: 'top-center',
    autoClose: 3500,
    hideProgressBar: true,
    draggable: false,
    closeButton: false,
    type: 'error',
  })
}

export default function useError() {
  return { reportError }
}
