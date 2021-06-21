import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

export type EmptyStateProps = {
  message: string
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="w-100 flex-column items-center tc">
      <SentimentVeryDissatisfiedIcon />
      <p>{message}</p>
    </div>
  )
}

export default EmptyState
