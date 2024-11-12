import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { Button } from "../../components/ui/button"
import clsx from "clsx"

export const FavoriteButton = ({
  isFavorite,
  onFavorite,
  onUnfavorite,
}: {
  isFavorite: boolean
  onFavorite: () => void
  onUnfavorite: () => void
}) => {
  return (
    <Button
      variant={"ghost"}
      className={clsx("p-0 w-5 h-5 my-2 hover:bg-slate-300/50", isFavorite && "hover:text-yellow-500")}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        isFavorite ? onUnfavorite() : onFavorite()
      }}
      asChild
    >
      {isFavorite ? (
        <StarFilledIcon className="w-4 p-0.5 text-yellow-500" />
      ) : (
        <StarIcon className="w-4 p-0.5 text-gray-700 opacity-0 group-hover:opacity-100" />
      )}
    </Button>
  )
}
