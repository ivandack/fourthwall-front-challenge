import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingState = () => {
  return (
    <div className="w-100 h-100 flex justify-center items-center">
      <CircularProgress />
    </div>
  )
}

export default LoadingState
