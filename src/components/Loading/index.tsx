import BounceLoader from "react-spinners/BounceLoader";

interface LoadingProps {
  color?: string
  size: number
}

export function Loading({ color = '#00875F', size, ...rest }: LoadingProps) {
  return <BounceLoader size={size} color={color} {...rest} />
}